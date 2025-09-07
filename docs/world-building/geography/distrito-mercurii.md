---
layout: page
title: "Distrito Mercurii"
permalink: /world-building/geography/distrito-mercurii/
---

# Distrito Mercurii

## Mapa Interactivo

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v9.2.4/ol.css" type="text/css">

<div id="map" class="map-container"></div>
<div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
</div>
<div id="map-info" class="map-info">
    <p><strong>Nivel de Zoom:</strong> <span id="current-zoom">0</span></p>
    <p><strong>Coordenadas:</strong> <span id="current-coords">Haz clic en el mapa</span></p>
</div>

<script type="module">
    import Map from 'https://cdn.skypack.dev/ol@v9.2.4/Map.js';
    import View from 'https://cdn.skypack.dev/ol@v9.2.4/View.js';
    import TileLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Tile.js';
    import VectorLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Vector.js';
    import VectorSource from 'https://cdn.skypack.dev/ol@v9.2.4/source/Vector.js';
    import GeoJSON from 'https://cdn.skypack.dev/ol@v9.2.4/format/GeoJSON.js';
    import XYZ from 'https://cdn.skypack.dev/ol@v9.2.4/source/XYZ.js';
    import TileGrid from 'https://cdn.skypack.dev/ol@v9.2.4/tilegrid/TileGrid.js';
    import Projection from 'https://cdn.skypack.dev/ol@v9.2.4/proj/Projection.js';
    import {getCenter} from 'https://cdn.skypack.dev/ol@v9.2.4/extent.js';
    import Overlay from 'https://cdn.skypack.dev/ol@v9.2.4/Overlay.js';
    import {Style, Circle, Fill, Stroke, Text} from 'https://cdn.skypack.dev/ol@v9.2.4/style.js';
    
    // Raster tile configuration for Distrito Mercurii
    const mapConfig = {
        name: "Distrito Mercurii",
        originalDimensions: { width: 5828, height: 3376 },
        extent: [0, 0, 5828, 3376],
        tileSize: 512,
        minZoom: 0,
        maxZoom: 6
    };
    
    // Create custom projection for the map
    const mapProjection = new Projection({
        code: 'distrito-mercurii-projection',
        units: 'pixels',
        extent: mapConfig.extent,
    });
    
    console.log('Cargando mapa de mosaicos raster del Distrito Mercurii...');
    console.log('Extensión del mapa:', mapConfig.extent);
    console.log('Dimensiones del mapa:', mapConfig.originalDimensions);
    
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
        const tileUrlTemplate = '{{ site.baseurl }}/assets/maps/mercurii/{z}/{x}/{y}.png';
        const fallbackImageUrl = '{{ site.baseurl }}/assets/maps/mercurii/Mercurii.png';
        
        // Use tiles since they are generated
        const useTiles = true;
        
        if (useTiles) {
            // XYZ Tile Layer
            const tileGrid = new TileGrid({
                extent: mapConfig.extent,
                origin: [0, mapConfig.extent[3]], // Top-left origin for XYZ tiles
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
                        
                        // For XYZ with top-left origin, Y needs to be flipped
                        const resolution = generateResolutions()[z];
                        const tilesY = Math.ceil(mapConfig.originalDimensions.height / resolution / mapConfig.tileSize);
                        const flippedY = tilesY - 1 - y;
                        
                        // Check if tile coordinates are valid
                        if (x < 0 || y < 0 || flippedY < 0) {
                            console.warn('🚫 Invalid tile coordinates:', {z, x, y, flippedY, tilesY});
                            return undefined;
                        }
                        
                        const baseUrl = '{{ site.baseurl }}/assets/maps/mercurii/';
                        const url = `${baseUrl}${z}/${x}/${flippedY}.png`;
                        console.log('🗺️ Loading tile:', {z, x, y: flippedY, url});
                        return url;
                    },
                    wrapX: false
                })
            });
            
            return [tileLayer];
        }
    }
    
    // Create GeoJSON markers layer
    async function createMarkersLayer() {
        try {
            const response = await fetch('{{ site.baseurl }}/assets/maps/mercurii/markers.geojson');
            if (!response.ok) {
                console.warn('📍 Could not load markers.geojson');
                return null;
            }
            
            const geojsonData = await response.json();
            console.log('📍 Loaded markers:', geojsonData.features.length, 'features');
            
            // Create vector source from GeoJSON
            const vectorSource = new VectorSource({
                features: new GeoJSON({
                    dataProjection: mapProjection,
                    featureProjection: mapProjection
                }).readFeatures(geojsonData)
            });
            
            // Create vector layer with styled markers
            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: function(feature) {
                    const category = feature.get('category') || 'default';
                    const name = feature.get('name') || 'Unnamed';
                    
                    // Style based on category
                    let fillColor, strokeColor, textColor;
                    switch (category) {
                        case 'general':
                            fillColor = 'rgba(158, 158, 158, 0.8)'; // Gray
                            strokeColor = 'rgba(97, 97, 97, 1)';
                            textColor = '#ffffff';
                            break;
                        case 'building':
                        case 'edificio':
                            fillColor = 'rgba(96, 125, 139, 0.8)'; // Blue Gray
                            strokeColor = 'rgba(69, 90, 100, 1)';
                            textColor = '#ffffff';
                            break;
                        case 'landmark':
                        case 'punto de referencia':
                            fillColor = 'rgba(76, 175, 80, 0.8)'; // Green
                            strokeColor = 'rgba(56, 142, 60, 1)';
                            textColor = '#ffffff';
                            break;
                        case 'character':
                        case 'ubicación de personaje':
                            fillColor = 'rgba(33, 150, 243, 0.8)'; // Blue
                            strokeColor = 'rgba(21, 101, 192, 1)';
                            textColor = '#ffffff';
                            break;
                        case 'event':
                        case 'ubicación de evento':
                            fillColor = 'rgba(156, 39, 176, 0.8)'; // Purple
                            strokeColor = 'rgba(123, 31, 162, 1)';
                            textColor = '#ffffff';
                            break;
                        case 'danger':
                        case 'zona de peligro':
                            fillColor = 'rgba(244, 67, 54, 0.8)'; // Red
                            strokeColor = 'rgba(198, 40, 40, 1)';
                            textColor = '#ffffff';
                            break;
                        case 'safe':
                        case 'zona segura':
                            fillColor = 'rgba(76, 175, 80, 0.8)'; // Green
                            strokeColor = 'rgba(56, 142, 60, 1)';
                            textColor = '#ffffff';
                            break;
                        // Legacy compatibility
                        case 'location':
                            fillColor = 'rgba(76, 175, 80, 0.8)'; // Green
                            strokeColor = 'rgba(56, 142, 60, 1)';
                            textColor = '#ffffff';
                            break;
                        default:
                            fillColor = 'rgba(158, 158, 158, 0.8)'; // Gray
                            strokeColor = 'rgba(97, 97, 97, 1)';
                            textColor = '#ffffff';
                    }
                    
                    return new Style({
                        image: new Circle({
                            radius: 12,
                            fill: new Fill({
                                color: fillColor
                            }),
                            stroke: new Stroke({
                                color: strokeColor,
                                width: 2
                            })
                        }),
                        text: new Text({
                            text: name.length > 20 ? name.substring(0, 17) + '...' : name,
                            offsetY: -25,
                            fill: new Fill({
                                color: textColor
                            }),
                            stroke: new Stroke({
                                color: 'rgba(0, 0, 0, 0.8)',
                                width: 3
                            }),
                            font: '12px Arial, sans-serif'
                        })
                    });
                }
            });
            
            return vectorLayer;
        } catch (error) {
            console.error('❌ Error loading markers:', error);
            return null;
        }
    }
    
    async function initializeMap() {
        const tileLayers = await createTileLayer();
        const markersLayer = await createMarkersLayer();
        
        // Combine all layers
        const allLayers = [...tileLayers];
        if (markersLayer) {
            allLayers.push(markersLayer);
        }
        
        // Create the map
        const map = new Map({
            target: 'map',
            layers: allLayers,
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
        
        // Add popup overlay
        const popupContainer = document.getElementById('popup');
        const popupContent = document.getElementById('popup-content');
        const popupCloser = document.getElementById('popup-closer');
        
        const popup = new Overlay({
            element: popupContainer,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });
        map.addOverlay(popup);
        
        // Close popup when X is clicked
        popupCloser.onclick = function() {
            popup.setPosition(undefined);
            popupCloser.blur();
            return false;
        };
        
        // Add click interaction for markers
        map.on('click', function(event) {
            const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
                return feature;
            });
            
            if (feature) {
                // Show popup with marker information
                const name = feature.get('name') || 'Ubicación Sin Nombre';
                const description = feature.get('description') || 'Sin descripción disponible';
                const category = feature.get('category') || 'unknown';
                const created = feature.get('created');
                
                // Translate category for display
                let displayCategory = category;
                switch (category) {
                    case 'general': displayCategory = 'General'; break;
                    case 'building': displayCategory = 'Edificio'; break;
                    case 'landmark': displayCategory = 'Punto de Referencia'; break;
                    case 'character': displayCategory = 'Ubicación de Personaje'; break;
                    case 'event': displayCategory = 'Ubicación de Evento'; break;
                    case 'danger': displayCategory = 'Zona de Peligro'; break;
                    case 'safe': displayCategory = 'Zona Segura'; break;
                    case 'location': displayCategory = 'Ubicación'; break;
                    default: displayCategory = 'Desconocido'; break;
                }
                
                let createdText = '';
                if (created) {
                    const date = new Date(created);
                    createdText = `<p><strong>Creado:</strong> ${date.toLocaleDateString()}</p>`;
                }
                
                popupContent.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>Categoría:</strong> <span class="category-${category}">${displayCategory}</span></p>
                    <p><strong>Descripción:</strong> ${description}</p>
                    ${createdText}
                `;
                
                popup.setPosition(event.coordinate);
                console.log('📍 Clicked marker:', name);
            } else {
                // Hide popup and show coordinates as before
                popup.setPosition(undefined);
                const coordinate = event.coordinate;
                const x = Math.round(coordinate[0]);
                const y = Math.round(coordinate[1]);
                document.getElementById('current-coords').textContent = `(${x}, ${y})`;
                console.log('Clicked at:', coordinate);
            }
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
        
        // Click interaction is handled in initializeMap() for both markers and coordinates
        
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
        console.log('🗺️ Initializing Distrito Mercurii interactive map...');
        
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

### Navegación del Mapa

- **Zoom**: Utiliza los controles de zoom (+/-) o la rueda del ratón para explorar diferentes niveles de detalle
- **Navegación**: Haz clic y arrastra para moverte por el mapa
- **Marcadores**: Haz clic en los puntos de interés para ver información detallada
- **Coordenadas**: Las coordenadas se actualizan en tiempo real al mover el ratón

### Ubicaciones Importantes en el Mapa

- **🏥 Clínica Mediodía**: Una clínica de la seguridad social de Arcadia, centro de servicios médicos del distrito

---

## Descripción

El **Distrito Mercurii** es el distrito residencial de clase media de Arcadia, donde viven profesionales, técnicos y empleados cualificados. Ubicado en la **Isla Nigredo**, centro de comunicaciones y transformación intelectual del archipiélago, combina viviendas de calidad media-alta con servicios educativos avanzados y espacios para el desarrollo profesional.

### 🏢 Características Principales

- **Población**: ~195,000 habitantes
- **Isla**: Nigredo (centro de comunicaciones del archipiélago)
- **Enfoque**: Vivienda de clase media, servicios educativos y profesionales
- **Arquitectura**: Moderna, confortable, con espacios adaptados para home office
- **Carácter**: Profesional, educativo, aspiracional

### 💼 Servicios y Facilidades

#### **Servicios Educativos**
- Escuelas técnicas especializadas
- Centros de formación profesional continua
- Bibliotecas públicas con recursos digitales avanzados
- Academias de idiomas y tecnología

#### **Infraestructura Profesional**
- Espacios de coworking distribuidos por el distrito
- Centros de conferencias y reuniones
- Conexión de alta velocidad en toda el área residencial
- Oficinas satélite de empresas principales

#### **Servicios Residenciales**
- Centros comerciales de gama media-alta
- Instalaciones deportivas y recreativas
- Parques familiares bien mantenidos
- Servicios médicos privados accesibles

### 🌆 Vida en el Distrito

El Distrito Mercurii representa el corazón de la clase media profesional de Arcadia. Sus residentes son principalmente:

- **Profesionales técnicos**: Ingenieros, programadores, diseñadores
- **Empleados cualificados**: Administrativos senior, gerentes medios
- **Pequeños empresarios**: Dueños de negocios locales
- **Profesionales independientes**: Consultores, freelancers especializados

La vida aquí gira en torno al equilibrio trabajo-vida, con horarios flexibles y una fuerte cultura de desarrollo profesional continuo. El distrito es conocido por su ambiente tranquilo pero dinámico, ideal para familias jóvenes profesionales.

### 🚇 Conectividad

Como parte de la Isla Nigredo, el Distrito Mercurii está estratégicamente ubicado como centro de comunicaciones:

- **Metro inter-insular**: Conexiones directas con los distritos principales
- **Red de datos**: Hub principal de telecomunicaciones de Arcadia
- **Transporte público**: Servicio eficiente cada 15-20 minutos
- **Accesos vehiculares**: Avenidas amplias con estacionamiento subterráneo

### 📍 Ubicación en Isla Nigredo

La **Isla Nigredo** es conocida como el centro de transformación intelectual del archipiélago. El nombre deriva de la fase alquímica de putrefacción y renovación, simbolizando la constante evolución profesional y educativa de sus habitantes.

### Enlaces Relacionados

- [Geografía de Arcadia]({{ site.baseurl }}/world-building/geography/)
- [Distritos Residenciales]({{ site.baseurl }}/world-building/geography/residential-districts/)
- [Distrito Iovis]({{ site.baseurl }}/world-building/geography/distrito-iovis/)
- [Distrito Martis]({{ site.baseurl }}/world-building/geography/distrito-martis/)

---

*El Distrito Mercurii representa la aspiración y el progreso de la clase media de Arcadia, un lugar donde el esfuerzo profesional se traduce en calidad de vida.*

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

/* Popup styling */
.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
    max-width: 400px;
    z-index: 1000;
}

.ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before {
    border-color: rgba(204, 204, 204, 0);
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
    color: #c3c3c3;
    font-size: 20px;
    font-weight: bold;
}

.ol-popup-closer:after {
    content: "✖";
}

.ol-popup-closer:hover {
    color: #999;
}

.ol-popup h3 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
}

.ol-popup p {
    margin: 5px 0;
    font-size: 14px;
    line-height: 1.4;
}

/* Category styling */
.category-general {
    color: #9E9E9E;
    font-weight: bold;
}

.category-building,
.category-edificio {
    color: #607D8B;
    font-weight: bold;
}

.category-landmark,
.category-punto-de-referencia {
    color: #4CAF50;
    font-weight: bold;
}

.category-character,
.category-ubicación-de-personaje {
    color: #2196F3;
    font-weight: bold;
}

.category-event,
.category-ubicación-de-evento {
    color: #9C27B0;
    font-weight: bold;
}

.category-danger,
.category-zona-de-peligro {
    color: #F44336;
    font-weight: bold;
}

.category-safe,
.category-zona-segura {
    color: #4CAF50;
    font-weight: bold;
}

/* Legacy compatibility */
.category-location {
    color: #4CAF50;
    font-weight: bold;
}

.category-unknown {
    color: #9E9E9E;
    font-weight: bold;
}
</style>