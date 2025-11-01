# tldraw Integration Guide for Arcadia Project

## Executive Summary

**tldraw** is a powerful React-based infinite canvas SDK that can be integrated into the Arcadia GitHub Pages site to create interactive visual schemas, relationship diagrams, timelines, and organizational charts for the 15-year superhero RPG universe.

**Key Findings:**
- ✅ **Programmatic schema generation is fully supported**
- ✅ **GitHub Pages deployment is possible** (with build workflow)
- ⚠️ **Requires React build integration with Jekyll**

---

## What is tldraw?

### Core Identity
- **Type**: React library for infinite canvas experiences
- **Repository**: https://github.com/tldraw/tldraw
- **Documentation**: https://tldraw.dev
- **License**: Open source with "Made with tldraw" watermark (removable with business license)

### Key Features
1. **Infinite Canvas**: Unlimited drawing space with pan and zoom
2. **Shape System**: Built-in shapes + custom shape creation
3. **Programmatic API**: Full runtime control via Editor instance
4. **No Backend Required**: LocalStorage by default (perfect for static sites)
5. **React Integration**: Native React component library
6. **Collaborative**: Supports real-time multiplayer (optional)

---

## Can You Generate Schemas Programmatically?

### ✅ YES - Comprehensive API for Schema Generation

#### 1. Editor API - The Core Tool

The Editor instance provides complete programmatic control:

```javascript
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function ArcadiaSchemaGenerator() {
  return (
    <Tldraw
      onMount={(editor) => {
        // Create shapes programmatically when component mounts
        editor.createShapes([
          // Character node
          {
            type: 'geo',
            x: 100,
            y: 100,
            props: {
              geo: 'rectangle',
              w: 200,
              h: 100,
              text: 'Mésmero\n(La Familia)'
            }
          },
          // Relationship arrow
          {
            type: 'arrow',
            x: 0,
            y: 0,
            props: {
              start: { x: 300, y: 150 },
              end: { x: 500, y: 150 }
            }
          }
        ])
      }}
    />
  )
}
```

#### 2. Shape Types Available

**Built-in Shapes:**
- `geo` - Geometric shapes (rectangle, ellipse, triangle, etc.)
- `arrow` - Connectors with multiple styles
- `text` - Text labels
- `note` - Sticky notes
- `frame` - Grouping containers
- `line` - Freehand lines
- `draw` - Freehand drawings

**Custom Shapes:**
You can define entirely custom shape types with:
- Custom rendering logic
- Custom properties (validated with Zod schemas)
- Custom interaction behaviors
- Custom metadata

Example custom shape for Arcadia characters:

```javascript
import { ShapeUtil, TLBaseShape } from 'tldraw'

// Define the shape type
type CharacterShape = TLBaseShape<
  'character',
  {
    name: string
    campaign: 'la-familia' | 'genesis' | 'la-fuerza-oculta' | 'reformatorio'
    player: string
    powers: string[]
  }
>

// Create the shape util
class CharacterShapeUtil extends ShapeUtil<CharacterShape> {
  static override type = 'character' as const

  // Define default props
  getDefaultProps(): CharacterShape['props'] {
    return {
      name: '',
      campaign: 'la-familia',
      player: '',
      powers: []
    }
  }

  // Define how to render the shape
  component(shape: CharacterShape) {
    return (
      <div className="character-node">
        <h3>{shape.props.name}</h3>
        <p>{shape.props.campaign}</p>
        <p>Player: {shape.props.player}</p>
        <ul>
          {shape.props.powers.map(power => (
            <li key={power}>{power}</li>
          ))}
        </ul>
      </div>
    )
  }

  // Other required methods...
}
```

#### 3. Programmatic Schema Generation Capabilities

**For Arcadia Project, you could generate:**

**A. Character Relationship Diagrams**
```javascript
function generateCharacterRelationships(characters, relationships) {
  const shapes = []

  // Create character nodes
  characters.forEach((char, index) => {
    shapes.push({
      type: 'character',
      x: (index % 5) * 250,
      y: Math.floor(index / 5) * 200,
      props: {
        name: char.name,
        campaign: char.campaign,
        player: char.player,
        powers: char.powers
      }
    })
  })

  // Create relationship arrows
  relationships.forEach(rel => {
    shapes.push({
      type: 'arrow',
      props: {
        start: { type: 'binding', boundShapeId: rel.from },
        end: { type: 'binding', boundShapeId: rel.to },
        label: rel.relationship // "mentor", "enemy", "ally", etc.
      }
    })
  })

  return shapes
}

// Use it
editor.createShapes(generateCharacterRelationships(arcadiaCharacters, arcadiaRelationships))
```

**B. Organization Hierarchy**
```javascript
function generateOrganizationChart(org) {
  const shapes = []

  // Recursive function to create hierarchy
  function addLevel(members, parentId, depth, startX) {
    members.forEach((member, index) => {
      const nodeId = `${parentId}-${index}`

      shapes.push({
        id: nodeId,
        type: 'geo',
        x: startX + (index * 200),
        y: depth * 150,
        props: {
          geo: 'rectangle',
          text: `${member.name}\n${member.role}`
        }
      })

      // Connect to parent
      if (parentId) {
        shapes.push({
          type: 'arrow',
          props: {
            start: { type: 'binding', boundShapeId: parentId },
            end: { type: 'binding', boundShapeId: nodeId }
          }
        })
      }

      // Process children
      if (member.subordinates) {
        addLevel(member.subordinates, nodeId, depth + 1, startX)
      }
    })
  }

  addLevel([org], null, 0, 0)
  return shapes
}
```

