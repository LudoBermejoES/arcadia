#!/usr/bin/env node

/**
 * Arcadia Map Marker Management Application
 * Allows creating, editing, and deleting markers on district maps
 * Stores markers in OpenLayers-compatible GeoJSON format
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('.'));
app.use(express.json());

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
        console.error('Error scanning maps directory:', error);
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
        // Check for tiles
        const tilesDir = path.join(mapDir, 'tiles');
        if (fs.existsSync(tilesDir)) {
            config.hasTiles = true;
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
                    console.warn(`Could not read dimensions for ${imageFile}:`, e.message);
                }
            }
        }
    } catch (error) {
        console.warn(`Error reading map config for ${mapName}:`, error.message);
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
            console.error(`Error loading markers for ${mapId}:`, error);
        }
    }
    
    // Return empty GeoJSON FeatureCollection
    return {
        type: "FeatureCollection",
        features: []
    };
}

// Git operations
function executeGitCommands(mapId, markersFile) {
    try {
        // Get the project root (go up to ArcadiaPage directory)
        const projectRoot = path.resolve(__dirname, '../../..');
        
        console.log(`🔧 Git operations for map: ${mapId}`);
        console.log(`📁 Project root: ${projectRoot}`);
        console.log(`📄 Markers file: ${markersFile}`);
        
        // Make paths relative to project root for git commands
        const relativeMarkersFile = path.relative(projectRoot, markersFile);
        console.log(`📍 Relative path: ${relativeMarkersFile}`);
        
        // Change to project root directory and execute git commands
        process.chdir(projectRoot);
        
        // Add the markers file
        const addCmd = `git add "${relativeMarkersFile}"`;
        console.log(`⚡ Executing: ${addCmd}`);
        execSync(addCmd, { stdio: 'pipe' });
        
        // Check if there are changes to commit
        try {
            const statusCmd = `git status --porcelain "${relativeMarkersFile}"`;
            const status = execSync(statusCmd, { encoding: 'utf8', stdio: 'pipe' });
            
            if (!status.trim()) {
                console.log(`ℹ️  No changes to commit for ${mapId}`);
                return { success: true, message: 'No changes to commit' };
            }
        } catch (statusError) {
            console.log(`⚠️  Could not check git status, proceeding with commit`);
        }
        
        // Commit the changes
        const commitMessage = `Changes in map ${mapId}

🗺️ Updated markers for ${mapId}
📍 Modified: ${relativeMarkersFile}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`;
        
        const commitCmd = `git commit -m "${commitMessage.replace(/"/g, '\\"')}"`;
        console.log(`⚡ Executing: git commit -m "Changes in map ${mapId}"`);
        execSync(commitCmd, { stdio: 'pipe' });
        
        // Push the changes
        const pushCmd = `git push`;
        console.log(`⚡ Executing: ${pushCmd}`);
        execSync(pushCmd, { stdio: 'pipe' });
        
        console.log(`✅ Git operations completed successfully for ${mapId}`);
        return { 
            success: true, 
            message: `Changes committed and pushed for map ${mapId}` 
        };
        
    } catch (error) {
        console.error(`❌ Git operation failed for ${mapId}:`, error.message);
        
        // Try to get more specific error information
        let errorMessage = error.message;
        if (error.stderr) {
            errorMessage += `\nStderr: ${error.stderr}`;
        }
        if (error.stdout) {
            errorMessage += `\nStdout: ${error.stdout}`;
        }
        
        return { 
            success: false, 
            message: `Git operation failed: ${errorMessage}` 
        };
    } finally {
        // Change back to original directory
        process.chdir(__dirname);
    }
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
        
        // Perform Git operations
        const gitResult = executeGitCommands(mapId, markersFile);
        
        return { 
            success: true, 
            git: gitResult 
        };
    } catch (error) {
        console.error(`Error saving markers for ${mapId}:`, error);
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
    res.json(maps);
});

// Get specific map configuration
app.get('/api/maps/:mapId', (req, res) => {
    const { mapId } = req.params;
    const mapDir = path.join(__dirname, mapId);
    
    if (!fs.existsSync(mapDir)) {
        return res.status(404).json({ error: 'Map not found' });
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
            message: 'Markers saved successfully',
            git: result.git
        });
    } else {
        res.status(500).json({ 
            error: 'Failed to save markers',
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
            name: markerData.name || 'Unnamed Marker',
            description: markerData.description || '',
            category: markerData.category || 'general',
            created: new Date().toISOString()
        }
    };
    
    markers.features.push(feature);
    
    const result = saveMarkers(mapId, markers);
    
    if (result.success) {
        res.json({ 
            message: 'Marker added successfully', 
            marker: feature,
            git: result.git
        });
    } else {
        res.status(500).json({ 
            error: 'Failed to add marker',
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
        return res.status(404).json({ error: 'Marker not found' });
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
            message: 'Marker updated successfully', 
            marker,
            git: result.git
        });
    } else {
        res.status(500).json({ 
            error: 'Failed to update marker',
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
        return res.status(404).json({ error: 'Marker not found' });
    }
    
    // Store deleted marker info for logging
    const deletedMarker = markers.features[markerIndex];
    markers.features.splice(markerIndex, 1);
    
    const result = saveMarkers(mapId, markers);
    
    if (result.success) {
        res.json({ 
            message: 'Marker deleted successfully',
            deletedMarker: deletedMarker.properties.name,
            git: result.git
        });
    } else {
        res.status(500).json({ 
            error: 'Failed to delete marker',
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
    <title>Arcadia Map Marker Manager</title>
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
            <h1>🗺️ Arcadia Map Marker Manager</h1>
            <p>Create, edit, and manage markers on district maps</p>
        </div>
        
        <div class="content">
            <div class="sidebar">
                <div class="map-selector">
                    <label for="mapSelect">Select Map:</label>
                    <select id="mapSelect">
                        <option value="">Loading maps...</option>
                    </select>
                </div>
                
                <div class="instructions">
                    <strong>Instructions:</strong><br>
                    1. Select a map from the dropdown<br>
                    2. Click on the map to add markers<br>
                    3. Click on existing markers to edit them<br>
                    4. Use the controls below to manage markers
                </div>
                
                <div class="marker-controls">
                    <button class="btn" onclick="enableAddMode()">➕ Add Marker Mode</button>
                    <button class="btn" onclick="saveAllMarkers()">💾 Save All Markers</button>
                    <button class="btn btn-danger" onclick="deleteSelectedMarker()">🗑️ Delete Selected</button>
                </div>
                
                <div class="marker-list" id="markerList">
                    <p>Select a map to see markers</p>
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
            <div class="modal-header">Edit Marker</div>
            <form id="markerForm">
                <div class="form-group">
                    <label for="markerName">Name:</label>
                    <input type="text" id="markerName" required>
                </div>
                <div class="form-group">
                    <label for="markerDescription">Description:</label>
                    <textarea id="markerDescription"></textarea>
                </div>
                <div class="form-group">
                    <label for="markerCategory">Category:</label>
                    <select id="markerCategory">
                        <option value="general">General</option>
                        <option value="building">Building</option>
                        <option value="landmark">Landmark</option>
                        <option value="character">Character Location</option>
                        <option value="event">Event Location</option>
                        <option value="danger">Danger Zone</option>
                        <option value="safe">Safe Zone</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn">Save Marker</button>
                    <button type="button" class="btn" onclick="closeMarkerModal()">Cancel</button>
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
    console.log('🗺️ Arcadia Map Marker Manager');
    console.log('================================');
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('🎯 Features:');
    console.log('  - Map selection from available districts');
    console.log('  - Interactive marker creation and editing');
    console.log('  - GeoJSON storage format for OpenLayers compatibility');
    console.log('  - Responsive web interface');
    console.log('');
    console.log('📂 Available maps will be scanned from subdirectories');
    console.log('💾 Markers are stored as markers.geojson in each map directory');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down marker manager...');
    process.exit(0);
});