import { Tldraw, createShapeId } from 'tldraw'
import 'tldraw/tldraw.css'
import { useRef } from 'react'
import { reformatorioData } from './reformatorio-data'

export default function App() {
  const editorRef = useRef(null)

  const createDiagram = (editor) => {
    editorRef.current = editor

    // Title
    editor.createShape({
      id: createShapeId('title'),
      type: 'text',
      x: 400,
      y: 50,
      props: {
        text: '🏝️ REFORMATORIO NUEVA ESPERANZA\nIsla Albedo - Estructura Organizacional',
        size: 'xl',
        w: 800,
        textAlign: 'middle'
      }
    })

    // Director
    editor.createShape({
      id: createShapeId(reformatorioData.director.id),
      type: 'geo',
      x: reformatorioData.director.x,
      y: reformatorioData.director.y,
      props: {
        geo: 'rectangle',
        w: 300,
        h: 120,
        color: reformatorioData.director.color,
        fill: 'solid',
        text: `👤 ${reformatorioData.director.name}\n${reformatorioData.director.role}\n⚡ ${reformatorioData.director.power}\n${reformatorioData.director.age}`
      }
    })

    // Staff
    reformatorioData.staff.forEach((person, i) => {
      editor.createShape({
        id: createShapeId(person.id),
        type: 'geo',
        x: person.x,
        y: person.y,
        props: {
          geo: 'rectangle',
          w: 250,
          h: person.note ? 100 : 80,
          color: person.color,
          fill: 'semi',
          text: `${person.name}\n${person.role}${person.note ? '\n' + person.note : ''}`
        }
      })
    })

    // Protagonistas
    reformatorioData.protagonistas.forEach((char) => {
      editor.createShape({
        id: createShapeId(char.id),
        type: 'geo',
        x: char.x,
        y: char.y,
        props: {
          geo: 'rectangle',
          w: 280,
          h: 140,
          color: char.color,
          fill: 'solid',
          text: `${char.name} (${char.player})\n${char.power}\n${char.details}`
        }
      })
    })

    // Internos
    reformatorioData.internos.forEach((char) => {
      editor.createShape({
        id: createShapeId(char.id),
        type: 'geo',
        x: char.x,
        y: char.y,
        props: {
          geo: 'rectangle',
          w: 220,
          h: char.id === 'lea' || char.id === 'jein' ? 120 : 80,
          color: char.color,
          fill: 'semi',
          text: `${char.name}\n${char.note}`
        }
      })
    })

    // Desaparecidos
    reformatorioData.desaparecidos.forEach((char) => {
      editor.createShape({
        id: createShapeId(char.id),
        type: 'geo',
        x: char.x,
        y: char.y,
        props: {
          geo: 'rectangle',
          w: 250,
          h: 120,
          color: char.color,
          fill: 'pattern',
          dash: 'dashed',
          text: `${char.name}\n${char.note}`
        }
      })
    })

    // Arrows/Relationships
    reformatorioData.relationships.forEach((rel, i) => {
      editor.createShape({
        id: createShapeId(`arrow-${i}`),
        type: 'arrow',
        props: {
          start: { type: 'binding', boundShapeId: createShapeId(rel.from) },
          end: { type: 'binding', boundShapeId: createShapeId(rel.to) },
          color: rel.color,
          dash: rel.dashed ? 'dotted' : 'draw',
          arrowheadEnd: rel.bidirectional ? 'dot' : 'arrow',
          text: rel.label
        }
      })
    })

    // Zoom to fit after a short delay
    setTimeout(() => {
      editor.zoomToFit({ animation: { duration: 400 } })
    }, 100)
  }

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw onMount={createDiagram} />
    </div>
  )
}
