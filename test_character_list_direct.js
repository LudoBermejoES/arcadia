#!/usr/bin/env node

const https = require('https');

// Test both URLs
const urls = [
    'https://ludobermejoes.github.io/arcadia/characters/character-list/',
    'https://LudoBermejoES.github.io/arcadia/characters/character-list/'
];

async function testUrl(url) {
    return new Promise((resolve) => {
        const request = https.get(url, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => {
                console.log(`\n=== ${url} ===`);
                console.log(`Status: ${response.statusCode}`);
                if (response.statusCode === 200) {
                    // Count links in content
                    const linkMatches = data.match(/href="[^"]*\/characters\/details\/[^"]*"/g);
                    const linkCount = linkMatches ? linkMatches.length : 0;
                    console.log(`Character links found: ${linkCount}`);
                    
                    if (linkCount > 0) {
                        console.log('Sample links:');
                        linkMatches.slice(0, 5).forEach(link => {
                            console.log(`  ${link}`);
                        });
                    }
                } else {
                    console.log('Page not accessible');
                }
                resolve();
            });
        });
        
        request.on('error', (error) => {
            console.log(`\n=== ${url} ===`);
            console.log(`Error: ${error.message}`);
            resolve();
        });
    });
}

async function testBothUrls() {
    console.log('🔍 Testing Character List URLs...');
    
    for (const url of urls) {
        await testUrl(url);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✅ Test complete!');
}

testBothUrls().catch(console.error);