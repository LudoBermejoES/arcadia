const fs = require('fs');
const path = require('path');

// Function to load the character mappings from JSON
function loadCharacterMappings(jsonPath) {
    try {
        const jsonContent = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(jsonContent);
        return data.character_mappings;
    } catch (error) {
        console.error('Error loading character mappings:', error.message);
        process.exit(1);
    }
}

// Function to fix encoding in text content
function fixEncoding(content, mappings) {
    let fixedContent = content;
    let changesCount = 0;
    
    // Apply each character mapping
    for (const [incorrect, correct] of Object.entries(mappings)) {
        const beforeLength = fixedContent.length;
        fixedContent = fixedContent.replaceAll(incorrect, correct);
        const afterLength = fixedContent.length;
        
        // Count replacements (approximate, since replacement might change length)
        const replacements = (beforeLength - afterLength + incorrect.length) / incorrect.length;
        if (replacements > 0) {
            changesCount += Math.floor(replacements);
            console.log(`  - Replaced "${incorrect}" with "${correct}": ${Math.floor(replacements)} instances`);
        }
    }
    
    return { content: fixedContent, changesCount };
}

// Function to process all markdown files in a folder
function processFolder(folderPath, mappings) {
    try {
        const files = fs.readdirSync(folderPath);
        const mdFiles = files.filter(file => file.endsWith('.md'));
        
        if (mdFiles.length === 0) {
            console.log('No .md files found in the specified folder.');
            return;
        }
        
        console.log(`Found ${mdFiles.length} .md files to process...\n`);
        
        let totalFiles = 0;
        let totalChanges = 0;
        
        mdFiles.forEach(filename => {
            const filePath = path.join(folderPath, filename);
            
            try {
                // Read file content
                const content = fs.readFileSync(filePath, 'utf8');
                
                // Fix encoding issues
                const result = fixEncoding(content, mappings);
                
                if (result.changesCount > 0) {
                    // Write fixed content back to file
                    fs.writeFileSync(filePath, result.content, 'utf8');
                    console.log(`✅ Fixed ${filename}: ${result.changesCount} character fixes`);
                    totalFiles++;
                    totalChanges += result.changesCount;
                } else {
                    console.log(`⚪ ${filename}: No encoding issues found`);
                }
                
            } catch (error) {
                console.error(`❌ Error processing ${filename}:`, error.message);
            }
            
            console.log(''); // Empty line for readability
        });
        
        console.log('='.repeat(50));
        console.log(`📊 SUMMARY:`);
        console.log(`   Files processed: ${mdFiles.length}`);
        console.log(`   Files modified: ${totalFiles}`);
        console.log(`   Total character fixes: ${totalChanges}`);
        console.log('='.repeat(50));
        
    } catch (error) {
        console.error('Error reading folder:', error.message);
        process.exit(1);
    }
}

// Main execution
function main() {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node fix-encoding.js <folder_path>');
        console.log('Example: node fix-encoding.js "C:\\code\\ArcadiaPage\\docs\\campaigns\\la-familia"');
        process.exit(1);
    }
    
    const folderPath = args[0];
    const jsonPath = path.join(__dirname, 'character-encoding-fixes.json');
    
    // Validate folder exists
    if (!fs.existsSync(folderPath)) {
        console.error('Error: Folder does not exist:', folderPath);
        process.exit(1);
    }
    
    // Validate JSON file exists
    if (!fs.existsSync(jsonPath)) {
        console.error('Error: character-encoding-fixes.json not found in script directory');
        process.exit(1);
    }
    
    console.log('🔧 Character Encoding Fixer');
    console.log('='.repeat(30));
    console.log(`📁 Target folder: ${folderPath}`);
    console.log(`📋 Using mappings from: ${jsonPath}`);
    console.log('');
    
    // Load character mappings
    const mappings = loadCharacterMappings(jsonPath);
    console.log('📝 Loaded character mappings:');
    for (const [incorrect, correct] of Object.entries(mappings)) {
        console.log(`   "${incorrect}" → "${correct}"`);
    }
    console.log('');
    
    // Process the folder
    processFolder(folderPath, mappings);
}

// Run the script
main();