#!/usr/bin/env node

/**
 * Comprehensive Link Checker for Arcadia GitHub Pages
 * Uses Node.js built-in modules to check all links systematically
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

class LinkChecker {
    constructor() {
        this.baseUrl = 'https://ludobermejoes.github.io/arcadia/';
        this.correctBaseUrl = 'https://LudoBermejoES.github.io/arcadia/';
        this.checkedUrls = new Set();
        this.brokenLinks = [];
        this.workingLinks = [];
        this.pendingChecks = [];
        this.maxConcurrent = 5;
        this.currentChecks = 0;
    }

    /**
     * Make HTTP/HTTPS request with proper error handling
     */
    makeRequest(url) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;
            
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port,
                path: urlObj.pathname + urlObj.search,
                method: 'HEAD', // Use HEAD for faster checking
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                timeout: 10000
            };

            const req = client.request(options, (res) => {
                resolve({
                    url: url,
                    statusCode: res.statusCode,
                    headers: res.headers,
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
     * Get page content for link extraction
     */
    getPageContent(url) {
        return new Promise((resolve, reject) => {
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
     * Extract internal links from HTML content
     */
    extractLinks(html, baseUrl) {
        const links = new Set();
        
        // Regex to find href attributes
        const hrefRegex = /href=['"](.*?)['"]/gi;
        let match;
        
        while ((match = hrefRegex.exec(html)) !== null) {
            let link = match[1];
            
            // Skip non-page links
            if (link.startsWith('#') || link.startsWith('mailto:') || 
                link.startsWith('javascript:') || link.startsWith('tel:')) {
                continue;
            }
            
            // Convert relative links to absolute
            try {
                let fullUrl;
                if (link.startsWith('/arcadia')) {
                    fullUrl = `https://LudoBermejoES.github.io${link}`;
                } else if (link.startsWith('/')) {
                    fullUrl = `https://LudoBermejoES.github.io/arcadia${link}`;
                } else if (link.startsWith('http')) {
                    fullUrl = link;
                } else if (link.startsWith('../')) {
                    fullUrl = new URL(link, baseUrl).href;
                } else {
                    fullUrl = new URL(link, baseUrl).href;
                }
                
                // Only check internal Arcadia links
                if (fullUrl.includes('github.io') && fullUrl.includes('arcadia')) {
                    // Normalize username case
                    fullUrl = fullUrl.replace('ludobermejoes.github.io', 'LudoBermejoES.github.io');
                    links.add(fullUrl);
                }
            } catch (e) {
                console.log(`Invalid URL: ${link}`);
            }
        }
        
        return Array.from(links);
    }

    /**
     * Check a single URL and categorize result
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
        } else {
            this.brokenLinks.push(result);
            console.log(`❌ BROKEN: ${url} (${result.statusCode})`);
        }
        
        return result;
    }

    /**
     * Check main navigation pages
     */
    async checkMainPages() {
        console.log('\n=== Checking Main Navigation Pages ===');
        
        const mainPages = [
            'https://LudoBermejoES.github.io/arcadia/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/',
            'https://LudoBermejoES.github.io/arcadia/characters/',
            'https://LudoBermejoES.github.io/arcadia/groups/',
            'https://LudoBermejoES.github.io/arcadia/world-building/',
            'https://LudoBermejoES.github.io/arcadia/all-content/',
            'https://LudoBermejoES.github.io/arcadia/transcriptions/',
            'https://LudoBermejoES.github.io/arcadia/summaries/',
            'https://LudoBermejoES.github.io/arcadia/timeline/',
            'https://LudoBermejoES.github.io/arcadia/meta/',
        ];
        
        const discoveredLinks = [];
        
        for (const pageUrl of mainPages) {
            const result = await this.checkUrl(pageUrl, 'main_navigation');
            
            // If page loads, extract its links
            if (result && result.success) {
                const content = await this.getPageContent(pageUrl);
                if (content.success) {
                    const links = this.extractLinks(content.content, pageUrl);
                    discoveredLinks.push(...links);
                    console.log(`  Found ${links.length} links on this page`);
                }
            }
            
            // Small delay to be nice to GitHub Pages
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        return discoveredLinks;
    }

    /**
     * Check campaign pages
     */
    async checkCampaignPages() {
        console.log('\n=== Checking Campaign Pages ===');
        
        const campaignPages = [
            'https://LudoBermejoES.github.io/arcadia/campaigns/la-familia/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/genesis/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/la-fuerza-oculta/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/hospital/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/fatum/',
        ];
        
        for (const pageUrl of campaignPages) {
            await this.checkUrl(pageUrl, 'campaign_pages');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    /**
     * Check sample session and character pages
     */
    async checkSamplePages() {
        console.log('\n=== Checking Sample Session Pages ===');
        
        const samplePages = [
            'https://LudoBermejoES.github.io/arcadia/campaigns/la-familia/session-01/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/genesis/session-01/',
            'https://LudoBermejoES.github.io/arcadia/campaigns/la-fuerza-oculta/manual-notes/session-01/',
            'https://LudoBermejoES.github.io/arcadia/characters/details/garra/',
            'https://LudoBermejoES.github.io/arcadia/characters/details/diana/',
            'https://LudoBermejoES.github.io/arcadia/characters/details/astrid-kayface/',
            'https://LudoBermejoES.github.io/arcadia/characters/details/mencia-psique-cia/',
        ];
        
        for (const pageUrl of samplePages) {
            await this.checkUrl(pageUrl, 'sample_pages');
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    /**
     * Check discovered links (limited to prevent overload)
     */
    async checkDiscoveredLinks(discoveredLinks) {
        console.log(`\n=== Checking ${discoveredLinks.length} Discovered Links (first 30) ===`);
        
        const uniqueLinks = [...new Set(discoveredLinks)];
        const linksToCheck = uniqueLinks.slice(0, 30); // Limit to prevent overload
        
        for (const link of linksToCheck) {
            if (!this.checkedUrls.has(link)) {
                await this.checkUrl(link, 'discovered');
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
    }

    /**
     * Check specific problematic URLs we know about
     */
    async checkKnownProblematicUrls() {
        console.log('\n=== Checking Known Problematic URLs ===');
        
        const problematicUrls = [
            // Wrong username case
            'https://ludobermejoes.github.io/arcadia/',
            'https://ludobermejoes.github.io/arcadia/characters/',
            'https://ludobermejoes.github.io/arcadia/campaigns/la-familia/',
            
            // Potentially missing pages
            'https://LudoBermejoES.github.io/arcadia/characters/character-list/',
            'https://LudoBermejoES.github.io/arcadia/groups/character-groups/',
            'https://LudoBermejoES.github.io/arcadia/world-building/ambientacion/',
            'https://LudoBermejoES.github.io/arcadia/world-building/arcadia-geography/',
        ];
        
        for (const url of problematicUrls) {
            await this.checkUrl(url, 'known_problematic');
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    /**
     * Generate comprehensive report
     */
    generateReport() {
        const report = [];
        
        report.push('# Missing/Broken Links Analysis');
        report.push('## Comprehensive Link Check Results\n');
        
        const totalChecked = this.workingLinks.length + this.brokenLinks.length;
        report.push(`**Analysis Date**: ${new Date().toISOString()}`);
        report.push(`**Total URLs Checked**: ${totalChecked}`);
        report.push(`**Working Links**: ${this.workingLinks.length}`);
        report.push(`**Broken Links**: ${this.brokenLinks.length}\n`);
        
        if (this.brokenLinks.length > 0) {
            report.push('## 🚨 Broken Links Found\n');
            
            // Group by error type
            const byStatus = {};
            this.brokenLinks.forEach(link => {
                const status = link.statusCode;
                if (!byStatus[status]) byStatus[status] = [];
                byStatus[status].push(link);
            });
            
            Object.keys(byStatus).forEach(status => {
                const links = byStatus[status];
                report.push(`### ${status} Errors (${links.length} links)\n`);
                
                links.forEach(link => {
                    report.push(`- **URL**: \`${link.url}\``);
                    report.push(`  - **Source**: ${link.source}`);
                    if (link.error) {
                        report.push(`  - **Error**: ${link.error}`);
                    }
                    report.push('');
                });
            });
        }
        
        // Analysis and recommendations
        report.push('## 🔧 Recommended Fixes\n');
        
        const caseIssues = this.brokenLinks.filter(link => 
            link.url.includes('ludobermejoes'));
        const missing404s = this.brokenLinks.filter(link => 
            link.statusCode === 404);
        
        if (caseIssues.length > 0) {
            report.push('### Username Case Issues');
            report.push(`Found ${caseIssues.length} links using incorrect case`);
            report.push('❌ **Problem**: URLs using `ludobermejoes` instead of `LudoBermejoES`');
            report.push('✅ **Solution**: Update all links to use proper case `LudoBermejoES.github.io`\n');
        }
        
        if (missing404s.length > 0) {
            report.push('### Missing Pages (404 Errors)');
            report.push(`Found ${missing404s.length} pages that don't exist`);
            report.push('❌ **Problem**: Pages referenced but not found');
            report.push('✅ **Solution**: Check Jekyll permalinks in front matter\n');
            
            missing404s.forEach(link => {
                report.push(`- \`${link.url}\` (from: ${link.source})`);
            });
            report.push('');
        }
        
        // Sample of working links
        if (this.workingLinks.length > 0) {
            report.push('## ✅ Working Links (Sample)\n');
            const sampleWorking = this.workingLinks.slice(0, 10);
            sampleWorking.forEach(link => {
                report.push(`- ✅ \`${link.url}\``);
            });
            
            if (this.workingLinks.length > 10) {
                report.push(`\n... and ${this.workingLinks.length - 10} more working links`);
            }
        }
        
        report.push('\n## 📊 Summary by Source\n');
        const bySources = {};
        this.brokenLinks.forEach(link => {
            if (!bySources[link.source]) bySources[link.source] = 0;
            bySources[link.source]++;
        });
        
        Object.keys(bySources).forEach(source => {
            report.push(`- **${source}**: ${bySources[source]} broken links`);
        });
        
        return report.join('\n');
    }

    /**
     * Run the complete analysis
     */
    async runAnalysis() {
        console.log('🔍 Starting comprehensive link analysis...');
        console.log('Target: Arcadia GitHub Pages site\n');
        
        try {
            // Check main pages and discover links
            const discoveredLinks = await this.checkMainPages();
            
            // Check campaign pages
            await this.checkCampaignPages();
            
            // Check sample pages
            await this.checkSamplePages();
            
            // Check some discovered links
            await this.checkDiscoveredLinks(discoveredLinks);
            
            // Check known problematic URLs
            await this.checkKnownProblematicUrls();
            
            // Generate and save report
            const report = this.generateReport();
            fs.writeFileSync('/Users/ludo/code/arcadia/missing_links.md', report);
            
            console.log('\n✅ Analysis Complete!');
            console.log(`📄 Report saved to: missing_links.md`);
            console.log(`🔍 Total URLs checked: ${this.workingLinks.length + this.brokenLinks.length}`);
            console.log(`❌ Broken links found: ${this.brokenLinks.length}`);
            console.log(`✅ Working links found: ${this.workingLinks.length}`);
            
            if (this.brokenLinks.length > 0) {
                console.log('\n🚨 Issues found! Check missing_links.md for details.');
            } else {
                console.log('\n🎉 No broken links found!');
            }
            
        } catch (error) {
            console.error('❌ Analysis failed:', error);
        }
    }
}

// Run the analysis
if (require.main === module) {
    const checker = new LinkChecker();
    checker.runAnalysis().catch(console.error);
}

module.exports = LinkChecker;