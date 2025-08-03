// Arcadia Map Marker Manager - Frontend Application
import Map from 'https://cdn.skypack.dev/ol@v9.2.4/Map.js';
import View from 'https://cdn.skypack.dev/ol@v9.2.4/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Tile.js';
import ImageLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Image.js';
import VectorLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Vector.js';
import XYZ from 'https://cdn.skypack.dev/ol@v9.2.4/source/XYZ.js';
import Static from 'https://cdn.skypack.dev/ol@v9.2.4/source/ImageStatic.js';
import VectorSource from 'https://cdn.skypack.dev/ol@v9.2.4/source/Vector.js';
import GeoJSON from 'https://cdn.skypack.dev/ol@v9.2.4/format/GeoJSON.js';
import Feature from 'https://cdn.skypack.dev/ol@v9.2.4/Feature.js';
import Point from 'https://cdn.skypack.dev/ol@v9.2.4/geom/Point.js';
import TileGrid from 'https://cdn.skypack.dev/ol@v9.2.4/tilegrid/TileGrid.js';
import Projection from 'https://cdn.skypack.dev/ol@v9.2.4/proj/Projection.js';
import {getCenter} from 'https://cdn.skypack.dev/ol@v9.2.4/extent.js';
import Select from 'https://cdn.skypack.dev/ol@v9.2.4/interaction/Select.js';
import {Style, Icon, Fill, Stroke, Circle, Text} from 'https://cdn.skypack.dev/ol@v9.2.4/style.js';

// Global variables
let currentMap = null;
let currentMapConfig = null;
let vectorLayer = null;
let vectorSource = null;
let selectInteraction = null;
let addMarkerMode = false;
let currentMarkerId = null;
let availableMaps = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🗺️ Inicializando Gestor de Marcadores Arcadia...');
    
    await loadAvailableMaps();
    setupEventListeners();
    
    console.log('✅ Gestor de Marcadores inicializado');
});

// Load available maps from the server
async function loadAvailableMaps() {
    try {
        const response = await fetch('/api/maps');
        availableMaps = await response.json();
        
        const mapSelect = document.getElementById('mapSelect');
        mapSelect.innerHTML = '<option value="">Selecciona un mapa...</option>';
        
        availableMaps.forEach(map => {
            const option = document.createElement('option');
            option.value = map.id;
            option.textContent = `${map.name} (${map.hasTiles ? 'Mosaicos' : 'Imagen'})`;
            mapSelect.appendChild(option);
        });
        
        console.log(`📂 Cargados ${availableMaps.length} mapas disponibles`);
    } catch (error) {
        console.error('❌ Error cargando mapas:', error);
        showStatus('Error cargando mapas disponibles', 'error');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Map selection
    document.getElementById('mapSelect').addEventListener('change', handleMapSelection);
    
    // Marker form submission
    document.getElementById('markerForm').addEventListener('submit', handleMarkerFormSubmit);
    
    // Close modal when clicking outside
    document.getElementById('markerModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeMarkerModal();
        }
    });
}

// Handle map selection
async function handleMapSelection(e) {
    const mapId = e.target.value;
    
    if (!mapId) {
        if (currentMap) {
            currentMap.setTarget(null);
            currentMap = null;
            currentMapConfig = null;
        }
        document.getElementById('markerList').innerHTML = '<p>Selecciona un mapa para ver marcadores</p>';
        return;
    }
    
    try {
        showStatus('Cargando mapa...', 'success');
        
        // Load map configuration
        const mapResponse = await fetch(`/api/maps/${mapId}`);
        currentMapConfig = await mapResponse.json();
        
        // Load existing markers
        const markersResponse = await fetch(`/api/maps/${mapId}/markers`);
        const markersData = await markersResponse.json();
        
        // Initialize the map
        await initializeMap(currentMapConfig, markersData);
        
        showStatus(`Mapa "${currentMapConfig.name}" cargado exitosamente!`, 'success');
        
    } catch (error) {
        console.error('❌ Error cargando mapa:', error);
        showStatus('Error cargando mapa', 'error');
    }
}

