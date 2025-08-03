#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Tile Generator using Sharp (based on https://gist.github.com/josephrocca/b4d0a13b0e679f85506d46c33c5481f5)
 * Adapted for Arcadia district maps
 */

async function generateTiles(inputImagePath, outputDir, maxZoom = 5) {
  console.log('🎯 Starting tile generation...');
  console.log(`📂 Input: ${inputImagePath}`);
  console.log(`📁 Output: ${outputDir}`);
  console.log(`🔍 Max zoom: ${maxZoom}`);
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Load and analyze input image
  const image = sharp(inputImagePath);
  const metadata = await image.metadata();
  
  console.log(`📐 Original dimensions: ${metadata.width} x ${metadata.height}`);
  console.log(`📊 Format: ${metadata.format}`);
  console.log('');
  
  // Calculate tile structure for each zoom level
  let totalTiles = 0;
  
  for (let zoom = maxZoom; zoom >= 0; zoom--) {
    console.log(`🔍 Processing zoom level ${zoom}...`);
    
    // Calculate dimensions for this zoom level
    // Each zoom level is half the resolution of the previous one
    const scale = Math.pow(2, maxZoom - zoom);
    const scaledWidth = Math.ceil(metadata.width / scale);
    const scaledHeight = Math.ceil(metadata.height / scale);
    
    console.log(`   📏 Scaled dimensions: ${scaledWidth} x ${scaledHeight}`);
    
    // Create zoom directory
    const zoomDir = path.join(outputDir, zoom.toString());
    if (!fs.existsSync(zoomDir)) {
      fs.mkdirSync(zoomDir, { recursive: true });
    }
    
    // Resize image for this zoom level
    const resizedImage = image.resize(scaledWidth, scaledHeight, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill'
    });
    
    // Tile size configuration - using 512x512 for better performance
    const tileSize = 512;
    
    // Calculate number of tiles
    const tilesX = Math.ceil(scaledWidth / tileSize);
    const tilesY = Math.ceil(scaledHeight / tileSize);
    const zoomTiles = tilesX * tilesY;
    totalTiles += zoomTiles;
    
    console.log(`   🔢 Tiles: ${tilesX} x ${tilesY} = ${zoomTiles} tiles (${tileSize}x${tileSize})`);
    
    // Generate tiles for this zoom level
    for (let x = 0; x < tilesX; x++) {
      // Create X directory
      const xDir = path.join(zoomDir, x.toString());
      if (!fs.existsSync(xDir)) {
        fs.mkdirSync(xDir, { recursive: true });
      }
      
      for (let y = 0; y < tilesY; y++) {
        const left = x * tileSize;
        const top = y * tileSize;
        const width = Math.min(tileSize, scaledWidth - left);
        const height = Math.min(tileSize, scaledHeight - top);
        
        const tilePath = path.join(xDir, `${y}.png`);
        
        try {
          await resizedImage
            .extract({ left, top, width, height })
            .png({ quality: 90, compressionLevel: 6 })
            .toFile(tilePath);
            
          // Progress indicator for large zoom levels
          if (zoomTiles > 50 && (x * tilesY + y + 1) % Math.ceil(zoomTiles / 10) === 0) {
            const progress = Math.round(((x * tilesY + y + 1) / zoomTiles) * 100);
            console.log(`   ⏳ Progress: ${progress}%`);
          }
        } catch (error) {
          console.error(`   ❌ Error creating tile ${zoom}/${x}/${y}:`, error.message);
        }
      }
    }
    
    console.log(`   ✅ Zoom level ${zoom} completed (${zoomTiles} tiles)`);
    console.log('');
  }
  
  console.log('🎉 Tile generation completed!');
  console.log(`📊 Total tiles generated: ${totalTiles} (512×512 pixels each)`);
  console.log(`💾 Output directory: ${outputDir}`);
  console.log('');
  console.log('🔧 Next steps:');
  console.log('1. Update the OpenLayers map tileSize to 512');
  console.log('2. Verify the tile URL pattern matches: {z}/{x}/{y}.png');
  console.log('3. Test the map in your browser');
  
  return totalTiles;
}

// Check if running directly
if (require.main === module) {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  const maxZoom = parseInt(process.argv[4]) || 5;
  
  if (!inputPath) {
    console.log('🚀 Arcadia Tile Generator');
    console.log('Usage: node generate-tiles.js <input-image> [output-dir] [max-zoom]');
    console.log('');
    console.log('Examples:');
    console.log('  node generate-tiles.js ./martis/Martis.png');
    console.log('  node generate-tiles.js ./martis/Martis.png ./martis/tiles');
    console.log('  node generate-tiles.js ./martis/Martis.png ./martis/tiles 6');
    console.log('');
    process.exit(1);
  }
  
  const defaultOutput = path.join(path.dirname(inputPath), 'tiles');
  const finalOutputPath = outputPath || defaultOutput;
  
  generateTiles(inputPath, finalOutputPath, maxZoom)
    .then(totalTiles => {
      console.log(`✨ Successfully generated ${totalTiles} tiles!`);
    })
    .catch(error => {
      console.error('💥 Error during tile generation:', error);
      process.exit(1);
    });
}

module.exports = { generateTiles };