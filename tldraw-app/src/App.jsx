import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { useEffect, useState } from 'react'

export default function App() {
  const [snapshot, setSnapshot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Try multiple paths to load the schema
    const paths = [
      // When embedded in Jekyll page
      '/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr',
      // When running dev server
      '/reformatorio-schema.tldr',
      // Absolute GitHub Pages path
      'https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr'
    ]

    async function loadSchema() {
      for (const path of paths) {
        try {
          console.log(`Intentando cargar desde: ${path}`)
          const response = await fetch(path)
          if (response.ok) {
            const data = await response.json()
            console.log('Esquema cargado exitosamente:', data)
            setSnapshot(data)
            setLoading(false)
            return
          }
        } catch (err) {
          console.warn(`No se pudo cargar desde ${path}:`, err)
        }
      }

      // Si ninguna ruta funcionó
      setError('No se pudo cargar el esquema. Por favor, recarga la página.')
      setLoading(false)
    }

    loadSchema()
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ fontSize: '48px' }}>🏝️</div>
        <div style={{ fontSize: '18px', color: '#666' }}>
          Cargando esquema del Reformatorio Nueva Esperanza...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        flexDirection: 'column',
        gap: '20px',
        padding: '40px'
      }}>
        <div style={{ fontSize: '48px' }}>⚠️</div>
        <div style={{ fontSize: '18px', color: '#c00', textAlign: 'center' }}>
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Recargar página
        </button>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        snapshot={snapshot}
        onMount={(editor) => {
          // Centrar la vista en el contenido
          editor.zoomToFit({ animation: { duration: 400 } })
        }}
      />
    </div>
  )
}
