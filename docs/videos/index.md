---
layout: page
title: "Videos de Arcadia"
permalink: /videos/
---

# Videos de Arcadia
## Contenido Audiovisual del RPG

---

## 🎬 **Intro de las Partidas**

Esta introducción se reproduce al comienzo de cada sesión de juego, estableciendo el tono y la atmósfera del universo de Arcadia.

<div class="video-container">
  <iframe width="560" height="315"
          src="https://www.youtube.com/embed/-2aGHBFTfco"
          title="Intro de Arcadia"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
  </iframe>
</div>

---

## 📺 **En Capítulos Anteriores**

Videos resumen que narran los eventos previos y contextualizan las aventuras que han tenido lugar en el universo de Arcadia.

### Capítulo 1
<div class="video-container">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/CyTwIjCoXN0" 
          title="En Capítulos Anteriores - Capítulo 1"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>

### Capítulo 2
<div class="video-container">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/fOF4lkQfM08" 
          title="En Capítulos Anteriores - Capítulo 2"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>

### Capítulo 3
<div class="video-container">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/yRMCkhrvv4M" 
          title="En Capítulos Anteriores - Capítulo 3"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>

### Capítulo 4
<div class="video-container">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/F79B7PaWnMY" 
          title="En Capítulos Anteriores - Capítulo 4"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>

### Capítulo 5
<div class="video-container">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/GbHWPiPKqdQ" 
          title="En Capítulos Anteriores - Capítulo 5"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>

### Capítulo 6
<div class="video-container">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/-gjE0vtH41A" 
          title="En Capítulos Anteriores - Capítulo 6"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>

---

## 📝 **Instrucciones para Agregar Videos**

Para agregar un video de YouTube, reemplaza el contenido del `<div class="video-placeholder">` con:

```html
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        title="Título del Video"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>
```

**Donde:**
- `VIDEO_ID` = El ID del video de YouTube (parte después de `v=` en la URL)
- `Título del Video` = El título descriptivo del contenido

---

[← Volver al inicio]({{ site.baseurl }}/)

<style>
.video-container {
  margin: 2rem 0;
}

.video-placeholder {
  border: 2px dashed #e60026;
  border-radius: 15px;
  padding: 2rem;
  background-color: #f8f9fa;
  text-align: center;
}

.placeholder-content h3 {
  color: #e60026;
  margin-bottom: 1rem;
}

.youtube-placeholder {
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  font-family: monospace;
  font-size: 0.9rem;
}

.video-container iframe {
  width: 100%;
  max-width: 560px;
  height: 315px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .video-container iframe {
    height: 200px;
  }
}
</style>