**C. Timeline Visualization**
```javascript
function generateTimeline(campaigns) {
  const shapes = []
  const startX = 100
  const startY = 300
  const yearWidth = 150

  campaigns.forEach((campaign, index) => {
    const startYear = campaign.startYear - 2010
    const duration = campaign.endYear - campaign.startYear

    shapes.push({
      type: 'geo',
      x: startX + (startYear * yearWidth),
      y: startY + (index * 100),
      props: {
        geo: 'rectangle',
        w: duration * yearWidth,
        h: 80,
        fill: campaign.color,
        text: `${campaign.name}\n${campaign.startYear}-${campaign.endYear}`
      }
    })
  })

  return shapes
}
```

**D. District Map**
```javascript
function generateArcadiaMap(districts) {
  const shapes = []

  districts.forEach(district => {
    shapes.push({
      type: 'geo',
      x: district.coordinates.x,
      y: district.coordinates.y,
      props: {
        geo: district.shape || 'rectangle',
        w: district.size.width,
        h: district.size.height,
        fill: district.color,
        text: `${district.emoji} ${district.name}`
      }
    })
  })

  return shapes
}
```

#### 4. Data Persistence

**Multiple storage options:**

```javascript
// 1. LocalStorage (default)
// Automatically persists user changes

// 2. JSON export/import
const snapshot = editor.store.getSnapshot()
const json = JSON.stringify(snapshot)

// Later, restore:
editor.store.loadSnapshot(JSON.parse(json))

// 3. Custom persistence
editor.store.listen((changes) => {
  // Save changes to your backend/file/localStorage
  saveToCustomStorage(changes)
})
```

---

## How Can Users Edit and Persist Diagrams?

### ✅ YES - Multiple Persistence Strategies Available

One of the most powerful features of tldraw is its flexible persistence system. Users can edit diagrams and save their changes using several different approaches, each suited to different use cases.

### Overview of Persistence Options

| Strategy | Complexity | Backend Required | Sharing | Best For |
|----------|-----------|------------------|---------|----------|
| **Browser LocalStorage** | ⭐ Very Simple | ❌ No | Per-user only | Personal exploration |
| **Download/Upload Files** | ⭐⭐ Simple | ❌ No | Manual sharing | Power users |
| **GitHub API Commits** | ⭐⭐⭐⭐ Complex | ⚠️ OAuth only | Via pull requests | Community collaboration |
| **Real-Time Sync** | ⭐⭐⭐⭐⭐ Very Complex | ✅ Yes (WebSocket) | Real-time multi-user | Active collaboration |

---

### **Option 1: Browser-Only Persistence (Recommended for Arcadia)**

#### How It Works

tldraw automatically persists diagram state to the browser's IndexedDB using the `persistenceKey` prop. Changes are saved locally and persist across page reloads.

#### Implementation

```jsx
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function ArcadiaCharacterMap() {
  return (
    <Tldraw
      persistenceKey="arcadia-character-relationships"
      onMount={(editor) => {
        // Only load initial data if no saved state exists
        const hasExistingData = editor.store.has('shape:some-id')
        if (!hasExistingData) {
          loadInitialArcadiaData(editor)
        }
      }}
    />
  )
}

function loadInitialArcadiaData(editor) {
  // Generate initial diagram from Arcadia data
  const characters = [
    { id: 'mesmero', name: 'Mésmero', campaign: 'La Familia', x: 100, y: 100 },
    { id: 'garra', name: 'Garra', campaign: 'La Familia', x: 300, y: 100 },
    // ... more characters
  ]

  const shapes = characters.map(char => ({
    id: `character-${char.id}`,
    type: 'geo',
    x: char.x,
    y: char.y,
    props: {
      geo: 'rectangle',
      w: 150,
      h: 80,
      text: `${char.name}\n${char.campaign}`
    }
  }))

  editor.createShapes(shapes)
}
```

#### Features

**Automatic Persistence:**
- All user edits saved automatically
- Works across page reloads
- Survives browser restarts
- No manual save button needed

**Cross-Tab Synchronization:**
```jsx
// Multiple tabs with same persistenceKey will sync automatically
<Tldraw persistenceKey="arcadia-shared" />
```

**Storage Details:**
- Uses **IndexedDB** (not localStorage)
- Images/videos stored separately (efficient)
- Handles large diagrams well
- Automatic garbage collection

#### Pros & Cons

✅ **Pros:**
- Zero implementation complexity
- No backend infrastructure
- Instant save/load
- Perfect for GitHub Pages
- No costs

❌ **Cons:**
- Persists per-browser only
- Not shared between users
- Clearing browser data loses changes
- No version history

#### Best Use Case for Arcadia

Perfect for letting users:
- Add personal annotations to character relationships
- Reorganize diagram layouts to their preference
- Create custom views of Arcadia universe
- Experiment without affecting others

---

### **Option 2: Download/Upload JSON Files (Recommended)**

#### How It Works

Users can save diagrams as `.tldr` or `.json` files to their computer and load them back later. This enables manual sharing and version control.

#### Complete Implementation

