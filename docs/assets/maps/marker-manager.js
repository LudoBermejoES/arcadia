#!/usr/bin/env node

/**
 * Arcadia Map Marker Management Application
 * Allows creating, editing, and deleting markers on district maps
 * Stores markers in OpenLayers-compatible GeoJSON format
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Winston logging
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'arcadia-marker-manager' },
    transports: [
        // Write all logs to console with colorized output
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
                    return `${timestamp} [${service}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
                })
            )
        }),
        // Write all logs to file
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        new winston.transports.File({ 
            filename: 'logs/combined.log',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Write info and above to a separate file
        new winston.transports.File({ 
            filename: 'logs/app.log', 
            level: 'info',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    ]
});

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Middleware
app.use(express.static('.'));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    
    // Log the request
    logger.info('HTTP Request', {
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        operation: 'http_request'
    });
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(chunk, encoding) {
        const duration = Date.now() - start;
        
        logger.info('HTTP Response', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            operation: 'http_response'
        });
        
        originalEnd.call(this, chunk, encoding);
    };
    
    next();
});

// Get available maps (directories with images, excluding node_modules)
function getAvailableMaps() {
    const mapsDir = __dirname;
    const maps = [];
    
    try {
        const entries = fs.readdirSync(mapsDir, { withFileTypes: true });
        
        for (const entry of entries) {
            if (entry.isDirectory() && entry.name !== 'node_modules') {
                const mapDir = path.join(mapsDir, entry.name);
                
                // Check if directory contains images
                const files = fs.readdirSync(mapDir);
                const hasImage = files.some(file => 
                    /\.(png|jpg|jpeg|svg)$/i.test(file)
                );
                
                if (hasImage) {
                    // Get map configuration
                    const mapConfig = getMapConfig(entry.name, mapDir);
                    maps.push(mapConfig);
                }
            }
        }
    } catch (error) {
        logger.error('Error escaneando directorio de mapas', { error: error.message });
    }
    
    return maps;
}

// Get map configuration for a specific map
function getMapConfig(mapName, mapDir) {
    const config = {
        id: mapName,
        name: mapName.charAt(0).toUpperCase() + mapName.slice(1),
        directory: mapName,
        hasTiles: false,
        imageFile: null,
        extent: [0, 0, 1000, 1000], // Default extent
        originalDimensions: { width: 1000, height: 1000 }
    };
    
    try {
        // Check for tiles and determine max zoom level
        const tilesDir = path.join(mapDir, 'tiles');
        if (fs.existsSync(tilesDir)) {
            config.hasTiles = true;
            
            // Find the maximum zoom level by checking tile directories
            try {
                const zoomDirs = fs.readdirSync(tilesDir)
                    .filter(dir => /^\d+$/.test(dir))
                    .map(dir => parseInt(dir))
                    .sort((a, b) => b - a); // Sort descending
                
                if (zoomDirs.length > 0) {
                    config.maxZoom = zoomDirs[0];
                    config.minZoom = 0;
                } else {
                    config.maxZoom = 5; // Default fallback
                    config.minZoom = 0;
                }
            } catch (e) {
                config.maxZoom = 5; // Default fallback
                config.minZoom = 0;
            }
        }
        
        // Find main image file
        const files = fs.readdirSync(mapDir);
        const imageFile = files.find(file => 
            /\.(png|jpg|jpeg)$/i.test(file) && 
            !file.includes('_temp') && 
            !file.includes('_processing')
        );
        
        if (imageFile) {
            config.imageFile = imageFile;
            
            // Try to get image dimensions
            const imagePath = path.join(mapDir, imageFile);
            if (imageFile.endsWith('.png')) {
                try {
                    const dimensions = getPNGDimensions(imagePath);
                    config.originalDimensions = dimensions;
                    config.extent = [0, 0, dimensions.width, dimensions.height];
                } catch (e) {
                    logger.warn('No se pudieron leer las dimensiones de la imagen', { 
                        imageFile, 
                        error: e.message 
                    });
                }
            }
        }
    } catch (error) {
        logger.warn('Error leyendo configuración del mapa', { mapName, error: error.message });
    }
    
    return config;
}

// Simple PNG dimensions reader
function getPNGDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    
    // PNG signature check
    const pngSignature = '89504e470d0a1a0a';
    if (buffer.slice(0, 8).toString('hex') !== pngSignature) {
        throw new Error('Not a valid PNG file');
    }
    
    // Read IHDR chunk (starts at byte 16)
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    
    return { width, height };
}

// Load markers for a specific map
function loadMarkers(mapId) {
    const markersFile = path.join(__dirname, mapId, 'markers.geojson');
    
    if (fs.existsSync(markersFile)) {
        try {
            const content = fs.readFileSync(markersFile, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            logger.error('Error cargando marcadores', { mapId, error: error.message });
        }
    }
    
    // Return empty GeoJSON FeatureCollection
    return {
        type: "FeatureCollection",
        features: []
    };
}

// No git operations - markers saved locally only
function logMarkerOperation(mapId, markersFile, operation) {
    logger.info('Operación de marcadores', { 
        mapId, 
        markersFile, 
        operation: operation,
        timestamp: new Date().toISOString()
    });
    
    return { 
        success: true, 
        message: `Marcadores ${operation} para mapa ${mapId}` 
    };
}

// Save markers for a specific map
function saveMarkers(mapId, markersData) {
    const mapDir = path.join(__dirname, mapId);
    const markersFile = path.join(mapDir, 'markers.geojson');
    
    try {
        // Ensure map directory exists
        if (!fs.existsSync(mapDir)) {
            fs.mkdirSync(mapDir, { recursive: true });
        }
        
        // Validate GeoJSON structure
        if (!markersData.type || markersData.type !== "FeatureCollection") {
            markersData = {
                type: "FeatureCollection",
                features: markersData.features || []
            };
        }
        
        fs.writeFileSync(markersFile, JSON.stringify(markersData, null, 2));
        
        // Log operation without git
        const logResult = logMarkerOperation(mapId, markersFile, 'guardados');
        
        return { 
            success: true, 
            log: logResult 
        };
    } catch (error) {
        logger.error('Error guardando marcadores', { mapId, error: error.message });
        return { 
            success: false, 
            error: error.message 
        };
    }
}

// API Routes

// Get all available maps
app.get('/api/maps', (req, res) => {
    const maps = getAvailableMaps();
    logger.info('Mapas disponibles obtenidos', { count: maps.length });
    res.json(maps);
});

// Get specific map configuration
app.get('/api/maps/:mapId', (req, res) => {
    const { mapId } = req.params;
    const mapDir = path.join(__dirname, mapId);
    
    if (!fs.existsSync(mapDir)) {
        return res.status(404).json({ error: 'Mapa no encontrado' });
    }
    
    const config = getMapConfig(mapId, mapDir);
    res.json(config);
});

// Get markers for a specific map
app.get('/api/maps/:mapId/markers', (req, res) => {
    const { mapId } = req.params;
    const markers = loadMarkers(mapId);
    res.json(markers);
});

// Save markers for a specific map
app.post('/api/maps/:mapId/markers', (req, res) => {
    const { mapId } = req.params;
    const markersData = req.body;
    
    const result = saveMarkers(mapId, markersData);
    
    if (result.success) {
        res.json({ 
            message: 'Marcadores guardados exitosamente',
            log: result.log
        });
    } else {
        res.status(500).json({ 
            error: 'Error al guardar marcadores',
            details: result.error
        });
    }
});

// Add a single marker
app.post('/api/maps/:mapId/markers/add', (req, res) => {
    const { mapId } = req.params;
    const markerData = req.body;
    
    const markers = loadMarkers(mapId);
    
    // Create GeoJSON Feature
    const feature = {
        type: "Feature",
        id: markerData.id || Date.now().toString(),
        geometry: {
            type: "Point",
            coordinates: [markerData.x, markerData.y]
        },
        properties: {
            name: markerData.name || 'Marcador sin nombre',
            description: markerData.description || '',
            category: markerData.category || 'general',
            created: new Date().toISOString()
        }
    };
    
    markers.features.push(feature);
    
    const result = saveMarkers(mapId, markers);
    
    if (result.success) {
        res.json({ 
            message: 'Marcador añadido exitosamente', 
            marker: feature,
            log: result.log
        });
    } else {
        res.status(500).json({ 
            error: 'Error al añadir marcador',
            details: result.error
        });
    }
});

// Update a marker
app.put('/api/maps/:mapId/markers/:markerId', (req, res) => {
    const { mapId, markerId } = req.params;
    const updateData = req.body;
    
    const markers = loadMarkers(mapId);
    const markerIndex = markers.features.findIndex(f => f.id === markerId);
    
    if (markerIndex === -1) {
        return res.status(404).json({ error: 'Marcador no encontrado' });
    }
    
    // Update marker
    const marker = markers.features[markerIndex];
    
    if (updateData.x !== undefined && updateData.y !== undefined) {
        marker.geometry.coordinates = [updateData.x, updateData.y];
    }
    
    if (updateData.name !== undefined) {
        marker.properties.name = updateData.name;
    }
    
    if (updateData.description !== undefined) {
        marker.properties.description = updateData.description;
    }
    
    if (updateData.category !== undefined) {
        marker.properties.category = updateData.category;
    }
    
    marker.properties.updated = new Date().toISOString();
    
    const result = saveMarkers(mapId, markers);
    
    if (result.success) {
        res.json({ 
            message: 'Marcador actualizado exitosamente', 
            marker,
            log: result.log
        });
    } else {
        res.status(500).json({ 
            error: 'Error al actualizar marcador',
            details: result.error
        });
    }
});

// Delete a marker
app.delete('/api/maps/:mapId/markers/:markerId', (req, res) => {
    const { mapId, markerId } = req.params;
    
    const markers = loadMarkers(mapId);
    const markerIndex = markers.features.findIndex(f => f.id === markerId);
    
    if (markerIndex === -1) {
        return res.status(404).json({ error: 'Marcador no encontrado' });
    }
    
    // Store deleted marker info for logging
    const deletedMarker = markers.features[markerIndex];
    markers.features.splice(markerIndex, 1);
    
    const result = saveMarkers(mapId, markers);
    
    if (result.success) {
        res.json({ 
            message: 'Marcador eliminado exitosamente',
            deletedMarker: deletedMarker.properties.name,
            log: result.log
        });
    } else {
        res.status(500).json({ 
            error: 'Error al eliminar marcador',
            details: result.error
        });
    }
});

// Serve the main application page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Marcadores de Mapas Arcadia</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v9.2.4/ol.css" type="text/css">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 2em;
        }
        
        .content {
            display: flex;
            height: 80vh;
        }
        
        .sidebar {
            width: 300px;
            background: #f8f9fa;
            border-right: 1px solid #dee2e6;
            padding: 20px;
            overflow-y: auto;
        }
        
        .map-container {
            flex: 1;
            position: relative;
        }
        
        #map {
            width: 100%;
            height: 100%;
        }
        
        .map-selector {
            margin-bottom: 20px;
        }
        
        .map-selector select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        
        .marker-controls {
            margin-bottom: 20px;
        }
        
        .marker-list {
            max-height: 400px;
            overflow-y: auto;
        }
        
        .marker-item {
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .marker-item:hover {
            background: #e9ecef;
            border-color: #007bff;
        }
        
        .marker-item.selected {
            background: #007bff;
            color: white;
            border-color: #0056b3;
        }
        
        .marker-name {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .marker-coords {
            font-size: 0.9em;
            opacity: 0.7;
        }
        
        .btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        
        .btn:hover {
            background: #0056b3;
        }
        
        .btn-danger {
            background: #dc3545;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
        
        .status {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            display: none;
        }
        
        .status.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        .form-group textarea {
            height: 60px;
            resize: vertical;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: none;
            z-index: 1001;
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 400px;
            max-width: 90vw;
        }
        
        .modal-header {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 20px;
        }
        
        .instructions {
            background: #e9ecef;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🗺️ Gestor de Marcadores de Mapas Arcadia</h1>
            <p>Crea, edita y gestiona marcadores en mapas de distritos</p>
        </div>
        
        <div class="content">
            <div class="sidebar">
                <div class="map-selector">
                    <label for="mapSelect">Seleccionar Mapa:</label>
                    <select id="mapSelect">
                        <option value="">Cargando mapas...</option>
                    </select>
                </div>
                
                <div class="instructions">
                    <strong>Instrucciones:</strong><br>
                    1. Selecciona un mapa del menú desplegable<br>
                    2. Haz clic en el mapa para añadir marcadores<br>
                    3. Haz clic en marcadores existentes para editarlos<br>
                    4. Usa los controles de abajo para gestionar marcadores
                </div>
                
                <div class="marker-controls">
                    <button class="btn" onclick="enableAddMode()">➕ Modo Añadir Marcador</button>
                    <button class="btn" onclick="saveAllMarkers()">💾 Guardar Todos los Marcadores</button>
                    <button class="btn btn-danger" onclick="deleteSelectedMarker()">🗑️ Eliminar Seleccionado</button>
                </div>
                
                <div class="marker-list" id="markerList">
                    <p>Selecciona un mapa para ver marcadores</p>
                </div>
            </div>
            
            <div class="map-container">
                <div id="map"></div>
            </div>
        </div>
    </div>
    
    <div class="status" id="status"></div>
    
    <!-- Marker Edit Modal -->
    <div class="modal" id="markerModal">
        <div class="modal-content">
            <div class="modal-header">Editar Marcador</div>
            <form id="markerForm">
                <div class="form-group">
                    <label for="markerName">Nombre:</label>
                    <input type="text" id="markerName" required>
                </div>
                <div class="form-group">
                    <label for="markerDescription">Descripción:</label>
                    <textarea id="markerDescription"></textarea>
                </div>
                <div class="form-group">
                    <label for="markerCategory">Categoría:</label>
                    <select id="markerCategory">
                        <option value="general">General</option>
                        <option value="building">Edificio</option>
                        <option value="landmark">Punto de Referencia</option>
                        <option value="character">Ubicación de Personaje</option>
                        <option value="event">Ubicación de Evento</option>
                        <option value="danger">Zona de Peligro</option>
                        <option value="safe">Zona Segura</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn">Guardar Marcador</button>
                    <button type="button" class="btn" onclick="closeMarkerModal()">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
    
    <script type="module" src="/marker-app.js"></script>
</body>
</html>
    `);
});

// Start server
app.listen(PORT, () => {
    logger.info('🗺️ Gestor de Marcadores de Mapas Arcadia iniciado', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        logLevel: process.env.LOG_LEVEL || 'info'
    });
    
    // Still show startup message in console for immediate feedback
    console.log('🗺️ Gestor de Marcadores de Mapas Arcadia');
    console.log('=========================================');
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('🎯 Características:');
    console.log('  - Selección de mapas de distritos disponibles');
    console.log('  - Creación y edición interactiva de marcadores');
    console.log('  - Formato de almacenamiento GeoJSON compatible con OpenLayers');
    console.log('  - Interfaz web responsiva');
    console.log('  - Registro Winston con rotación de archivos');
    console.log('  - Gestión de procesos PM2 lista');
    console.log('');
    console.log('📂 Los mapas disponibles se escanearán desde subdirectorios');
    console.log('💾 Los marcadores se almacenan como markers.geojson en cada directorio de mapa');
    console.log('📁 Los registros se almacenan en el directorio ./logs/');
    console.log('');
    console.log('Presiona Ctrl+C para detener el servidor');
});

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('SIGINT recibido, cerrando servidor de forma elegante');
    console.log('\n🛑 Cerrando gestor de marcadores...');
    process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Excepción no capturada', { error: error.stack });
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Rechazo de promesa no manejado', { reason, promise });
});