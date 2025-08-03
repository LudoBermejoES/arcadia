#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Raster Tile Generator for OpenLayers
 * Creates a tile structure similar to web map services (TMS/XYZ)
 * Usage: node tile-generator.js <image-path>
 */

// Simple PNG header reader
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

function calculateTileStructure(width, height, tileSize = 256) {
    const levels = [];
    let currentWidth = width;
    let currentHeight = height;
    let zoomLevel = 0;
    
    // Calculate maximum zoom level where we still have reasonable tiles
    while (Math.max(currentWidth, currentHeight) >= tileSize) {
        const tilesX = Math.ceil(currentWidth / tileSize);
        const tilesY = Math.ceil(currentHeight / tileSize);
        
        levels.push({
            zoom: zoomLevel,
            width: currentWidth,
            height: currentHeight,
            tilesX: tilesX,
            tilesY: tilesY,
            totalTiles: tilesX * tilesY,
            tileSize: tileSize
        });
        
        zoomLevel++;
        currentWidth = Math.ceil(currentWidth / 2);
        currentHeight = Math.ceil(currentHeight / 2);
    }
    
    return levels.reverse(); // Return highest zoom first
}

function generateTileCommands(imagePath, tileStructure) {
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const imageDir = path.dirname(imagePath);
    const tileDir = path.join(imageDir, 'tiles');
    
    const commands = [];
    
    // Create tile directory structure
    commands.push(`# Create tile directory structure`);
    commands.push(`mkdir -p "${tileDir}"`);
    commands.push('');
    
    tileStructure.forEach(level => {
        commands.push(`# Zoom level ${level.zoom} (${level.width}x${level.height}) - ${level.tilesX}x${level.tilesY} tiles`);
        commands.push(`mkdir -p "${tileDir}/${level.zoom}"`);
        
        // Generate ImageMagick commands for tile creation
        for (let x = 0; x < level.tilesX; x++) {
            commands.push(`mkdir -p "${tileDir}/${level.zoom}/${x}"`);
            
            for (let y = 0; y < level.tilesY; y++) {
                const offsetX = x * level.tileSize;
                const offsetY = y * level.tileSize;
                
                // Calculate actual tile dimensions (may be smaller at edges)
                const tileWidth = Math.min(level.tileSize, level.width - offsetX);
                const tileHeight = Math.min(level.tileSize, level.height - offsetY);
                
                const cmd = `magick "${imagePath}" ` +
                           `-resize ${level.width}x${level.height}! ` +
                           `-crop ${tileWidth}x${tileHeight}+${offsetX}+${offsetY} ` +
                           `"${tileDir}/${level.zoom}/${x}/${y}.png"`;
                
                commands.push(cmd);
            }
        }
        commands.push('');
    });
    
    return commands;
}

function generateOpenLayersConfig(imageName, originalWidth, originalHeight, tileStructure) {
    const baseName = path.basename(imageName, path.extname(imageName));
    const maxZoom = Math.max(...tileStructure.map(l => l.zoom));
    const minZoom = Math.min(...tileStructure.map(l => l.zoom));
    
    const config = {
        name: baseName,
        originalDimensions: { width: originalWidth, height: originalHeight },
        extent: [0, 0, originalWidth, originalHeight],
        tileSize: 256,
        minZoom: minZoom,
        maxZoom: maxZoom,
        tileStructure: tileStructure,
        tileUrlTemplate: `{{ site.baseurl }}/assets/maps/${path.dirname(imageName).split(path.sep).pop()}/tiles/{z}/{x}/{y}.png`
    };
    
    return config;
}

function generateOpenLayersCode(config) {
    return `
// Raster tile configuration for ${config.name}
const mapConfig = {
    name: "${config.name}",
    originalDimensions: { width: ${config.originalDimensions.width}, height: ${config.originalDimensions.height} },
    extent: [${config.extent.join(', ')}],
    tileSize: ${config.tileSize},
    minZoom: ${config.minZoom},
    maxZoom: ${config.maxZoom}
};

// Create custom projection for the map
const mapProjection = new Projection({
    code: '${config.name.toLowerCase()}-projection',
    units: 'pixels',
    extent: mapConfig.extent,
});

// Custom XYZ tile source for our raster tiles
class CustomXYZSource extends XYZ {
    constructor(options) {
        super(options);
    }
    
    // Override getTileUrlFunction to handle our custom tile structure
    getTileUrlFunction() {
        const tileUrlFunction = this.tileUrlFunction_ || this.createDefaultTileUrlFunction();
        return tileUrlFunction;
    }
}

// Create tile layer with XYZ source
function createTileLayer() {
    const tileLayer = new TileLayer({
        source: new CustomXYZSource({
            url: '${config.tileUrlTemplate}',
            projection: mapProjection,
            tileGrid: new TileGrid({
                extent: mapConfig.extent,
                origin: [0, mapConfig.originalDimensions.height], // Top-left origin for image coordinates
                resolutions: generateResolutions(),
                tileSize: mapConfig.tileSize
            }),
            wrapX: false
        })
    });
    
    return tileLayer;
}

// Generate resolutions for each zoom level
function generateResolutions() {
    const resolutions = [];
    for (let z = mapConfig.minZoom; z <= mapConfig.maxZoom; z++) {
        resolutions[z] = Math.pow(2, mapConfig.maxZoom - z);
    }
    return resolutions;
}

// Initialize the map
function initializeMap() {
    const tileLayer = createTileLayer();
    
    const map = new Map({
        target: 'map',
        layers: [tileLayer],
        view: new View({
            projection: mapProjection,
            center: [mapConfig.originalDimensions.width / 2, mapConfig.originalDimensions.height / 2],
            zoom: mapConfig.minZoom,
            minZoom: mapConfig.minZoom,
            maxZoom: mapConfig.maxZoom,
            extent: mapConfig.extent
        })
    });
    
    // Fit view to show entire image
    map.getView().fit(mapConfig.extent, {
        padding: [20, 20, 20, 20]
    });
    
    return map;
}`;
}

