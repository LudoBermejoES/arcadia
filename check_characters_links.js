#!/usr/bin/env node

/**
 * Focused Link Checker for Characters Page
 * Checks https://ludobermejoes.github.io/arcadia/characters/ and validates all character links
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

class CharacterLinkChecker {
    constructor() {
        this.targetUrl = 'https://ludobermejoes.github.io/arcadia/characters/';
        this.correctBaseUrl = 'https://LudoBermejoES.github.io/arcadia/';
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
            
            // Convert to full URL
            try {
                let fullUrl;
                if (link.startsWith('/')) {
                    // Convert ludobermejoes to correct case
                    fullUrl = `https://LudoBermejoES.github.io${link}`;
                } else if (link.startsWith('http')) {
                    // Normalize username case
                    fullUrl = link.replace('ludobermejoes.github.io', 'LudoBermejoES.github.io');
                } else {
                    fullUrl = new URL(link, this.correctBaseUrl).href;
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
    async checkUrl(url, source = '') {
        if (this.checkedUrls.has(url)) {
            return;
        }
        
        this.checkedUrls.add(url);
        console.log(`Checking: ${url}`);
        
        const result = await this.makeRequest(url);
        result.source = source;
        
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
     * Generate detailed report
     */
    generateReport() {
        const report = [];
        
        report.push('# Character Links Analysis Report');
        report.push('## Detailed Analysis of Characters Page Links\\n');
        
        report.push(`**Analysis Date**: ${new Date().toISOString()}`);
        report.push(`**Target Page**: ${this.targetUrl}`);
        report.push(`**Total Character Links Checked**: ${this.workingLinks.length + this.brokenLinks.length}`);
        report.push(`**Working Links**: ${this.workingLinks.length}`);
        report.push(`**Broken Links**: ${this.brokenLinks.length}\\n`);
        
        if (this.brokenLinks.length > 0) {
            report.push('## 🚨 Broken Character Links\\n');
            
            this.brokenLinks.forEach(link => {
                report.push(`### ❌ ${link.url}`);
                report.push(`- **Status**: ${link.statusCode}`);
                if (link.error) {
                    report.push(`- **Error**: ${link.error}`);
                }
                
                // Analyze the issue
                if (link.url.includes('ludobermejoes')) {
                    report.push(`- **Issue**: Wrong username case (should be LudoBermejoES)`);
                } else if (link.statusCode === 404) {
                    report.push(`- **Issue**: Character page not found - check file exists and permalink`);
                }
                report.push('');
            });
        }
        
        if (this.workingLinks.length > 0) {
            report.push('## ✅ Working Character Links\\n');
            this.workingLinks.forEach(link => {
                report.push(`- ✅ ${link.url}`);
            });
        }
        
        // Recommendations
        report.push('\\n## 🔧 Recommendations\\n');
        
        const caseIssues = this.brokenLinks.filter(link => 
            link.url.includes('ludobermejoes'));
        const missing404s = this.brokenLinks.filter(link => 
            link.statusCode === 404);
            
        if (caseIssues.length > 0) {
            report.push('### Username Case Issues');
            report.push(`Found ${caseIssues.length} links with wrong username case`);
            report.push('**Fix**: Update all links to use correct case `LudoBermejoES.github.io`\\n');
        }
        
        if (missing404s.length > 0) {
            report.push('### Missing Character Pages');
            report.push(`Found ${missing404s.length} character pages that don\\'t exist`);
            report.push('**Fix**: Check that character files exist and have correct permalinks\\n');
        }
        
        return report.join('\\n');
    }

    /**
     * Run the character page analysis
     */
    async runAnalysis() {
        console.log('🔍 Analyzing Character Links...');
        console.log(`Target: ${this.targetUrl}\\n`);
        
        try {
            // First check if the characters page loads
            console.log('=== Checking Characters Page ===');
            const pageResult = await this.checkUrl(this.targetUrl, 'characters_page');
            
            if (!pageResult || !pageResult.success) {
                console.log('❌ Characters page failed to load, cannot continue');
                return;
            }
            
            // Get page content and extract character links
            console.log('\\n=== Extracting Character Links ===');
            const content = await this.getPageContent(this.targetUrl);
            
            if (!content.success) {
                console.log('❌ Failed to get page content');
                return;
            }
            
            const characterLinks = this.extractCharacterLinks(content.content);
            console.log(`Found ${characterLinks.length} character links to check\\n`);
            
            // Check each character link
            console.log('=== Checking Character Detail Links ===');
            for (const link of characterLinks) {
                await this.checkUrl(link, 'character_detail');
                // Small delay to be nice to GitHub Pages
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            
            // Generate and save report
            const report = this.generateReport();
            fs.writeFileSync('/Users/ludo/code/arcadia/character_links_report.md', report);
            
            console.log('\\n✅ Character Links Analysis Complete!');
            console.log(`📄 Report saved to: character_links_report.md`);
            console.log(`🔍 Total character links checked: ${characterLinks.length}`);
            console.log(`❌ Broken links found: ${this.brokenLinks.length}`);
            console.log(`✅ Working links found: ${this.workingLinks.length}`);
            
            if (this.brokenLinks.length > 0) {
                console.log('\\n🚨 Issues found! Check character_links_report.md for details.');
            } else {
                console.log('\\n🎉 All character links are working!');
            }
            
        } catch (error) {
            console.error('❌ Analysis failed:', error);
        }
    }
}

// Run the analysis
if (require.main === module) {
    const checker = new CharacterLinkChecker();
    checker.runAnalysis().catch(console.error);
}

module.exports = CharacterLinkChecker;