```jsx
import { Tldraw } from 'tldraw'
import { useRef } from 'react'

export default function ArcadiaSchemaWithFileSupport() {
  const editorRef = useRef(null)

  const handleSave = () => {
    if (!editorRef.current) return

    // Get snapshot of current state
    const snapshot = editorRef.current.store.getSnapshot()

    // Convert to JSON
    const json = JSON.stringify(snapshot, null, 2)

    // Create downloadable file
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    // Trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = `arcadia-relationships-${Date.now()}.tldr`
    a.click()

    // Cleanup
    URL.revokeObjectURL(url)
  }

  const handleLoad = (event) => {
    const file = event.target.files[0]
    if (!file || !editorRef.current) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const snapshot = JSON.parse(e.target.result)
        editorRef.current.store.loadSnapshot(snapshot)
      } catch (error) {
        console.error('Invalid diagram file:', error)
        alert('Could not load diagram file. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (!editorRef.current) return

    if (confirm('Reset to default Arcadia diagram? Your changes will be lost.')) {
      editorRef.current.store.clear()
      loadInitialArcadiaData(editorRef.current)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Toolbar */}
      <div style={{ padding: '10px', background: '#f0f0f0', display: 'flex', gap: '10px' }}>
        <button onClick={handleSave}>
          💾 Download Diagram
        </button>

        <label style={{ cursor: 'pointer' }}>
          📂 Load Saved Diagram
          <input
            type="file"
            accept=".tldr,.json"
            onChange={handleLoad}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={handleReset}>
          🔄 Reset to Default
        </button>
      </div>

      {/* Editor */}
      <div style={{ flex: 1 }}>
        <Tldraw
          persistenceKey="arcadia-relationships"
          onMount={(editor) => {
            editorRef.current = editor
            loadInitialArcadiaData(editor)
          }}
        />
      </div>
    </div>
  )
}
```

#### File Format

The `.tldr` file is just JSON:

```json
{
  "document": {
    "store": {
      "shape:character-mesmero": {
        "id": "shape:character-mesmero",
        "type": "geo",
        "x": 100,
        "y": 100,
        "props": {
          "geo": "rectangle",
          "text": "Mésmero\nLa Familia"
        }
      }
    }
  },
  "session": {
    "currentPageId": "page:page1",
    "camera": {
      "x": 0,
      "y": 0,
      "z": 1
    }
  }
}
```

#### Advanced: Export to Multiple Formats

```jsx
const handleExport = async (format) => {
  const editor = editorRef.current
  if (!editor) return

  switch (format) {
    case 'json':
      // Full JSON snapshot
      const snapshot = editor.store.getSnapshot()
      downloadFile(JSON.stringify(snapshot, null, 2), 'arcadia.tldr', 'application/json')
      break

    case 'svg':
      // Export as SVG image
      const svg = await editor.getSvg(editor.getCurrentPageShapeIds())
      const svgString = new XMLSerializer().serializeToString(svg)
      downloadFile(svgString, 'arcadia-diagram.svg', 'image/svg+xml')
      break

    case 'png':
      // Export as PNG image
      const blob = await editor.getImageForShapes(
        editor.getCurrentPageShapeIds(),
        { format: 'png', scale: 2 }
      )
      const url = URL.createObjectURL(blob)
      downloadFile(url, 'arcadia-diagram.png', 'image/png', true)
      break
  }
}

function downloadFile(content, filename, mimeType, isBlob = false) {
  const url = isBlob ? content : `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  if (isBlob) URL.revokeObjectURL(url)
}
```

#### Pros & Cons

✅ **Pros:**
- Works with GitHub Pages (no backend)
- Users control their versions
- Can share via email, Discord, etc.
- Version control through filenames
- Export to SVG/PNG for documentation

❌ **Cons:**
- Manual file management
- No automatic syncing
- Users must remember to save
- Can't see others' changes automatically

#### Best Use Case for Arcadia

- Power users creating custom relationship maps
- Campaign-specific diagrams
- Personal annotations for different campaigns
- Sharing custom visualizations with friends
- Creating "official" versions to commit to repo

---

### **Option 3: Commit to GitHub Repository (Community Collaboration)**

#### How It Works

Users can propose changes to the "canonical" diagram by creating pull requests directly from the web interface. You review and merge community improvements.

#### Architecture

```
User Browser                    GitHub API                     Your Repo
━━━━━━━━━━━                    ━━━━━━━━━━                     ━━━━━━━━━

1. Edit diagram     ───────►

2. Click "Propose   ───────►  3. Authenticate
   Changes"                      with OAuth

4. Confirm changes  ───────►  5. Create fork      ───────►  Fork created
                                  (if needed)

                              6. Commit JSON      ───────►  New branch
                                  to fork

                              7. Create PR        ───────►  PR opened

8. You review
   and merge        ◄───────  9. Merge PR        ◄───────  Main branch

10. Site rebuilds
    automatically   ◄───────  GitHub Pages
                              redeploys
```

#### Implementation

**Step 1: GitHub OAuth Setup**

```jsx
// components/GitHubAuth.js
import { useState, useEffect } from 'react'

export function useGitHubAuth() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user already authenticated
    const savedToken = localStorage.getItem('github_token')
    if (savedToken) {
      setToken(savedToken)
      fetchUser(savedToken)
    }
  }, [])

  const login = () => {
    // Redirect to GitHub OAuth
    const clientId = 'YOUR_GITHUB_OAUTH_APP_CLIENT_ID'
    const redirectUri = window.location.origin + '/auth/callback'
    const scope = 'public_repo'

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  }

  const fetchUser = async (token) => {
    const response = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `token ${token}` }
    })
    const userData = await fetch.json()
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('github_token')
    setToken(null)
    setUser(null)
  }

  return { token, user, login, logout }
}
```

**Step 2: Save to GitHub Function**

```jsx
// components/ArcadiaSchemaWithGitHub.js
import { Tldraw } from 'tldraw'
import { useGitHubAuth } from './GitHubAuth'

