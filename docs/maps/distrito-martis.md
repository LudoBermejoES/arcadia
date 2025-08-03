---
layout: page
title: "Distrito Martis - Mapa Interactivo"
permalink: /maps/distrito-martis/
---

# Distrito Martis

## Mapa Interactivo Multi-Nivel

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v9.2.4/ol.css" type="text/css">

<div id="map" class="map-container"></div>
<div id="map-info" class="map-info">
    <p><strong>Zoom Level:</strong> <span id="current-zoom">0</span></p>
    <p><strong>Coordinates:</strong> <span id="current-coords">Click on map</span></p>
</div>

<script type="module">
    import Map from 'https://cdn.skypack.dev/ol@v9.2.4/Map.js';
    import View from 'https://cdn.skypack.dev/ol@v9.2.4/View.js';
    import TileLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Tile.js';
    import XYZ from 'https://cdn.skypack.dev/ol@v9.2.4/source/XYZ.js';
    import TileGrid from 'https://cdn.skypack.dev/ol@v9.2.4/tilegrid/TileGrid.js';
    import Projection from 'https://cdn.skypack.dev/ol@v9.2.4/proj/Projection.js';
    import {getCenter} from 'https://cdn.skypack.dev/ol@v9.2.4/extent.js';
    import Overlay from 'https://cdn.skypack.dev/ol@v9.2.4/Overlay.js';
    
    // Raster tile configuration for Distrito Martis
    const mapConfig = {
        name: "Distrito Martis",
        originalDimensions: { width: 10155, height: 3948 },
        extent: [0, 0, 10155, 3948],
        tileSize: 512,
        minZoom: 0,
        maxZoom: 6
    };
    
    // Create custom projection for the map
    const mapProjection = new Projection({
        code: 'distrito-martis-projection',
        units: 'pixels',
        extent: mapConfig.extent,
    });
    
    console.log('Loading Distrito Martis raster tile map...');
    console.log('Map extent:', mapConfig.extent);
    console.log('Map dimensions:', mapConfig.originalDimensions);
    
    // Generate resolutions for each zoom level
    function generateResolutions() {
        const resolutions = [];
        for (let z = mapConfig.minZoom; z <= mapConfig.maxZoom; z++) {
            resolutions[z] = Math.pow(2, mapConfig.maxZoom - z);
        }
        return resolutions;
    }
    
    // Create tile layer with XYZ source
    function createTileLayer() {
        // For now, we'll use a fallback to the single image
        // When tiles are generated, replace this URL template
        const tileUrlTemplate = '{{ site.baseurl }}/assets/maps/martis/tiles/{z}/{x}/{y}.png';
        const fallbackImageUrl = '{{ site.baseurl }}/assets/maps/martis/Martis.png';
        
        // Check if we should use tiles or fallback to single image
        const useTiles = true; // Set to true when tiles are generated
        
        if (useTiles) {
            // XYZ Tile Layer (when tiles are available)
            const tileGrid = new TileGrid({
                extent: mapConfig.extent,
                origin: [0, 0], // Bottom-left origin to match tile structure
                resolutions: generateResolutions(),
                tileSize: mapConfig.tileSize
            });
            
            const tileLayer = new TileLayer({
                source: new XYZ({
                    url: tileUrlTemplate,
                    projection: mapProjection,
                    tileGrid: tileGrid,
                    tileUrlFunction: function(tileCoord, pixelRatio, projection) {
                        if (!tileCoord) {
                            return undefined;
                        }
                        const z = tileCoord[0];
                        const x = tileCoord[1];
                        const y = tileCoord[2];
                        
                        // Check if tile coordinates are valid (non-negative)
                        if (x < 0 || y < 0) {
                            console.warn('🚫 Invalid tile coordinates:', z, x, y);
                            return undefined;
                        }
                        
                        const baseUrl = '{{ site.baseurl }}/assets/maps/martis/tiles/';
                        const url = `${baseUrl}${z}/${x}/${y}.png`;
                        console.log('🗺️ Loading tile:', url);
                        return url;
                    },
                    wrapX: false
                })
            });
            
            return [tileLayer];
        }
    }
    
    async function initializeMap() {
        const layers = await createTileLayer();
        
        // Create the map
        const map = new Map({
            target: 'map',
            layers: layers,
            view: new View({
                projection: mapProjection,
                center: getCenter(mapConfig.extent),
                zoom: 3,
                minZoom: mapConfig.minZoom,
                maxZoom: mapConfig.maxZoom,
                // Constrain view to image bounds
                extent: mapConfig.extent
            })
        });
        
        // Fit the view to show the entire district
        map.getView().fit(mapConfig.extent, {
            padding: [20, 20, 20, 20],
            constrainResolution: false
        });
        
        return map;
    }
    
    function setupMapInteractions(map) {
        // Update zoom level display
        map.getView().on('change:resolution', function() {
            const zoom = map.getView().getZoom();
            document.getElementById('current-zoom').textContent = zoom ? zoom.toFixed(1) : '0';
        });
        
        // Add click interaction to show coordinates
        map.on('click', function(event) {
            const coordinate = event.coordinate;
            const x = Math.round(coordinate[0]);
            const y = Math.round(coordinate[1]);
            document.getElementById('current-coords').textContent = `(${x}, ${y})`;
            console.log('Clicked at:', coordinate);
        });
        
        // Update coordinates on mouse move
        map.on('pointermove', function(event) {
            const coordinate = event.coordinate;
            const x = Math.round(coordinate[0]);
            const y = Math.round(coordinate[1]);
            document.getElementById('current-coords').textContent = `(${x}, ${y})`;
        });
        
        // Resize map when window resizes
        window.addEventListener('resize', function() {
            map.updateSize();
        });
        
        // Initial zoom level display
        const initialZoom = map.getView().getZoom();
        document.getElementById('current-zoom').textContent = initialZoom ? initialZoom.toFixed(1) : '0';
    }
    
    // Initialize everything when page loads
    document.addEventListener('DOMContentLoaded', async function() {
        console.log('🗺️ Initializing Distrito Martis interactive map...');
        
        try {
            const map = await initializeMap();
            setupMapInteractions(map);
            console.log('✅ Map initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing map:', error);
            document.getElementById('map').innerHTML = 
                '<p style="text-align: center; padding: 50px; color: #d32f2f;">⚠️ Error initializing map. Check console for details.</p>';
        }
    });
