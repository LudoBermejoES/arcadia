#!/usr/bin/env node

/**
 * Character List Link Checker
 * Verifies that character-list page links work correctly
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

class CharacterListChecker {
    constructor() {
        this.targetUrl = 'https://LudoBermejoES.github.io/arcadia/characters/character-list/';
        this.brokenLinks = [];
        this.workingLinks = [];
        this.checkedUrls = new Set();
    }

    /**
     * Make HTTP/HTTPS request
     */
    makeRequest(url) {
        return new Promise((resolve) => {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;
            
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port,
                path: urlObj.pathname + urlObj.search,
                method: 'HEAD',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                timeout: 10000
            };

            const req = client.request(options, (res) => {
                resolve({
                    url: url,
                    statusCode: res.statusCode,
                    success: res.statusCode >= 200 && res.statusCode < 400
                });
            });

            req.on('error', (err) => {
                resolve({
                    url: url,
                    statusCode: 'ERROR',
                    error: err.message,
                    success: false
                });
            });

            req.on('timeout', () => {
                req.destroy();
                resolve({
                    url: url,
                    statusCode: 'TIMEOUT',
                    error: 'Request timeout',
                    success: false
                });
            });

            req.end();
        });
    }

    /**
     * Get page content
     */
    getPageContent(url) {
        return new Promise((resolve) => {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;
            
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port,
                path: urlObj.pathname + urlObj.search,
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                timeout: 15000
            };

            const req = client.request(options, (res) => {
                let data = '';
                
                res.on('data', chunk => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        content: data,
                        success: res.statusCode >= 200 && res.statusCode < 400
                    });
                });
            });

            req.on('error', (err) => {
                resolve({
                    statusCode: 'ERROR',
                    error: err.message,
                    success: false
                });
            });

            req.on('timeout', () => {
                req.destroy();
                resolve({
                    statusCode: 'TIMEOUT',
                    error: 'Request timeout',
                    success: false
                });
            });

            req.end();
        });
    }

    /**
     * Extract character links from HTML
     */
    extractCharacterLinks(html) {
        const links = new Set();
        
        // Find all character detail links
        const characterLinkRegex = /href=['"]([^'"]*\/characters\/details\/[^'"]*?)['\"]/gi;
        let match;
        
        while ((match = characterLinkRegex.exec(html)) !== null) {
            let link = match[1];
            
            // Convert to full URL if needed
            try {
                let fullUrl;
                if (link.startsWith('/')) {
                    fullUrl = `https://LudoBermejoES.github.io${link}`;
                } else if (link.startsWith('http')) {
                    fullUrl = link.replace('ludobermejoes.github.io', 'LudoBermejoES.github.io');
                } else {
                    fullUrl = new URL(link, 'https://LudoBermejoES.github.io/arcadia/').href;
                }
                
                links.add(fullUrl);
            } catch (e) {
                console.log(`Invalid character URL: ${link}`);
            }
        }
        
        return Array.from(links);
    }

    /**
     * Check a single URL
     */
    async checkUrl(url) {
        if (this.checkedUrls.has(url)) {
            return;
        }
        
        this.checkedUrls.add(url);
        console.log(`Checking: ${url}`);
        
        const result = await this.makeRequest(url);
        
        if (result.success) {
            this.workingLinks.push(result);
            console.log(`✅ OK: ${url}`);
        } else {
            this.brokenLinks.push(result);
            console.log(`❌ BROKEN: ${url} (${result.statusCode})`);
        }
        
        return result;
    }

    /**
     * Run the analysis
     */
    async runAnalysis() {
        console.log('🔍 Checking Character List Links...');
        console.log(`Target: ${this.targetUrl}\n`);
        
        try {
            // Check if character-list page loads
            console.log('=== Checking Character List Page ===');
            const pageResult = await this.checkUrl(this.targetUrl);
            
            if (!pageResult || !pageResult.success) {
                console.log('❌ Character list page failed to load');
                return;
            }
            
            // Get page content and extract links
            console.log('\n=== Extracting Character Links ===');
            const content = await this.getPageContent(this.targetUrl);
            
            if (!content.success) {
                console.log('❌ Failed to get page content');
                return;
            }
            
            const characterLinks = this.extractCharacterLinks(content.content);
            console.log(`Found ${characterLinks.length} character links to check\n`);
            
            // Check first 20 character links 
            console.log('=== Checking Character Detail Links (first 20) ===');
            const linksToCheck = characterLinks.slice(0, 20);
            
            for (const link of linksToCheck) {
                await this.checkUrl(link);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            console.log('\n✅ Character List Analysis Complete!');
            console.log(`🔍 Links checked: ${linksToCheck.length}/${characterLinks.length}`);
            console.log(`❌ Broken links: ${this.brokenLinks.length}`);
            console.log(`✅ Working links: ${this.workingLinks.length}`);
            
            if (this.brokenLinks.length > 0) {
                console.log('\n🚨 Broken Links:');
                this.brokenLinks.forEach(link => {
                    console.log(`   ❌ ${link.url} (${link.statusCode})`);
                });
            } else {
                console.log('\n🎉 All checked character links are working!');
            }
            
        } catch (error) {
            console.error('❌ Analysis failed:', error);
        }
    }
}

// Run the analysis
if (require.main === module) {
    const checker = new CharacterListChecker();
    checker.runAnalysis().catch(console.error);
}

module.exports = CharacterListChecker;