export default function ArcadiaSchemaWithGitHub() {
  const { token, user, login } = useGitHubAuth()
  const editorRef = useRef(null)

  const saveToGitHub = async () => {
    if (!token || !editorRef.current) {
      alert('Please sign in with GitHub first')
      return
    }

    // Get current snapshot
    const snapshot = editorRef.current.store.getSnapshot()
    const content = JSON.stringify(snapshot, null, 2)
    const base64Content = btoa(content)

    // Create unique branch name
    const branchName = `diagram-update-${Date.now()}`
    const fileName = 'data/schemas/character-relationships.json'
    const repoOwner = 'LudoBermejoES'
    const repoName = 'arcadia'

    try {
      // Step 1: Get default branch SHA
      const defaultBranch = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}`,
        { headers: { 'Authorization': `token ${token}` } }
      ).then(r => r.json())

      // Step 2: Create new branch
      await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: defaultBranch.default_branch_sha
          })
        }
      )

      // Step 3: Commit file to new branch
      await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Update character relationship diagram\n\nProposed by ${user.login}`,
            content: base64Content,
            branch: branchName
          })
        }
      )

      // Step 4: Create pull request
      const prResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: 'Update Character Relationship Diagram',
            body: `This PR updates the character relationship diagram based on community edits.\n\n**Proposed by:** @${user.login}\n\n**Changes:**\n- Updated character positions\n- Modified relationships\n- Improved diagram layout`,
            head: branchName,
            base: defaultBranch.default_branch
          })
        }
      ).then(r => r.json())

      alert(`✅ Pull request created! View it at: ${prResponse.html_url}`)

    } catch (error) {
      console.error('Failed to save to GitHub:', error)
      alert('❌ Failed to create pull request. Please try again.')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '10px', background: '#f0f0f0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        {user ? (
          <>
            <span>👤 {user.login}</span>
            <button onClick={saveToGitHub}>
              📤 Propose Changes to Arcadia
            </button>
          </>
        ) : (
          <button onClick={login}>
            🔐 Sign in with GitHub
          </button>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <Tldraw
          onMount={(editor) => {
            editorRef.current = editor
          }}
        />
      </div>
    </div>
  )
}
```

**Step 3: OAuth Callback Handler**

Create a page at `/auth/callback` to handle GitHub OAuth:

```jsx
// pages/auth/callback.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function GitHubCallback() {
  const router = useRouter()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    if (code) {
      // Exchange code for token (requires backend endpoint)
      fetch('/api/github/exchange-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem('github_token', data.access_token)
        router.push('/campaigns/relationships')
      })
    }
  }, [])

  return <div>Authenticating with GitHub...</div>
}
```

#### Workflow for Users

1. **Edit diagram** - Make improvements to relationships/layout
2. **Click "Propose Changes"** - Authenticates if needed
3. **Confirm** - Creates PR automatically
4. **Wait for review** - You get notified
5. **Changes go live** - After you merge PR

#### Pros & Cons

✅ **Pros:**
- Community can contribute improvements
- Git history tracks all changes
- Review process ensures quality
- Changes become "official"
- Collaborative knowledge building

❌ **Cons:**
- Complex implementation
- Requires GitHub OAuth app setup
- Users need GitHub accounts
- Manual review burden on you
- Not immediate (waits for PR merge)

#### Best Use Case for Arcadia

- Community-maintained canonical diagrams
- Crowdsourced relationship discoveries
- Collaborative worldbuilding
- "Official" diagrams that improve over time

---

### **Option 4: Real-Time Collaboration**

#### How It Works

Multiple users see and edit the same diagram simultaneously, like Google Docs. Requires WebSocket backend.

#### Architecture

```
User A Browser          WebSocket Server         User B Browser
━━━━━━━━━━━━━          ━━━━━━━━━━━━━━━━          ━━━━━━━━━━━━━

Edits diagram  ─────►  Broadcasts      ─────►  Sees update
                       to all clients           instantly

               ◄─────  Sends updates   ◄─────  Edits too
                       from B to A
```

#### Implementation with Cloudflare (Recommended by tldraw)

**Step 1: Deploy tldraw-sync Backend**

```bash
# Clone the official template
git clone https://github.com/tldraw/tldraw-sync-cloudflare
cd tldraw-sync-cloudflare

# Install dependencies
npm install

# Deploy to Cloudflare
npm run deploy
```

**Step 2: Connect Frontend**

```jsx
import { Tldraw, useSync } from 'tldraw'

export default function CollaborativeArcadiaSchema() {
  // Connect to your deployed sync server
  const sync = useSync({
    uri: 'wss://arcadia-sync.your-worker.workers.dev',
    roomId: 'character-relationships' // Unique room ID
  })

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {sync.store ? (
        <Tldraw store={sync.store} />
      ) : (
        <div>Connecting to collaboration server...</div>
      )}
    </div>
  )
}
```

#### Alternative: Supabase Real-Time

```jsx
import { createClient } from '@supabase/supabase-js'
import { Tldraw } from 'tldraw'

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY')

