---
layout: default
title: "URL Test Page"
---

# URL Test Page

This page tests that Jekyll is generating correct URLs.

## Site Configuration:
- **Site URL**: {{ site.url }}
- **Base URL**: {{ site.baseurl }}
- **Full Site URL**: {{ site.url }}{{ site.baseurl }}

## Generated URLs:
- **Home**: {{ "/" | relative_url }}
- **Campaigns**: {{ "/campaigns/" | relative_url }}
- **La Familia**: {{ "/campaigns/la-familia/" | relative_url }}

## Asset URLs:
- **CSS**: {{ "/assets/css/styles.css" | relative_url }}
- **JS**: {{ "/assets/js/comicbook.js" | relative_url }}

## GitHub Info:
- **Repository**: {{ site.github.repository_url }}
- **GitHub Username**: {{ site.github_username }}

---
Generated at: {{ site.time }}