import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { useRef } from 'react'
import diagramData from '../work/reformatorio-diagram.tldr'

export default function App() {
  const editorRef = useRef(null)

  const loadDiagram = (editor) => {
    editorRef.current = editor

    // Load the saved diagram snapshot
    if (diagramData && diagramData.shapes && diagramData.assets) {
      // Create assets first
      editor.createAssets(diagramData.assets)

      // Then create all shapes
      diagramData.shapes.forEach(shape => {
        editor.createShape(shape)
      })

      // Zoom to fit after loading
      setTimeout(() => {
        editor.zoomToFit({ animation: { duration: 400 } })
      }, 100)
    }
  }

  const handleSaveSnapshot = () => {
    const editor = editorRef.current
    if (editor) {
      // Get all shapes and assets
      const shapes = editor.getCurrentPageShapes()
      const assets = editor.getAssets()
      const snapshot = {
        shapes,
        assets,
        schema: editor.store.schema.serialize()
      }
      const json = JSON.stringify(snapshot, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reformatorio-diagram.tldr'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw onMount={loadDiagram} />
      <button
        onClick={handleSaveSnapshot}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 10000,
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        💾 Save .tldr
      </button>
    </div>
  )
}