export default function SupabaseCollaborativeDiagram() {
  const [store, setStore] = useState(null)

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('arcadia-diagrams')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'diagrams' },
        (payload) => {
          // Update tldraw store with changes
          if (store) {
            store.mergeRemoteChanges(payload.new.data)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [store])

  return <Tldraw onMount={(editor) => setStore(editor.store)} />
}
```

#### Pros & Cons

✅ **Pros:**
- True real-time collaboration
- Multiple simultaneous editors
- Instant updates for all users
- Google Docs-like experience
- Cursor tracking (see others editing)

❌ **Cons:**
- **Requires backend infrastructure**
- NOT compatible with pure GitHub Pages
- Ongoing hosting costs ($5-20/month)
- WebSocket complexity
- Need to handle conflicts
- Requires monitoring/maintenance

#### Best Use Case for Arcadia

- Active campaign planning sessions
- Workshop mode for players
- Real-time worldbuilding
- Collaborative story mapping

**Note:** This breaks the "static site" constraint of GitHub Pages. You'd need separate hosting for the sync server.

---

### **RECOMMENDED HYBRID APPROACH**

#### The Best of Multiple Worlds

Combine **Options 1 & 2** for maximum flexibility with zero backend:

```jsx
import { Tldraw } from 'tldraw'
import { useRef, useState } from 'react'

export default function ArcadiaSchemaComplete() {
  const editorRef = useRef(null)
  const [saveStatus, setSaveStatus] = useState('All changes saved')
  const fileInputRef = useRef(null)

  // Auto-save indicator
  useEffect(() => {
    if (!editorRef.current) return

    const handleChange = () => {
      setSaveStatus('Saving...')
      setTimeout(() => setSaveStatus('All changes saved'), 500)
    }

    editorRef.current.store.listen(handleChange)
  }, [])

  const handleDownload = () => {
    const snapshot = editorRef.current.store.getSnapshot()
    const json = JSON.stringify(snapshot, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `arcadia-relationships-${new Date().toISOString().split('T')[0]}.tldr`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const snapshot = JSON.parse(event.target.result)
        editorRef.current.store.loadSnapshot(snapshot)
        setSaveStatus('Diagram loaded successfully')
      } catch (error) {
        alert('Invalid diagram file')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm('Reset to default Arcadia diagram?')) {
      editorRef.current.store.clear()
      loadInitialArcadiaData(editorRef.current)
      setSaveStatus('Reset to default')
    }
  }

  return (
    <div className="arcadia-schema-container">
      {/* Header with controls */}
      <header className="schema-header">
        <div className="schema-title">
          <h2>🏝️ Arcadia Character Relationships</h2>
          <span className="save-status">{saveStatus}</span>
        </div>

        <div className="schema-controls">
          <button onClick={handleDownload} className="btn-primary">
            💾 Download
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="btn-secondary">
            📂 Load
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".tldr,.json"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />

          <button onClick={handleReset} className="btn-secondary">
            🔄 Reset
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="schema-editor">
        <Tldraw
          persistenceKey="arcadia-character-relationships-v1"
          onMount={(editor) => {
            editorRef.current = editor

            // Load initial data only if no saved state
            const shapes = editor.getCurrentPageShapeIds()
            if (shapes.size === 0) {
              loadInitialArcadiaData(editor)
            }
          }}
        />
      </div>

      {/* Footer with help text */}
      <footer className="schema-footer">
        <p>
          💡 Your changes are <strong>auto-saved to this browser</strong>.
          Click "Download" to save a file you can share or load later.
        </p>
      </footer>
    </div>
  )
}
```

#### Why This Approach Works Best

1. **Casual Users:**
   - Auto-saves to browser ✅
   - No manual save needed ✅
   - Works offline ✅

2. **Power Users:**
   - Can download custom versions ✅
   - Can share files manually ✅
   - Version control via filenames ✅

3. **Zero Backend:**
   - Works perfectly with GitHub Pages ✅
   - No hosting costs ✅
   - No complexity ✅

4. **Flexible:**
   - Reset to default anytime ✅
   - Import community versions ✅
   - Multiple save slots (different filenames) ✅

---

### **Comparison Matrix**

| Feature | Browser Only | Download/Upload | GitHub PR | Real-Time |
|---------|-------------|-----------------|-----------|-----------|
| **No Backend** | ✅ | ✅ | ⚠️ OAuth only | ❌ |
| **Auto-Save** | ✅ | ❌ | ❌ | ✅ |
| **Sharing** | ❌ | Manual files | Pull requests | Automatic |
| **Multi-User** | ❌ | ❌ | Sequential | ✅ Simultaneous |
| **Version Control** | ❌ | File-based | Git history | Database |
| **Complexity** | ⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ | ✅ | ✅ | ❌ |
| **Costs** | $0 | $0 | $0 | $5-20/month |

---

### **Implementation Roadmap**

#### Phase 1: Basic Persistence (1-2 hours)
```jsx
<Tldraw persistenceKey="arcadia-v1" />
```
✅ Auto-save working
✅ Deployed to GitHub Pages

#### Phase 2: File Download/Upload (2-3 hours)
- Add download button
- Add upload handler
- Add reset function
- Polish UI

#### Phase 3: Enhanced UX (2-3 hours)
- Save status indicator
- Multiple diagram slots
- SVG/PNG export
- Help documentation

#### Phase 4: Optional - GitHub Integration (8-12 hours)
- GitHub OAuth setup
- PR creation workflow
- Review interface
- Merge automation

#### Phase 5: Optional - Real-Time (20+ hours)
- Deploy sync backend
- Implement WebSocket connection
- Handle conflicts
- User presence indicators

---

### **Recommended Next Steps for Arcadia**

1. **Start with Hybrid (Options 1 + 2)**
   - Implement browser persistence
   - Add download/upload buttons
   - Deploy to GitHub Pages
   - **Total time:** ~4-6 hours

2. **Evaluate Usage**
   - See if users actually edit diagrams
   - Collect feedback on desired features
   - Decide if GitHub PR or real-time is worth it

3. **Iterate Based on Feedback**
   - If users love it → Add GitHub PR workflow
   - If rarely edited → Keep simple version
   - If active collaboration → Consider real-time

---

## Can tldraw Be Installed on GitHub Pages?

### ✅ YES - But Requires Build Workflow

#### The Challenge: Jekyll + React

**GitHub Pages uses Jekyll** (Ruby-based static site generator)
**tldraw requires React** (JavaScript framework)

These don't naturally work together, BUT there's a proven integration pattern.

#### Integration Architecture

```
┌─────────────────────────────────────────────────────┐
│ Development Environment                             │
│                                                     │
│  ┌──────────────────┐                              │
│  │ React App        │                              │
│  │ with tldraw      │                              │
│  │                  │                              │
│  │ - npm install    │                              │
│  │ - npm run build  │  ──────> Build Process       │
│  └──────────────────┘                              │
│                                                     │
│           │                                         │
│           ▼                                         │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ Static Files Output (dist/)                  │  │
│  │                                              │  │
│  │ - main.xxxxx.js                             │  │
│  │ - main.xxxxx.css                            │  │
│  │ - assets/                                   │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
                    │
                    │ Copy to Jekyll
                    ▼