// Initialize OpenLayers map
async function initializeMap(mapConfig, markersData) {
    console.log('🗺️ Inicializando mapa:', mapConfig.name);
    
    // Clean up existing map
    if (currentMap) {
        currentMap.setTarget(null);
    }
    
    // Create custom projection
    const mapProjection = new Projection({
        code: `${mapConfig.id}-projection`,
        units: 'pixels',
        extent: mapConfig.extent,
    });
    
    // Create map layers
    const layers = [];
    
    // Add base map layer (tiles or image)
    if (mapConfig.hasTiles) {
        // Use tile layer
        const tileLayer = createTileLayer(mapConfig, mapProjection);
        layers.push(tileLayer);
    } else if (mapConfig.imageFile) {
        // Use image layer
        const imageLayer = createImageLayer(mapConfig, mapProjection);
        layers.push(imageLayer);
    }
    
    // Create vector layer for markers
    vectorSource = new VectorSource();
    vectorLayer = new VectorLayer({
        source: vectorSource,
        style: createMarkerStyle
    });
    layers.push(vectorLayer);
    
    // Create the map
    currentMap = new Map({
        target: 'map',
        layers: layers,
        view: new View({
            projection: mapProjection,
            center: getCenter(mapConfig.extent),
            zoom: 2,
            minZoom: mapConfig.minZoom || 0,
            maxZoom: mapConfig.maxZoom || 6,
            extent: mapConfig.extent
        })
    });
    
    // Fit view to map extent
    currentMap.getView().fit(mapConfig.extent, {
        padding: [20, 20, 20, 20]
    });
    
    // Setup interactions
    setupMapInteractions();
    
    // Load markers
    loadMarkersOnMap(markersData);
    
    console.log('✅ Mapa inicializado exitosamente');
}

// Create tile layer for maps with tiles
function createTileLayer(mapConfig, mapProjection) {
    // Generate resolutions for each zoom level
    function generateResolutions() {
        const resolutions = [];
        const maxZoom = mapConfig.maxZoom || 6;
        for (let z = 0; z <= maxZoom; z++) {
            resolutions[z] = Math.pow(2, maxZoom - z);
        }
        return resolutions;
    }
    
    const tileUrlTemplate = `/${mapConfig.directory}/tiles/{z}/{x}/{y}.png`;
    
    const tileLayer = new TileLayer({
        source: new XYZ({
            url: tileUrlTemplate,
            projection: mapProjection,
            tileGrid: new TileGrid({
                extent: mapConfig.extent,
                origin: [0, mapConfig.extent[3]], // Top-left origin
                resolutions: generateResolutions(),
                tileSize: 512
            }),
            wrapX: false
        })
    });
    
    return tileLayer;
}

// Create image layer for maps without tiles
function createImageLayer(mapConfig, mapProjection) {
    const imageUrl = `/${mapConfig.directory}/${mapConfig.imageFile}`;
    
    const imageLayer = new ImageLayer({
        source: new Static({
            url: imageUrl,
            imageExtent: mapConfig.extent,
            projection: mapProjection,
        })
    });
    
    return imageLayer;
}

// Setup map interactions
function setupMapInteractions() {
    // Add select interaction for editing markers
    selectInteraction = new Select({
        layers: [vectorLayer],
        style: createSelectedMarkerStyle
    });
    
    currentMap.addInteraction(selectInteraction);
    
    // Handle marker selection
    selectInteraction.on('select', function(e) {
        if (e.selected.length > 0) {
            const feature = e.selected[0];
            selectMarkerInList(feature.getId());
        } else {
            clearMarkerSelection();
        }
    });
    
    // Handle map clicks
    currentMap.on('click', function(e) {
        if (addMarkerMode) {
            const coordinate = e.coordinate;
            showMarkerModal(null, coordinate[0], coordinate[1]);
            addMarkerMode = false;
            document.querySelector('button[onclick="enableAddMode()"]').textContent = '➕ Add Marker Mode';
        }
    });
}

// Create marker style
function createMarkerStyle(feature) {
    const category = feature.get('category') || 'general';
    const colors = {
        general: '#007bff',
        building: '#6c757d',
        landmark: '#28a745',
        character: '#ffc107',
        event: '#17a2b8',
        danger: '#dc3545',
        safe: '#20c997'
    };
    
    return new Style({
        image: new Circle({
            radius: 8,
            fill: new Fill({
                color: colors[category] || colors.general
            }),
            stroke: new Stroke({
                color: '#ffffff',
                width: 2
            })
        }),
        text: new Text({
            text: feature.get('name') || 'Marcador',
            offsetY: -25,
            fill: new Fill({
                color: '#000000'
            }),
            stroke: new Stroke({
                color: '#ffffff',
                width: 3
            }),
            font: '12px sans-serif'
        })
    });
}