</script>

## Descripción

El **Distrito Martis** es el distrito residencial obrero y de clase trabajadora de Arcadia, donde viven empleados del sector industrial, servicios públicos y trabajadores especializados. Caracterizado por viviendas sociales de calidad, servicios sindicales y una fuerte identidad de clase trabajadora.

### Características Principales

- **Población**: ~1.2 millones de habitantes
- **Enfoque**: Vivienda social, servicios laborales
- **Servicios**: Guarderías públicas, centros de formación profesional, comedores sociales
- **Instituciones**: Central Sindical, Escuelas Técnicas, Cooperativas de Trabajadores

### Navegación del Mapa

- **Zoom**: Utiliza los controles de zoom (+/-) o la rueda del ratón para explorar diferentes niveles de detalle
- **Navegación**: Haz clic y arrastra para moverte por el mapa
- **Coordenadas**: Las coordenadas se actualizan en tiempo real al mover el ratón
- **Nivel de Zoom**: El nivel actual se muestra en la esquina superior

### Tecnología del Mapa

Este mapa utiliza **OpenLayers v9.2.4** con **raster tiles** (mosaicos de imagen) generados usando Sharp/Node.js:

- **🔧 Sistema Activo**: Mosaicos XYZ de 512×512 píxeles 
- **📊 Tiles Generados**: ~217 mosaicos en 7 niveles de zoom (0-6)
- **⚡ Beneficios**: Carga incremental, mejor rendimiento, navegación fluida
- **🗺️ Formato**: Estándar XYZ compatible con servicios de mapas web

**Niveles de Zoom Disponibles:**
- **Nivel 6**: ~160 tiles (20×8) - Máxima resolución 10155×3948
- **Nivel 5**: ~40 tiles (10×4) - Alta resolución 5078×1974
- **Nivel 4**: ~10 tiles (5×2) - Resolución media 2539×987
- **Nivel 3**: ~3 tiles - Resolución baja 1270×494
- **Nivel 2**: ~2 tiles - Muy baja resolución 635×247
- **Nivel 1**: 1 tile - Vista general 318×124
- **Nivel 0**: 1 tile - Vista completa

El sistema está optimizado para mostrar el detalle apropiado según el nivel de zoom seleccionado.

### Enlaces Relacionados

- [Geografía de Arcadia]({{ site.baseurl }}/world-building/geography/arcadia-geography/)
- [Distrito Solis]({{ site.baseurl }}/world-building/geography/distrito-solis/)
- [Distrito Lunae]({{ site.baseurl }}/world-building/geography/distrito-lunae/)

<style>
.map-container {
    height: 600px;
    width: 100%;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
}

.map-info {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-family: monospace;
    font-size: 14px;
}

.map-info p {
    margin: 5px 0;
}

.map-info strong {
    color: #333;
}

#current-zoom, #current-coords {
    color: #0066cc;
    font-weight: bold;
}

@media (max-width: 768px) {
    .map-container {
        height: 400px;
    }
    
    .map-info {
        font-size: 12px;
    }
}

/* Customize OpenLayers controls */
.ol-zoom {
    top: 0.5em;
    left: 0.5em;
}

.ol-zoom button {
    background-color: rgba(255, 255, 255, 0.8) !important;
    border: 1px solid #ccc !important;
    border-radius: 2px;
}

.ol-zoom button:hover {
    background-color: rgba(255, 255, 255, 0.9) !important;
}

/* Map attribution styling */
.ol-attribution {
    bottom: 0.5em;
    right: 0.5em;
    max-width: calc(100% - 1em);
}

.ol-attribution ul {
    color: #333;
    text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
}
</style>