┌─────────────────────────────────────────────────────┐
│ Jekyll Site (docs/)                                 │
│                                                     │
│  docs/                                              │
│  ├── assets/                                        │
│  │   └── app/                                      │
│  │       └── tldraw-schemas/                       │
│  │           ├── js/                               │
│  │           │   └── main.xxxxx.js  ◄─────────┐   │
│  │           └── css/                          │   │
│  │               └── main.xxxxx.css  ◄─────────┤   │
│  │                                             │   │
│  └── campaigns/                                │   │
│      └── relationships.md                      │   │
│          └── Loads React app via Liquid ───────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
                    │
                    │ GitHub Pages Deploy
                    ▼
┌─────────────────────────────────────────────────────┐
│ Production Site                                     │
│ https://arcadia.ludobermejo.es                      │
│                                                     │
│ User visits /campaigns/relationships/               │
│  ↓                                                  │
│ Jekyll renders page with React div                  │
│  ↓                                                  │
│ Browser loads tldraw JS/CSS                         │
│  ↓                                                  │
│ Interactive diagram renders                         │
└─────────────────────────────────────────────────────┘
```

#### Step-by-Step Integration Process

**STEP 1: Create React App with tldraw**

```bash
# In a separate directory (outside docs/)
npx create-react-app arcadia-tldraw-schemas
cd arcadia-tldraw-schemas

# Install tldraw
npm install tldraw
```

**STEP 2: Create tldraw Component**

```javascript
// src/App.js
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function ArcadiaSchemas() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        onMount={(editor) => {
          // Load Arcadia data and generate schemas
          loadArcadiaSchemas(editor)
        }}
      />
    </div>
  )
}

function loadArcadiaSchemas(editor) {
  // Generate schemas based on Arcadia data
  const characters = [
    { name: 'Mésmero', campaign: 'La Familia', x: 100, y: 100 },
    { name: 'Garra', campaign: 'La Familia', x: 300, y: 100 },
    // ... more characters
  ]

  const shapes = characters.map(char => ({
    type: 'geo',
    x: char.x,
    y: char.y,
    props: {
      geo: 'rectangle',
      w: 150,
      h: 80,
      text: `${char.name}\n${char.campaign}`
    }
  }))

  editor.createShapes(shapes)
}
```

**STEP 3: Build for Production**

```bash
npm run build

# This creates a dist/ folder with:
# - static/js/main.xxxxx.js
# - static/css/main.xxxxx.css
# - index.html (we won't use this)
```

**STEP 4: Copy Built Files to Jekyll**

```bash
# Create directory structure
mkdir -p docs/assets/app/tldraw-schemas/js
mkdir -p docs/assets/app/tldraw-schemas/css

# Copy built files
cp dist/static/js/main.*.js docs/assets/app/tldraw-schemas/js/
cp dist/static/css/main.*.css docs/assets/app/tldraw-schemas/css/

# Note the exact filenames (they have hashes)
```

**STEP 5: Create Jekyll Page with React Integration**

```markdown
---
layout: page
title: "Arcadia Character Relationships"
permalink: /campaigns/relationships/
react_app:
  js: "tldraw-schemas/js/main.db502a90.js"
  css: "tldraw-schemas/css/main.9c5c5444.css"
---

# Character Relationship Diagrams

<div id="root" style="width: 100%; height: 600px;"></div>

