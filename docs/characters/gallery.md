---
layout: default
title: "Galería de Personajes"
permalink: /characters/gallery/
---

# Galería de Personajes de Arcadia

<div class="gallery-intro">
  <p>Explora los <strong>151 personajes únicos</strong> que habitan el universo de Arcadia. Desde héroes legendarios hasta villanos inolvidables, cada personaje representa 15 años de narrativa colaborativa.</p>
</div>

<div class="gallery-container" id="character-gallery">
  <!-- Character cards will be dynamically loaded here -->
</div>

<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('character-gallery');
  
  // Character data - mapping character slugs to their details
  const characters = [
    { slug: '2d', name: '2D', image: '2d.png' },
    { slug: 'alberto-alvarez', name: 'Alberto Álvarez', image: 'alberto-alvarez.png' },
    { slug: 'aldonza-lorenzo', name: 'Aldonza Lorenzo', image: 'Aldonza Lorenzo.png' },
    { slug: 'alfonso-xiii', name: 'Alfonso XIII', image: 'Alfonso Montenegro.png' },
    { slug: 'alice-tesla', name: 'Alice Tesla', image: 'Alice_Tesla.png' },
    { slug: 'ana-montenegro-esfinge-atropos', name: 'Ana Montenegro / Esfinge / Atropos', image: 'ana-montenegro-esfinge-atropos.png' },
    { slug: 'arcadio', name: 'Arcadio', image: 'Arcadio.png' },
    { slug: 'astrid-kayface', name: 'Astrid / Kayface', image: 'Astrid_Kayface.png' },
    { slug: 'autoridad', name: 'Autoridad', image: 'autoridad.png' },
    { slug: 'bailarina', name: 'Bailarina', image: 'Bailarina.png' },
    { slug: 'baron-soledad', name: 'Barón Soledad', image: 'baron-soledad.png' },
    { slug: 'bastet', name: 'Bastet', image: 'bastet.png' },
    { slug: 'bate', name: 'Bate', image: 'Bate.png' },
    { slug: 'bellona', name: 'Bellona', image: 'Bellona.jpg' },
    { slug: 'cacharrero', name: 'Cacharrero', image: 'Cacharrero.png' },
    { slug: 'caos', name: 'Caos', image: 'Caos.png' },
    { slug: 'cerebro', name: 'Cerebro', image: 'cerebro.png' },
    { slug: 'charada', name: 'Charada', image: 'Charada.png' },
    { slug: 'cloris', name: 'Cloris', image: 'Cloris.jpg' },
    { slug: 'comadreja-negra', name: 'Comadreja Negra', image: 'Comadreja negra.png' },
    { slug: 'crazy-mary', name: 'Crazy Mary', image: 'crazy-mary.png' },
    { slug: 'cyberpunk', name: 'Cyberpunk', image: 'cyberpunk.png' },
    { slug: 'david', name: 'David', image: 'david.png' },
    { slug: 'destino', name: 'Destino', image: 'destino.png' },
    { slug: 'diablo', name: 'Diablo', image: 'diablo.png' },
    { slug: 'diana', name: 'Diana', image: 'Diana.png' },
    { slug: 'doctor-anselmo', name: 'Doctor Anselmo', image: 'doctor-anselmo.png' },
    { slug: 'ego', name: 'EGO', image: 'ego.png' },
    { slug: 'el-emperador-oscuro', name: 'El Emperador Oscuro', image: 'El Emperador Oscuro.png' },
    { slug: 'el-faraon', name: 'El Faraón', image: 'El Faraón.png' },
    { slug: 'el-golem', name: 'El Golem', image: 'el-golem.png' },
    { slug: 'el-guardian', name: 'El Guardián', image: 'el-guardian.png' },
    { slug: 'el-mago', name: 'El Mago', image: 'El Mago.png' },
    { slug: 'el-matador', name: 'El Matador', image: 'Matador.png' },
    { slug: 'el-senor-de-las-ratas', name: 'El Señor de las Ratas', image: 'el-senor-de-las-ratas.png' },
    { slug: 'el-viejo', name: 'El Viejo', image: 'el-viejo.png' },
    { slug: 'eneiros', name: 'Eneiros', image: 'Eneiros.png' },
    { slug: 'eslizon-esmeralda', name: 'Eslizón Esmeralda', image: 'Eslizon Esmeralda.png' },
    { slug: 'estocada', name: 'Estocada', image: 'Estocada.png' },
    { slug: 'federico-lopez', name: 'Federico López', image: 'federico-lopez.png' },
    { slug: 'fidel-castro', name: 'Fidel Castro', image: 'Fidel Castro.png' },
    { slug: 'francisco-franco', name: 'Francisco Franco', image: 'Francisco Franco.png' },
    { slug: 'furina', name: 'Furina', image: 'Furina.jpg' },
    { slug: 'garra', name: 'Garra', image: 'Garra.png' },
    { slug: 'general-martinez', name: 'General Martínez', image: 'General Martinez.png' },
    { slug: 'gregor', name: 'Gregor', image: 'gregor.png' },
    { slug: 'gusto', name: 'Gusto', image: 'Gusto.png' },
    { slug: 'hassir', name: 'Hassir', image: 'hassir.png' },
    { slug: 'hermes', name: 'Hermes', image: 'hermes.png' },
    { slug: 'hotman', name: 'Hotman', image: 'Hotman.png' },
    { slug: 'janus', name: 'Janus', image: 'Janus.jpg' },
    { slug: 'john-f-kennedy', name: 'John F. Kennedy', image: 'JFK.png' },
    { slug: 'jorge-espectro', name: 'Jorge / Espectro', image: 'Jorge Espectro.png' },
    { slug: 'jruschov', name: 'Jruschov', image: 'Jruschov.png' },
    { slug: 'justa-justicia-sentencia', name: 'Justa / Justicia / Sentencia', image: 'Justa_Justicia_Sentencia.png' },
    { slug: 'la-baronesa', name: 'La Baronesa', image: 'La Baronesa.png' },
    { slug: 'la-caceria-salvaje', name: 'La Cacería Salvaje', image: 'la-caceria-salvaje.png' },
    { slug: 'la-dama', name: 'La Dama', image: 'la-dama.png' },
    { slug: 'la-emperatriz', name: 'La Emperatriz', image: 'la-emperatriz.png' },
    { slug: 'la-farandula', name: 'La Farándula', image: 'la-farandula.png' },
    { slug: 'la-nueva-sombra', name: 'La Nueva Sombra', image: 'la_nueva_sombra.png' },
    { slug: 'la-sombra', name: 'La Sombra', image: 'La Sombra.png' },
    { slug: 'leon-federico', name: 'León Federico', image: 'leon-federico.png' },
    { slug: 'leopoldo-gomez', name: 'Leopoldo Gómez', image: 'Leopoldo Gomez.png' },
    { slug: 'los-rayos', name: 'Los Rayos', image: 'los_rayos.png' },
    { slug: 'lsd', name: 'LSD', image: 'lsd.png' },
    { slug: 'lumen', name: 'Lúmen', image: 'Lumen.png' },
    { slug: 'marius-fernandez', name: 'Marius Fernández', image: 'marius.png' },
    { slug: 'marta-alberti', name: 'Marta Alberti', image: 'marta-alberti.png' },
    { slug: 'martillo', name: 'Martillo', image: 'martillo.png' },
    { slug: 'maza', name: 'Maza', image: 'Maza.png' },
    { slug: 'mencia-psique-cia', name: 'Mencia / Psique / Cia', image: 'Mencia_Psique_Cia.png' },
    { slug: 'mentallo', name: 'Mentallo', image: 'Mentallo.png' },
    { slug: 'merx', name: 'Merx', image: 'Merx.jpg' },
    { slug: 'mesmero', name: 'Mésmero', image: 'Mésmero.png' },
    { slug: 'metalo', name: 'Metalo', image: 'Metalo.png' },
    { slug: 'mister-skip', name: 'Mister Skip', image: 'mister-skip.png' },
    { slug: 'mulciber', name: 'Mulciber', image: 'Mulcifer.jpg' },
    { slug: 'neon', name: 'Neón', image: 'Neon.png' },
    { slug: 'nube', name: 'Nube', image: 'Nube.png' },
    { slug: 'oido', name: 'Oído', image: 'Oido.png' },
    { slug: 'olfato', name: 'Olfato', image: 'Olfato.png' },
    { slug: 'oneill', name: 'Oneill', image: 'Oneill.png' },
    { slug: 'pandorum', name: 'Pandorum', image: 'Pandorum.png' },
    { slug: 'panuelo', name: 'Pañuelo', image: 'Pañuelo.png' },
    { slug: 'pastel-de-carne', name: 'Pastel de Carne', image: 'Pastel de carne.png' },
    { slug: 'primo-de-rivera', name: 'Primo de Rivera', image: 'Primo de Rivera.png' },
    { slug: 'psicodalia', name: 'Psicodalia', image: 'psicodalia.png' },
    { slug: 'puno-gris', name: 'Puño Gris', image: 'puno-gris.png' },
    { slug: 'raffella-giovanni', name: 'Raffella Giovanni', image: 'raffella-giovanni.png' },
    { slug: 'rayo-igneo', name: 'Rayo Ígneo', image: 'rayo-igneo.png' },
    { slug: 'relampago', name: 'Relámpago', image: 'Relampago.png' },
    { slug: 'roberto-vazquez', name: 'Roberto Vázquez', image: 'roberto-vazquez.png' },
    { slug: 'rojo', name: 'Rojo', image: 'Rojo.png' },
    { slug: 'saltamontes', name: 'Saltamontes', image: 'Saltamontes.png' },
    { slug: 'sara10-mecanica', name: 'Sara10 / Mecánica', image: 'Sara10_Mecánica.png' },
    { slug: 'sedal', name: 'Sedal', image: 'Sedal.png' },
    { slug: 'senora-pepa', name: 'Señora Pepa', image: 'senora-pepa.png' },
    { slug: 'serpiente', name: 'Serpiente', image: 'Serpiente.png' },
    { slug: 'siberia', name: 'Siberia', image: 'siberia.png' },
    { slug: 'superglue', name: 'SuperGlue', image: 'Superglue.png' },
    { slug: 'tacto', name: 'Tacto', image: 'Tacto.png' },
    { slug: 'telarana', name: 'Telaraña', image: 'telarana.png' },
    { slug: 'temblores', name: 'Temblores', image: 'Temblores.png' },
    { slug: 'the-rock', name: 'The Rock', image: 'The Rock.png' },
    { slug: 'thomas-raza', name: 'Thomas / Raza', image: 'Thomas_Raza.png' },
    { slug: 'tifon', name: 'Tifón', image: 'tifon.png' },
    { slug: 'trueno', name: 'Trueno', image: 'Trueno.png' },
    { slug: 'venus-sibila', name: 'Venus / Sibila', image: 'Venus Sibila.png' },
    { slug: 'vista', name: 'Vista', image: 'Vista.png' },
    { slug: 'voltumna', name: 'Voltumna', image: 'Voltumna.jpg' },
    { slug: 'waldo-gutierrez', name: 'Waldo Gutierrez', image: 'Waldo Gutierrez.png' },
    { slug: 'yeng', name: 'Yeng', image: 'Yeng.png' },
    { slug: 'zambo-mambo', name: 'Zambo y Mambo', image: 'zambo-mambo.png' }
  ];

  // Create character cards
  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <a href="{{ site.baseurl }}/characters/details/${character.slug}/" class="character-link">
        <div class="character-image-container">
          <img src="{{ site.baseurl }}/assets/img/characters/${character.image}" 
               alt="${character.name}" 
               class="character-image"
               loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <div class="character-placeholder" style="display: none;">
            <span class="character-initial">${character.name.charAt(0)}</span>
          </div>
        </div>
        <div class="character-info">
          <h3 class="character-name">${character.name}</h3>
        </div>
      </a>
    `;
    gallery.appendChild(card);
  });

  // Initialize Masonry after images load
  imagesLoaded(gallery, function() {
    new Masonry(gallery, {
      itemSelector: '.character-card',
      columnWidth: '.character-card',
      gutter: 20,
      fitWidth: true
    });
  });
});
</script>

<style>
.gallery-intro {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 8px;
}

.gallery-container {
  margin: 0 auto;
  padding: 20px 0;
}

.character-card {
  width: 200px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.character-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.character-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.character-card:hover .character-image {
  transform: scale(1.05);
}

.character-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFD700, #FFA500);
}

.character-initial {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.character-info {
  padding: 15px;
  text-align: center;
}

.character-name {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  font-family: 'Bangers', cursive;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Responsive design */
@media (max-width: 768px) {
  .character-card {
    width: 150px;
  }
  
  .character-image-container {
    height: 150px;
  }
  
  .character-name {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .gallery-container {
    padding: 10px;
  }
  
  .character-card {
    width: 130px;
    margin-bottom: 15px;
  }
  
  .character-image-container {
    height: 130px;
  }
  
  .character-info {
    padding: 10px;
  }
  
  .character-name {
    font-size: 0.8rem;
  }
}

/* Loading animation */
.character-image {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.character-image.loaded {
  opacity: 1;
}
</style>

<script>
// Add loaded class when images load
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.character-image');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
  });
});
</script>