---
layout: page
title: "Distrito Aureliano - Mapa Interactivo"
permalink: /maps/distrito-aureliano/
---

# Distrito Aureliano

## Mapa Interactivo

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v9.2.4/ol.css" type="text/css">

<div id="map" class="map-container"></div>

<script type="module">
    import Map from 'https://cdn.skypack.dev/ol@v9.2.4/Map.js';
    import View from 'https://cdn.skypack.dev/ol@v9.2.4/View.js';
    import ImageLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Image.js';
    import Static from 'https://cdn.skypack.dev/ol@v9.2.4/source/ImageStatic.js';
    import Projection from 'https://cdn.skypack.dev/ol@v9.2.4/proj/Projection.js';
    import {getCenter} from 'https://cdn.skypack.dev/ol@v9.2.4/extent.js';
    import Overlay from 'https://cdn.skypack.dev/ol@v9.2.4/Overlay.js';
    
    // Initialize the map with OpenLayers v9.2.4 - now using PNG instead of SVG
    const imageUrl = '{{ site.baseurl }}/assets/maps/martis/Martis.png';
    console.log('Image URL:', imageUrl);
    
    // Define image extent [minX, minY, maxX, maxY]
    // Using actual PNG dimensions for proper rendering
    const imageExtent = [0, 0, 10155, 3948];
    
    // Create a custom projection for the image
    const imageProjection = new Projection({
        code: 'distrito-aureliano',
        units: 'pixels',
        extent: imageExtent,
    });
    
    // Test if image can be loaded first
    const img = new Image();
    img.onload = function() {
        console.log('Image dimensions:', img.width, 'x', img.height);
        console.log('Image loaded successfully, creating map...');
        const map = initializeMap();
        setupMapInteractions(map);
    };
    img.onerror = function(e) {
        console.error('Failed to load image:', imageUrl);
        console.error('Error:', e);
        // Try alternative approach or show error message
        document.getElementById('map').innerHTML = '<p style="text-align: center; padding: 50px;">Error: Unable to load map image. Please check the file path.</p>';
    };
    img.src = imageUrl;
    
    function createMapLayer() {
        // Create the image layer
        const imageLayer = new ImageLayer({
            source: new Static({
                url: imageUrl,
                imageExtent: imageExtent,
                projection: imageProjection,
            }),
        });
        
        // Add error handling for image loading
        imageLayer.getSource().on('imageloaderror', function(event) {
            console.error('OpenLayers image failed to load:', imageUrl);
            console.error('Error event:', event);
        });
        
        imageLayer.getSource().on('imageloadend', function(event) {
            console.log('OpenLayers image loaded successfully:', imageUrl);
        });
        
        return imageLayer;
    }
    
    function initializeMap() {
        const imageLayer = createMapLayer();
        
        // Create the map
        const map = new Map({
            target: 'map',
            layers: [imageLayer],
            view: new View({
                projection: imageProjection,
                center: getCenter(imageExtent),
                zoom: 2,
                minZoom: 0,
                maxZoom: 5
            })
        });
        
        // Fit the view to the image extent
        map.getView().fit(imageExtent, {
            padding: [20, 20, 20, 20]
        });
        
        return map;
    }
    
    // Optional: Add interactive features
    // Example: Add a marker/overlay
    /*
    const markerElement = document.createElement('div');
    markerElement.className = 'marker';
    markerElement.innerHTML = '📍';
    
    const marker = new Overlay({
        position: getCenter(imageExtent),
        positioning: 'center-center',
        element: markerElement,
        stopEvent: false
    });
    map.addOverlay(marker);
    */
    
    function setupMapInteractions(map) {
        // Add click interaction to show coordinates (for development)
        map.on('click', function(event) {
            const coordinate = event.coordinate;
            console.log('Clicked at:', coordinate);
            // You can use these coordinates to place markers or overlays
        });
        
        // Resize map when window resizes
        window.addEventListener('resize', function() {
            map.updateSize();
        });
    }
</script>

## Descripción

El Distrito Aureliano es una de las zonas más importantes de Arcadia, caracterizada por su arquitectura única y su rica historia dentro del universo de superhéroes.

## Navegación del Mapa

- **Zoom**: Utiliza los controles de zoom (+/-) para explorar diferentes niveles de detalle
- **Navegación**: Haz clic y arrastra para moverte por el mapa
- **Puntos de Interés**: Haz clic en los marcadores para obtener más información sobre ubicaciones específicas

## Enlaces Relacionados

- [Geografía de Arcadia]({{ site.baseurl }}/world-building/geography/arcadia-geography/)
- [Barrio Gótico]({{ site.baseurl }}/world-building/geography/barrio-gotico/)
- [Distrito Clásico]({{ site.baseurl }}/world-building/geography/distrito-clasico/)

<style>
.map-container {
    height: 600px;
    width: 100%;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

@media (max-width: 768px) {
    .map-container {
        height: 400px;
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

/* Custom marker style */
.marker {
    font-size: 20px;
    color: #ff6b6b;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
</style>