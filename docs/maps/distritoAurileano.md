---
layout: page
title: "Distrito Aureliano - Mapa Interactivo"
permalink: /maps/distrito-aureliano/
---

# Distrito Aureliano

## Mapa Interactivo

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

<div id="map" class="map-container"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

<script>
    // Initialize the map
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 4
    });

    // Define the bounds for the SVG overlay
    var bounds = [[0, 0], [1963, 1568]]; // Adjust these values based on your SVG dimensions
    
    // Add the SVG overlay
    var imageUrl = '{{ site.baseurl }}/assets/maps/DistritoAurileano.svg';
    L.imageOverlay(imageUrl, bounds).addTo(map);
    
    // Fit the map to the bounds
    map.fitBounds(bounds);
    
    // Optional: Add some markers or interactive elements
    // Example marker:
    // L.marker([500, 500]).addTo(map)
    //     .bindPopup('Punto de Interés<br>Descripción del lugar');
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

/* Customize Leaflet controls */
.leaflet-control-zoom {
    border: none !important;
}

.leaflet-control-zoom a {
    background-color: rgba(255, 255, 255, 0.8) !important;
    border: 1px solid #ccc !important;
}
</style>