function analyzeImageForTiles(imagePath) {
    console.log('\n=== Raster Tile Analysis for OpenLayers ===\n');
    
    if (!fs.existsSync(imagePath)) {
        console.error('Error: Image file not found:', imagePath);
        process.exit(1);
    }
    
    try {
        // Get image dimensions
        const dimensions = getPNGDimensions(imagePath);
        const fileStats = fs.statSync(imagePath);
        const fileSizeMB = (fileStats.size / (1024 * 1024)).toFixed(2);
        
        console.log(`📷 Image: ${path.basename(imagePath)}`);
        console.log(`📐 Dimensions: ${dimensions.width} x ${dimensions.height} pixels`);
        console.log(`📊 Aspect Ratio: ${(dimensions.width / dimensions.height).toFixed(3)}`);
        console.log(`💾 File Size: ${fileSizeMB} MB`);
        console.log('');
        
        // Calculate tile structure
        const tileStructure = calculateTileStructure(dimensions.width, dimensions.height, 256);
        
        console.log('🔧 Tile Structure (256px tiles):');
        let totalTiles = 0;
        tileStructure.forEach(level => {
            console.log(`  Zoom ${level.zoom}: ${level.tilesX}×${level.tilesY} = ${level.totalTiles} tiles (${level.width}×${level.height})`);
            totalTiles += level.totalTiles;
        });
        console.log(`  📊 Total tiles across all levels: ${totalTiles}`);
        console.log('');
        
        // Generate tile creation commands
        const commands = generateTileCommands(imagePath, tileStructure);
        
        // Generate OpenLayers configuration
        const config = generateOpenLayersConfig(imagePath, dimensions.width, dimensions.height, tileStructure);
        
        // Generate JavaScript code
        const jsCode = generateOpenLayersCode(config);
        
        console.log('🛠️  ImageMagick Commands to Generate Tiles:');
        console.log('=====================================');
        commands.forEach(cmd => console.log(cmd));
        console.log('=====================================');
        console.log('');
        
        console.log('📝 OpenLayers JavaScript Code:');
        console.log('=====================================');
        console.log(jsCode);
        console.log('=====================================');
        console.log('');
        
        // Save files
        const configPath = imagePath.replace('.png', '_tile_config.json');
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(`💾 Tile configuration saved to: ${configPath}`);
        
        const jsPath = imagePath.replace('.png', '_tiles_openlayers.js');
        fs.writeFileSync(jsPath, jsCode);
        console.log(`📄 JavaScript code saved to: ${jsPath}`);
        
        const commandsPath = imagePath.replace('.png', '_tile_commands.sh');
        fs.writeFileSync(commandsPath, commands.join('\n'));
        console.log(`🔧 ImageMagick commands saved to: ${commandsPath}`);
        
        console.log('');
        console.log('🚀 Next Steps:');
        console.log('1. Install ImageMagick if not already installed');
        console.log('2. Run the generated shell script to create tiles:');
        console.log(`   bash "${commandsPath}"`);
        console.log('3. Update your OpenLayers map to use the generated JavaScript code');
        console.log('4. Import TileLayer and XYZ from OpenLayers in your HTML');
        console.log('');
        console.log('📦 Required OpenLayers imports:');
        console.log("   import TileLayer from 'https://cdn.skypack.dev/ol@v9.2.4/layer/Tile.js';");
        console.log("   import XYZ from 'https://cdn.skypack.dev/ol@v9.2.4/source/XYZ.js';");
        console.log("   import TileGrid from 'https://cdn.skypack.dev/ol@v9.2.4/tilegrid/TileGrid.js';");
        
    } catch (error) {
        console.error('Error analyzing image:', error.message);
        process.exit(1);
    }
}

// Main execution
if (require.main === module) {
    const imagePath = process.argv[2];
    
    if (!imagePath) {
        console.log('Usage: node tile-generator.js <image-path>');
        console.log('Example: node tile-generator.js ./martis/Martis.png');
        console.log('');
        console.log('This will generate:');
        console.log('- Tile directory structure');
        console.log('- ImageMagick commands to create tiles');
        console.log('- OpenLayers configuration for XYZ tile source');
        process.exit(1);
    }
    
    analyzeImageForTiles(imagePath);
}

module.exports = { getPNGDimensions, calculateTileStructure, generateOpenLayersConfig };