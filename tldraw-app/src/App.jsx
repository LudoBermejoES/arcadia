import { Tldraw, createShapeId, toRichText } from 'tldraw'
import 'tldraw/tldraw.css'
import { useRef } from 'react'
import { reformatorioData } from './reformatorio-data'

export default function App() {
  const editorRef = useRef(null)

  const createDiagram = (editor) => {
    editorRef.current = editor

    // Create assets for all images first
    const imagesToLoad = []

    if (reformatorioData.director.image) {
      imagesToLoad.push({
        id: 'asset:' + reformatorioData.director.id + '-asset',
        url: reformatorioData.director.image,
        charId: reformatorioData.director.id,
        x: reformatorioData.director.x - 120,
        y: reformatorioData.director.y
      })
    }

    reformatorioData.staff.forEach((char) => {
      if (char.image) {
        imagesToLoad.push({
          id: 'asset:' + char.id + '-asset',
          url: char.image,
          charId: char.id,
          x: char.x - 120,
          y: char.y
        })
      }
    })

    reformatorioData.protagonistas.forEach((char) => {
      if (char.image) {
        imagesToLoad.push({
          id: 'asset:' + char.id + '-asset',
          url: char.image,
          charId: char.id,
          x: char.x - 120,
          y: char.y
        })
      }
    })

    reformatorioData.internos.forEach((char) => {
      if (char.image) {
        imagesToLoad.push({
          id: 'asset:' + char.id + '-asset',
          url: char.image,
          charId: char.id,
          x: char.x - 120,
          y: char.y
        })
      }
    })

    reformatorioData.desaparecidos.forEach((char) => {
      if (char.image) {
        imagesToLoad.push({
          id: 'asset:' + char.id + '-asset',
          url: char.image,
          charId: char.id,
          x: char.x - 120,
          y: char.y
        })
      }
    })

    // Load all images and create assets asynchronously
    Promise.all(
      imagesToLoad.map(async (img) => {
        try {
          const response = await fetch(img.url)
          const blob = await response.blob()
          return {
            ...img,
            blob,
            size: blob.size,
            mimeType: blob.type
          }
        } catch (error) {
          console.error(`Failed to load image: ${img.url}`, error)
          return null
        }
      })
    ).then((loadedImages) => {
      const validImages = loadedImages.filter(Boolean)

      // Create assets in tldraw
      const assets = validImages.map((img) => ({
        id: img.id,
        type: 'image',
        typeName: 'asset',
        props: {
          name: img.charId,
          src: img.url,
          w: 100,
          h: 120,
          mimeType: img.mimeType,
          isAnimated: false
        },
        meta: {}
      }))

      if (assets.length > 0) {
        editor.createAssets(assets)

        // Create image shapes after assets are registered
        validImages.forEach((img) => {
          editor.createShape({
            id: createShapeId(img.charId + '-img'),
            type: 'image',
            x: img.x,
            y: img.y,
            props: {
              assetId: img.id,
              w: 100,
              h: 120
            }
          })
        })
      }
    })

    // Title
    editor.createShape({
      id: createShapeId('title'),
      type: 'note',
      x: 400,
      y: 50,
      props: {
        richText: toRichText('🏝️ REFORMATORIO NUEVA ESPERANZA\nIsla Albedo - Estructura Organizacional'),
        color: 'black',
        size: 'xl'
      }
    })

    // Director - Info
    editor.createShape({
      id: createShapeId(reformatorioData.director.id),
      type: 'note',
      x: reformatorioData.director.x,
      y: reformatorioData.director.y,
      props: {
        richText: toRichText(`👤 ${reformatorioData.director.name}\n${reformatorioData.director.role}\n⚡ ${reformatorioData.director.power}\n${reformatorioData.director.age}`),
        color: reformatorioData.director.color,
        size: 'm'
      }
    })

    // Staff
    reformatorioData.staff.forEach((person) => {
      editor.createShape({
        id: createShapeId(person.id),
        type: 'note',
        x: person.x,
        y: person.y,
        props: {
          richText: toRichText(`${person.name}\n${person.role}${person.note ? '\n' + person.note : ''}`),
          color: person.color,
          size: 's'
        }
      })
    })

    // Protagonistas
    reformatorioData.protagonistas.forEach((char) => {
      // Info note
      editor.createShape({
        id: createShapeId(char.id),
        type: 'note',
        x: char.x,
        y: char.y,
        props: {
          richText: toRichText(`${char.name} (${char.player})\n${char.power}\n${char.details}`),
          color: char.color,
          size: 'm'
        }
      })
    })

    // Internos
    reformatorioData.internos.forEach((char) => {
      editor.createShape({
        id: createShapeId(char.id),
        type: 'note',
        x: char.x,
        y: char.y,
        props: {
          richText: toRichText(`${char.name}\n${char.note}`),
          color: char.color,
          size: 's'
        }
      })
    })

    // Desaparecidos
    reformatorioData.desaparecidos.forEach((char) => {
      editor.createShape({
        id: createShapeId(char.id),
        type: 'note',
        x: char.x,
        y: char.y,
        props: {
          richText: toRichText(`${char.name}\n${char.note}`),
          color: char.color,
          size: 'm'
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