// Create selected marker style
function createSelectedMarkerStyle(feature) {
    return new Style({
        image: new Circle({
            radius: 12,
            fill: new Fill({
                color: '#ff6b6b'
            }),
            stroke: new Stroke({
                color: '#ffffff',
                width: 3
            })
        }),
        text: new Text({
            text: feature.get('name') || 'Marcador',
            offsetY: -30,
            fill: new Fill({
                color: '#000000'
            }),
            stroke: new Stroke({
                color: '#ffffff',
                width: 3
            }),
            font: 'bold 14px sans-serif'
        })
    });
}

// Load markers onto the map
function loadMarkersOnMap(markersData) {
    // Clear existing markers
    vectorSource.clear();
    
    if (markersData.features && markersData.features.length > 0) {
        const format = new GeoJSON();
        const features = format.readFeatures(markersData, {
            featureProjection: currentMap.getView().getProjection()
        });
        
        vectorSource.addFeatures(features);
        console.log(`📍 Cargados ${features.length} marcadores`);
    }
    
    updateMarkerList(markersData);
}

// Update marker list in sidebar
function updateMarkerList(markersData) {
    const markerList = document.getElementById('markerList');
    
    if (!markersData.features || markersData.features.length === 0) {
        markerList.innerHTML = '<p>No se encontraron marcadores. Haz clic en "Modo Añadir Marcador" y luego haz clic en el mapa para añadir marcadores.</p>';
        return;
    }
    
    markerList.innerHTML = '';
    
    markersData.features.forEach(feature => {
        const markerItem = document.createElement('div');
        markerItem.className = 'marker-item';
        markerItem.dataset.markerId = feature.id;
        
        const coords = feature.geometry.coordinates;
        const props = feature.properties;
        
        markerItem.innerHTML = `
            <div class="marker-name">${props.name || 'Marcador Sin Nombre'}</div>
            <div class="marker-coords">(${Math.round(coords[0])}, ${Math.round(coords[1])})</div>
            <div style="font-size: 0.8em; margin-top: 5px;">${props.category || 'general'}</div>
        `;
        
        markerItem.addEventListener('click', function() {
            selectMarkerById(feature.id);
        });
        
        markerItem.addEventListener('dblclick', function() {
            showMarkerModal(feature.id, coords[0], coords[1]);
        });
        
        markerList.appendChild(markerItem);
    });
}

// Select marker in list
function selectMarkerInList(markerId) {
    // Clear previous selection
    document.querySelectorAll('.marker-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select new marker
    const markerItem = document.querySelector(`[data-marker-id="${markerId}"]`);
    if (markerItem) {
        markerItem.classList.add('selected');
        currentMarkerId = markerId;
    }
}

// Select marker by ID
function selectMarkerById(markerId) {
    const feature = vectorSource.getFeatureById(markerId);
    if (feature) {
        selectInteraction.getFeatures().clear();
        selectInteraction.getFeatures().push(feature);
        selectMarkerInList(markerId);
        
        // Center map on marker
        const coords = feature.getGeometry().getCoordinates();
        currentMap.getView().setCenter(coords);
    }
}

// Clear marker selection
function clearMarkerSelection() {
    document.querySelectorAll('.marker-item').forEach(item => {
        item.classList.remove('selected');
    });
    currentMarkerId = null;
}

// Enable add marker mode
window.enableAddMode = function() {
    addMarkerMode = !addMarkerMode;
    const button = document.querySelector('button[onclick="enableAddMode()"]');
    
    if (addMarkerMode) {
        button.textContent = '❌ Cancelar Modo Añadir';
        button.style.background = '#dc3545';
        showStatus('Haz clic en el mapa para añadir un marcador', 'success');
    } else {
        button.textContent = '➕ Modo Añadir Marcador';
        button.style.background = '#007bff';
    }
};

// Show marker modal
function showMarkerModal(markerId = null, x = 0, y = 0) {
    const modal = document.getElementById('markerModal');
    const form = document.getElementById('markerForm');
    
    // Reset form
    form.reset();
    
    if (markerId) {
        // Editing existing marker
        const feature = vectorSource.getFeatureById(markerId);
        if (feature) {
            const props = feature.getProperties();
            document.getElementById('markerName').value = props.name || '';
            document.getElementById('markerDescription').value = props.description || '';
            document.getElementById('markerCategory').value = props.category || 'general';
        }
        
        document.querySelector('.modal-header').textContent = 'Editar Marcador';
        currentMarkerId = markerId;
    } else {
        // Adding new marker
        document.querySelector('.modal-header').textContent = 'Añadir Nuevo Marcador';
        currentMarkerId = null;
    }
    
    // Store coordinates
    form.dataset.x = x;
    form.dataset.y = y;
    
    modal.style.display = 'block';
    document.getElementById('markerName').focus();
}

// Close marker modal
window.closeMarkerModal = function() {
    document.getElementById('markerModal').style.display = 'none';
    currentMarkerId = null;
};

// Handle marker form submission
async function handleMarkerFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = document.getElementById('markerName').value;
    const description = document.getElementById('markerDescription').value;
    const category = document.getElementById('markerCategory').value;
    const x = parseFloat(form.dataset.x);
    const y = parseFloat(form.dataset.y);
    
    const markerData = {
        name,
        description,
        category,
        x,
        y
    };
    
    try {
        if (currentMarkerId) {
            // Update existing marker
            await updateMarker(currentMarkerId, markerData);
        } else {
            // Add new marker
            await addMarker(markerData);
        }
        
        closeMarkerModal();
        await reloadMarkers();
        
    } catch (error) {
        console.error('❌ Error saving marker:', error);
        showStatus('Error saving marker', 'error');
    }
}