{% if page.react_app %}
<link rel="stylesheet" href="{{ page.react_app.css | prepend: '/assets/app/' | prepend: site.baseurl }}">
<script defer src="{{ page.react_app.js | prepend: '/assets/app/' | prepend: site.baseurl }}"></script>
{% endif %}
```

**STEP 6: Update Jekyll Layout (if needed)**

```html
<!-- docs/_layouts/page.html or default.html -->
<!DOCTYPE html>
<html>
<head>
  <!-- ... other head content ... -->

  {% if page.react_app %}
    <link rel="stylesheet" href="{{ page.react_app.css | prepend: '/assets/app/' | prepend: site.baseurl }}">
  {% endif %}
</head>
<body>
  {{ content }}

  {% if page.react_app %}
    <script defer src="{{ page.react_app.js | prepend: '/assets/app/' | prepend: site.baseurl }}"></script>
  {% endif %}
</body>
</html>
```

#### Automated Build Workflow

**Option A: GitHub Actions (Recommended)**

Create `.github/workflows/build-react-apps.yml`:

```yaml
name: Build React Apps

on:
  push:
    paths:
      - 'react-apps/**'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Build tldraw schemas app
        working-directory: react-apps/tldraw-schemas
        run: |
          npm install
          npm run build

      - name: Copy built files to Jekyll
        run: |
          mkdir -p docs/assets/app/tldraw-schemas/js
          mkdir -p docs/assets/app/tldraw-schemas/css
          cp react-apps/tldraw-schemas/build/static/js/*.js docs/assets/app/tldraw-schemas/js/
          cp react-apps/tldraw-schemas/build/static/css/*.css docs/assets/app/tldraw-schemas/css/

      - name: Commit built files
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add docs/assets/app/
          git commit -m "Build React apps [skip ci]" || echo "No changes"
          git push
```

**Option B: Manual Build Script**

Create `scripts/build-react-apps.sh`:

```bash
#!/bin/bash

# Build tldraw schemas
cd react-apps/tldraw-schemas
npm install
npm run build

# Copy to Jekyll
mkdir -p ../../docs/assets/app/tldraw-schemas/js
mkdir -p ../../docs/assets/app/tldraw-schemas/css
cp build/static/js/*.js ../../docs/assets/app/tldraw-schemas/js/
cp build/static/css/*.css ../../docs/assets/app/tldraw-schemas/css/

echo "✅ React apps built and copied to Jekyll"
echo "📝 Don't forget to update the page YAML with new file hashes!"
```

Usage:
```bash
chmod +x scripts/build-react-apps.sh
./scripts/build-react-apps.sh
git add docs/assets/app/
git commit -m "Update React apps"
git push
```

---

## Recommended Project Structure

```
arcadia/
├── docs/                           # Jekyll site (GitHub Pages)
│   ├── assets/
│   │   └── app/                   # React app builds
│   │       └── tldraw-schemas/
│   │           ├── js/
│   │           │   └── main.xxxxx.js
│   │           └── css/
│   │               └── main.xxxxx.css
│   ├── campaigns/
│   │   └── relationships.md       # Page that loads React app
│   └── _layouts/
│       └── page.html              # Layout with React support
│
├── react-apps/                     # React source code (not deployed)
│   └── tldraw-schemas/
│       ├── package.json
│       ├── src/
│       │   ├── App.js             # Main tldraw component
│       │   ├── generators/
│       │   │   ├── characterRelationships.js
│       │   │   ├── organizationChart.js
│       │   │   ├── timeline.js
│       │   │   └── districtMap.js
│       │   └── data/
│       │       ├── characters.json
│       │       ├── organizations.json
│       │       └── campaigns.json
│       └── build/                 # Generated (gitignored)
│
├── scripts/
│   └── build-react-apps.sh        # Build automation
│
└── .github/
    └── workflows/
        └── build-react-apps.yml   # CI/CD automation
```

---

## Potential Use Cases for Arcadia

### 1. Character Relationship Network

**What:** Interactive diagram showing connections between 234+ characters

**Features:**
- Nodes for each character (color-coded by campaign)
- Arrows showing relationships (mentor, ally, enemy, family)
- Clickable nodes to show character details
- Filter by campaign, organization, or relationship type
- Zoom and pan to explore connections

**Data Source:** `/docs/characters/` markdown files

### 2. Organization Hierarchy Charts

**What:** Visual org charts for each major group

**Examples:**
- La Familia internal structure
- Fatum Corporation departments
- MetaCorp divisions
- La Farándula theatrical troupe

**Features:**
- Hierarchical layout
- Role/position labels
- Member portraits
- Expandable/collapsible sections

### 3. Campaign Timeline

**What:** 15-year visual timeline of all campaigns

**Features:**
- Horizontal timeline (2010-2025)
- Concurrent campaign visualization (Genesis overlapping with La Familia)
- Session markers
- Major event annotations
- 9-year hiato period visualization

### 4. District Map of Arcadia

**What:** Interactive map of the 12 districts

**Features:**
- Geographic layout of districts
- Click districts for details
- Notable locations marked
- Territory boundaries
- Character/organization locations

### 5. Session Flow Diagrams

**What:** Narrative structure visualization for campaigns

**Features:**
- Session-by-session progression
- Story arcs as connected nodes
- Major plot points highlighted
- Character appearances tracked

---

## Implementation Recommendations

### Phase 1: Proof of Concept (Recommended First Step)

**Goal:** Validate tldraw works with Arcadia's GitHub Pages setup

**Tasks:**
1. Create minimal React app with tldraw
2. Build and integrate one simple diagram
3. Deploy to GitHub Pages
4. Verify functionality

**Estimated Time:** 2-4 hours

### Phase 2: Character Relationship Generator

**Goal:** Most valuable feature - visualize character connections

**Tasks:**
1. Parse character markdown files to extract relationships
2. Create generator function for character network
3. Implement filtering (by campaign, by organization)
4. Add interactivity (click for details)

**Estimated Time:** 8-12 hours

### Phase 3: Additional Schemas

**Goal:** Expand to other visualization types

**Tasks:**
1. Organization charts
2. Timeline visualization
3. District map
4. Session flow diagrams

**Estimated Time:** 6-8 hours per schema type

### Phase 4: Automation

**Goal:** Streamline workflow

**Tasks:**
1. GitHub Actions for automatic builds
2. Data extraction from markdown files
3. Automatic schema regeneration on content updates

**Estimated Time:** 4-6 hours

---

## Technical Considerations

### Performance

**tldraw is optimized for:**
- ✅ Thousands of shapes
- ✅ Smooth pan/zoom
- ✅ Fast rendering

**For Arcadia:**
- 234 characters → ~234 nodes (very manageable)
- Relationships → ~500-1000 arrows (still performant)
- No performance concerns expected

### Browser Compatibility

**tldraw supports:**
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (with touch support)
- ⚠️ Requires JavaScript enabled

### Accessibility

**Built-in features:**
- Keyboard navigation
- Screen reader support (limited)
- Zoom controls

**Custom improvements needed:**
- Alt text for schema meanings
- Keyboard shortcuts documentation
- High contrast mode option

### Maintenance

**Ongoing requirements:**
- Rebuild React app when tldraw updates
- Update data files when Arcadia content changes
- Regenerate schemas periodically

**Automation opportunities:**
- Auto-extract data from markdown files
- Scheduled regeneration via GitHub Actions
- Version-controlled schema snapshots

---

## Alternative Approaches Considered

### Option A: Pure SVG Generation (Server-Side)

**Pros:**
- No React needed
- Simpler integration
- Static output

**Cons:**
- ❌ No interactivity (pan, zoom, click)
- ❌ Manual layout calculations
- ❌ Limited flexibility

**Verdict:** Less powerful than tldraw

### Option B: D3.js

**Pros:**
- Powerful visualization library
- Good for graphs/networks
- Smaller bundle size

**Cons:**
- ❌ More code to write
- ❌ Less user-friendly editing
- ❌ Steeper learning curve

**Verdict:** Good for read-only visualizations, but tldraw better for editable schemas

### Option C: Mermaid.js (Markdown Diagrams)

**Pros:**
- ✅ Text-based diagram definition
- ✅ Jekyll plugin available
- ✅ No React needed

**Cons:**
- ❌ Limited interactivity
- ❌ Fixed layouts
- ❌ Less visual appeal

**Verdict:** Good for simple diagrams, but tldraw better for complex, interactive schemas

### Option D: Excalidraw

**Pros:**
- Similar to tldraw
- Hand-drawn aesthetic
- React-based

**Cons:**
- Less programmatic API
- More focused on manual drawing
- Harder to automate

**Verdict:** tldraw has better API for schema generation

---

## Decision Matrix

| Feature | tldraw | Pure SVG | D3.js | Mermaid | Excalidraw |
|---------|--------|----------|-------|---------|------------|
| Programmatic generation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| Interactivity | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| GitHub Pages compatibility | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Visual appeal | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Ease of integration | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Maintenance burden | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation:** ⭐ **tldraw is the best choice** for interactive, programmatically-generated schemas with rich interactivity, despite slightly more complex integration.

---

## Resources

### Official Documentation
- Main site: https://tldraw.dev
- GitHub: https://github.com/tldraw/tldraw
- Quick start: https://tldraw.dev/quick-start
- Shapes API: https://tldraw.dev/docs/shapes
- Examples: https://tldraw.dev/examples

### Integration Guides
- React + Jekyll integration: https://mhxue.github.io/blog/2024/react-app/
- Template repo: https://github.com/dellaert/gh-pages-jekyll-react

### Related Issues
- Static build discussion: https://github.com/tldraw/tldraw/issues/2237

---

## Next Steps

If you decide to proceed with tldraw integration:

1. **Validate feasibility** - Create minimal proof of concept
2. **Design schema types** - Decide which visualizations to build first
3. **Extract data** - Parse existing markdown files for character/relationship data
4. **Build generators** - Create programmatic schema generation functions
5. **Integrate with Jekyll** - Set up build workflow and page templates
6. **Deploy and test** - Verify on GitHub Pages
7. **Iterate and expand** - Add more schema types based on success

---

## Conclusion

**tldraw is an excellent fit for the Arcadia project** with the following caveats:

✅ **Pros:**
- Fully supports programmatic schema generation
- Can be deployed on GitHub Pages
- Provides rich, interactive visualizations
- Has a powerful API for complex diagrams
- No backend required (works with static sites)

⚠️ **Considerations:**
- Requires React build step (not native to Jekyll)
- Need to manage build artifacts in git
- Some learning curve for advanced features
- Watermark unless business license purchased

**Overall verdict:** Worth the integration effort for the value it provides in visualizing the complex 15-year Arcadia universe with 234+ characters, multiple organizations, and intricate relationships.

The character relationship network alone would be an incredible addition to the documentation, providing an interactive way to explore connections that pure markdown documentation cannot match.