// Add new marker
async function addMarker(markerData) {
    const mapId = currentMapConfig.id;
    const response = await fetch(`/api/maps/${mapId}/markers/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(markerData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to add marker');
    }
    
    const result = await response.json();
    
    // Show status including Git operations
    let statusMessage = 'Marcador añadido exitosamente';
    if (result.git) {
        if (result.git.success) {
            statusMessage += ` - ${result.git.message}`;
        } else {
            console.warn('Operación Git falló:', result.git.message);
            statusMessage += ' (Sincronización Git falló - revisar consola)';
        }
    }
    
    showStatus(statusMessage, 'success');
}

// Update existing marker
async function updateMarker(markerId, markerData) {
    const mapId = currentMapConfig.id;
    const response = await fetch(`/api/maps/${mapId}/markers/${markerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(markerData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to update marker');
    }
    
    const result = await response.json();
    
    // Show status including Git operations
    let statusMessage = 'Marcador actualizado exitosamente';
    if (result.git) {
        if (result.git.success) {
            statusMessage += ` - ${result.git.message}`;
        } else {
            console.warn('Operación Git falló:', result.git.message);
            statusMessage += ' (Sincronización Git falló - revisar consola)';
        }
    }
    
    showStatus(statusMessage, 'success');
}

// Delete selected marker
window.deleteSelectedMarker = async function() {
    if (!currentMarkerId) {
        showStatus('Ningún marcador seleccionado', 'error');
        return;
    }
    
    if (!confirm('¿Estás seguro de que quieres eliminar este marcador?')) {
        return;
    }
    
    try {
        const mapId = currentMapConfig.id;
        const response = await fetch(`/api/maps/${mapId}/markers/${currentMarkerId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete marker');
        }
        
        const result = await response.json();
        
        // Show status including Git operations
        let statusMessage = `Marcador "${result.deletedMarker}" eliminado exitosamente`;
        if (result.git) {
            if (result.git.success) {
                statusMessage += ` - ${result.git.message}`;
            } else {
                console.warn('Operación Git falló:', result.git.message);
                statusMessage += ' (Sincronización Git falló - revisar consola)';
            }
        }
        
        showStatus(statusMessage, 'success');
        await reloadMarkers();
        clearMarkerSelection();
        
    } catch (error) {
        console.error('❌ Error eliminando marcador:', error);
        showStatus('Error eliminando marcador', 'error');
    }
};

// Save all markers
window.saveAllMarkers = async function() {
    showStatus('Todos los marcadores se guardan automáticamente y se confirman en Git', 'success');
};

// Reload markers from server
async function reloadMarkers() {
    if (!currentMapConfig) return;
    
    try {
        const response = await fetch(`/api/maps/${currentMapConfig.id}/markers`);
        const markersData = await response.json();
        loadMarkersOnMap(markersData);
    } catch (error) {
        console.error('❌ Error recargando marcadores:', error);
        showStatus('Error recargando marcadores', 'error');
    }
}

// Show status message
function showStatus(message, type = 'success') {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    
    setTimeout(() => {
        status.style.display = 'none';
    }, 3000);
    
    console.log(`${type === 'error' ? '❌' : '✅'} ${message}`);
}