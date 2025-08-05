---
layout: default
title: "Galería Completa de Arcadia"
permalink: /characters/gallery/
---

# Galería Completa de Arcadia

<div class="gallery-intro">
  <p>Explora el universo completo de Arcadia: <strong>organizaciones</strong> que moldean el mundo y <strong>170 personajes únicos</strong> que lo habitan. Cada entrada representa 15 años de narrativa colaborativa.</p>
</div>

<div class="section-header">
  <h2>🏛️ Organizaciones y Grupos</h2>
  <p>Los equipos, facciones y organizaciones que definen el panorama heroico y villano de Arcadia.</p>
</div>

<div class="gallery-container" id="groups-gallery">
  <!-- Group cards will be dynamically loaded here -->
</div>

<div class="section-header">
  <h2>👥 Personajes Individuales</h2>
  <p>Héroes, villanos, aliados y figuras que han marcado la historia de Arcadia.</p>
</div>

<!-- Protagonistas -->  
<div class="character-section">
  <h3 class="character-category-title">🌟 Protagonistas</h3>
  <div class="gallery-container" id="protagonistas-gallery">
    <!-- Protagonist cards will be dynamically loaded here -->
  </div>
</div>

<!-- Héroes -->
<div class="character-section">
  <h3 class="character-category-title">🦸‍♂️ Héroes</h3>
  <div class="gallery-container" id="heroes-gallery">
    <!-- Hero cards will be dynamically loaded here -->
  </div>
</div>

<!-- Villanos -->
<div class="character-section">
  <h3 class="character-category-title">🦹‍♂️ Villanos</h3>
  <div class="gallery-container" id="villanos-gallery">
    <!-- Villain cards will be dynamically loaded here -->
  </div>
</div>

<!-- MetaCorp -->
<div class="character-section">
  <h3 class="character-category-title">🚔 MetaCorp</h3>
  <div class="gallery-container" id="metacorp-gallery">
    <!-- MetaCorp cards will be dynamically loaded here -->
  </div>
</div>

<!-- Estudiantes -->
<div class="character-section">
  <h3 class="character-category-title">🎓 Estudiantes</h3>
  <div class="gallery-container" id="estudiantes-gallery">
    <!-- Student cards will be dynamically loaded here -->
  </div>
</div>

<!-- Periodistas -->
<div class="character-section">
  <h3 class="character-category-title">📺 Periodistas</h3>
  <div class="gallery-container" id="periodistas-gallery">
    <!-- Journalist cards will be dynamically loaded here -->
  </div>
</div>

<!-- Médicos -->
<div class="character-section">
  <h3 class="character-category-title">⚕️ Médicos</h3>
  <div class="gallery-container" id="medicos-gallery">
    <!-- Medical professional cards will be dynamically loaded here -->
  </div>
</div>

<!-- Políticos -->
<div class="character-section">
  <h3 class="character-category-title">🏛️ Políticos</h3>
  <div class="gallery-container" id="politicos-gallery">
    <!-- Political figure cards will be dynamically loaded here -->
  </div>
</div>

<!-- Militares -->
<div class="character-section">
  <h3 class="character-category-title">⚔️ Militares</h3>
  <div class="gallery-container" id="militares-gallery">
    <!-- Military character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Profesionales -->
<div class="character-section">
  <h3 class="character-category-title">👔 Profesionales</h3>
  <div class="gallery-container" id="profesionales-gallery">
    <!-- Professional character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Históricos -->
<div class="character-section">
  <h3 class="character-category-title">🏛️ Históricos</h3>
  <div class="gallery-container" id="historicos-gallery">
    <!-- Historical figure cards will be dynamically loaded here -->
  </div>
</div>

<!-- Criminales -->
<div class="character-section">
  <h3 class="character-category-title">🔪 Criminales</h3>
  <div class="gallery-container" id="criminales-gallery">
    <!-- Criminal character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Civiles -->
<div class="character-section">
  <h3 class="character-category-title">🏘️ Civiles</h3>
  <div class="gallery-container" id="civiles-gallery">
    <!-- Civilian character cards will be dynamically loaded here -->
  </div>
</div>

<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const groupsGallery = document.getElementById('groups-gallery');
  const charactersGallery = document.getElementById('character-gallery');
  
  // Group data - organizations and teams
  const groups = [
    { slug: 'la-familia', name: 'La Familia', image: 'La familia.png', description: 'Los héroes fundadores originales' },
    { slug: 'la-farandula', name: 'La Farándula', image: 'la-farandula.png', description: 'Villanos teatrales organizados' },
    { slug: 'fatum', name: 'Fatum Corporation', image: 'Fatum.jpeg', description: 'Megacorporación criminal multigeneracional' },
    { slug: 'los-rayos', name: 'Los Rayos', image: 'los_rayos.png', description: 'Fuerza militar de elite' },
    { slug: 'la-caceria-salvaje', name: 'La Cacería Salvaje', image: 'la-caceria-salvaje.png', description: 'Vigilantes bestiales del Barrio Gótico' },
    { slug: 'los-confesores', name: 'Los Confesores', image: 'los-confesores.png', description: 'Fanáticos religiosos antimeta' },
    { slug: 'los-espligan', name: 'Los Espligan', image: 'espligan.png', description: 'Mercenarios especializados parasitarios' },
    { slug: 'puno-gris', name: 'Puño Gris', image: 'puno-gris.png', description: 'Mafia del distrito asiático' },
    { slug: 'ultracorps', name: 'Ultracorps', image: 'ultracorps.png', description: 'División especial de MetaCorp con humanos mejorados' }
  ];
  
  // Character data organized by categories
  const characterCategories = {
    protagonistas: [
      // La Familia
      { slug: 'ana-montenegro-esfinge-atropos', name: 'Ana Montenegro / Esfinge / Atropos', image: 'ana-montenegro-esfinge-atropos.png' },
      { slug: 'astrid-kayface', name: 'Astrid / Kayface', image: 'Astrid_Kayface.png' },
      { slug: 'bate', name: 'Bate', image: 'Bate.png' },
      { slug: 'diana', name: 'Diana', image: 'diana.png' },
      { slug: 'el-faraon', name: 'El Faraón', image: 'El Faraón.png' },
      { slug: 'eslizon-esmeralda', name: 'Eslizón Esmeralda', image: 'Eslizon Esmeralda.png' },
      { slug: 'garra', name: 'Garra', image: 'Garra.png' },
      { slug: 'hotman', name: 'Hotman', image: 'Hotman.png' },
      { slug: 'jorge-espectro', name: 'Jorge / Espectro', image: 'espectro.png' },
      { slug: 'justa-justicia-sentencia', name: 'Justa / Justicia / Sentencia', image: 'Justa_Justicia_Sentencia.png' },
      { slug: 'lumen', name: 'Lúmen', image: 'Lumen.png' },
      { slug: 'mencia-psique-cia', name: 'Mencia / Psique / Cia', image: 'Mencia_Psique_Cia.png' },
      { slug: 'mesmero', name: 'Mésmero', image: 'Mésmero.png' },
      { slug: 'sara10-mecanica', name: 'Sara10 / Mecánica', image: 'Sara10_Mecánica.png' },
      { slug: 'thomas-raza', name: 'Thomas / Raza', image: 'Thomas_Raza.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    heroes: [
      { slug: 'alice-tesla', name: 'Alice Tesla', image: 'Alice_Tesla.png' },
      { slug: 'arcadio', name: 'Arcadio', image: 'Arcadio.png' },
      { slug: 'bailarina', name: 'Bailarina', image: 'Bailarina.png' },
      { slug: 'cerebro', name: 'Cerebro', image: 'cerebro.png' },
      { slug: 'comadreja-negra', name: 'Comadreja Negra', image: 'Comadreja negra.png' },
      { slug: 'eneiros', name: 'Eneiros', image: 'Eneiros.png' },
      { slug: 'estocada', name: 'Estocada', image: 'Estocada.png' },
      { slug: 'gusto', name: 'Gusto', image: 'Gusto.png' },
      { slug: 'la-sombra', name: 'La Sombra', image: 'La Sombra.png' },
      { slug: 'leon-federico', name: 'León Federico', image: 'leon-federico.png' },
      { slug: 'marta-alberti', name: 'Marta Alberti', image: 'marta-alberti.png' },
      { slug: 'neon', name: 'Neón', image: 'Neon.png' },
      { slug: 'oido', name: 'Oído', image: 'Oido.png' },
      { slug: 'olfato', name: 'Olfato', image: 'Olfato.png' },
      { slug: 'raffella-giovanni', name: 'Raffella Giovanni', image: 'raffella-giovanni.png' },
      { slug: 'rayo-igneo', name: 'Rayo Ígneo', image: 'rayo-igneo.png' },
      { slug: 'relampago', name: 'Relámpago', image: 'Relampago.png' },
      { slug: 'roberto-vazquez', name: 'Roberto Vázquez', image: 'roberto-vazquez.png' },
      { slug: 'serpiente', name: 'Serpiente', image: 'Serpiente.png' },
      { slug: 'tacto', name: 'Tacto', image: 'Tacto.png' },
      { slug: 'trueno', name: 'Trueno', image: 'Trueno.png' },
      { slug: 'vista', name: 'Vista', image: 'Vista.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    villanos: [
      { slug: '2d', name: '2D', image: '2d.png' },
      { slug: 'aldonza-lorenzo', name: 'Aldonza Lorenzo', image: 'Aldonza Lorenzo.png' },
      { slug: 'baron-soledad', name: 'Barón Soledad', image: 'baron-soledad.png' },
      { slug: 'bellona', name: 'Bellona', image: 'Bellona.jpg' },
      { slug: 'caos', name: 'Caos', image: 'Caos.png' },
      { slug: 'cloris', name: 'Cloris', image: 'Cloris.jpg' },
      { slug: 'crazy-mary', name: 'Crazy Mary', image: 'crazy-mary.png' },
      { slug: 'cyberpunk', name: 'Cyberpunk', image: 'cyberpunk.png' },
      { slug: 'destino', name: 'Destino', image: 'destino.png' },
      { slug: 'diablo', name: 'Diablo', image: 'diablo.png' },
      { slug: 'ego', name: 'EGO', image: 'ego.png' },
      { slug: 'el-emperador-oscuro', name: 'El Emperador Oscuro', image: 'El Emperador Oscuro.png' },
      { slug: 'el-matador', name: 'El Matador', image: 'Matador.png' },
      { slug: 'el-viejo', name: 'El Viejo', image: 'el-viejo.png' },
      { slug: 'furina', name: 'Furina', image: 'Furina.jpg' },
      { slug: 'janus', name: 'Janus', image: 'Janus.jpg' },
      { slug: 'la-baronesa', name: 'La Baronesa', image: 'La Baronesa.png' },
      { slug: 'la-dama', name: 'La Dama', image: 'la-dama.png' },
      { slug: 'la-emperatriz', name: 'La Emperatriz', image: 'la-emperatriz.png' },
      { slug: 'la-nueva-sombra', name: 'La Nueva Sombra', image: 'la_nueva_sombra.png' },
      { slug: 'lsd', name: 'LSD', image: 'lsd.png' },
      { slug: 'manni', name: 'Manni', image: 'Manni.png' },
      { slug: 'martillo', name: 'Martillo', image: 'martillo.png' },
      { slug: 'maza', name: 'Maza', image: 'Maza.png' },
      { slug: 'mentallo', name: 'Mentallo', image: 'Mentallo.png' },
      { slug: 'merx', name: 'Merx', image: 'Merx.jpg' },
      { slug: 'metalo', name: 'Metalo', image: 'Metalo.png' },
      { slug: 'mulciber', name: 'Mulciber', image: 'Mulcifer.jpg' },
      { slug: 'pandorum', name: 'Pandorum', image: 'Pandorum.png' },
      { slug: 'psicodalia', name: 'Psicodalia', image: 'psicodalia.png' },
      { slug: 'saltamontes', name: 'Saltamontes', image: 'Saltamontes.png' },
      { slug: 'siberia', name: 'Siberia', image: 'siberia.png' },
      { slug: 'telarana', name: 'Telaraña', image: 'telaraña.png' },
      { slug: 'temblores', name: 'Temblores', image: 'Temblores.png' },
      { slug: 'tifon', name: 'Tifón', image: 'tifon.png' },
      { slug: 'voltumna', name: 'Voltumna', image: 'Voltumna.jpg' },
      { slug: 'zambo-mambo', name: 'Zambo y Mambo', image: 'zambo-mambo.png' },
      { slug: 'zanni', name: 'Zanni', image: 'Zanni.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    metacorp: [
      { slug: 'inigo-temblez', name: 'Iñigo Temblez', image: 'Inigo_Temblez.png' },
      { slug: 'mario-igarruti', name: 'Mario Igarruti', image: 'Mario_Igarruti.png' },
      { slug: 'oneill', name: 'Oneill', image: 'Oneill.png' },
      { slug: 'pablo-de-la-serna', name: 'Pablo de la Serna', image: 'Pablo_de_la_Serna.png' },
      { slug: 'roberto-gomez', name: 'Roberto Gómez', image: 'Roberto_Gomez.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    estudiantes: [
      { slug: 'diego-moreau-kim', name: 'Diego Moreau-Kim', image: 'diego-moreau-kim.png' },
      { slug: 'elena-petrov-nielsen', name: 'Elena Petrov-Nielsen', image: 'elena-petrov-nielsen.png' },
      { slug: 'kai-okonkwo-singh', name: 'Kai Okonkwo-Singh', image: 'kai-okonkwo-singh.png' },
      { slug: 'marina-sato-garcia', name: 'Marina Sato-García', image: 'marina-sato-garcia.png' },
      { slug: 'zara-al-mahmoud-silva', name: 'Zara Al-Mahmoud-Silva', image: 'zara-al-mahmoud-silva.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    periodistas: [
      { slug: 'ricky-sataka', name: 'Ricky Sataka', image: 'ricky-sataka.png' },
      { slug: 'trifasico', name: 'Trifásico', image: 'trifasico.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    medicos: [
      { slug: 'doctor-anselmo', name: 'Doctor Anselmo', image: 'doctor-anselmo.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    politicos: [
      { slug: 'alfonso-xiii', name: 'Alfonso XIII', image: 'Alfonso Montenegro.png' },
      { slug: 'fidel-castro', name: 'Fidel Castro', image: 'fidel-castro.png' },
      { slug: 'francois-chala', name: 'François Chalá', image: 'francois-chala.png' },
      { slug: 'francisco-franco', name: 'Francisco Franco', image: 'francisco-franco.png' },
      { slug: 'john-f-kennedy', name: 'John F. Kennedy', image: 'john-f-kennedy.png' },
      { slug: 'jruschov', name: 'Jruschov', image: 'Jruschov.png' },
      { slug: 'leopoldo-gomez', name: 'Leopoldo Gómez', image: 'leopoldo-gomez.png' },
      { slug: 'primo-de-rivera', name: 'Primo de Rivera', image: 'primo-de-rivera.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    militares: [
      { slug: 'general-martinez', name: 'General Martínez', image: 'general-martinez.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    profesionales: [
      { slug: 'charada', name: 'Charada', image: 'Charada.png' },
      { slug: 'federico-lopez', name: 'Federico López', image: 'federico-lopez.png' },
      { slug: 'waldo-gutierrez', name: 'Waldo Gutierrez', image: 'Waldo Gutierrez.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    historicos: [
      { slug: 'alberto-alvarez', name: 'Alberto Álvarez', image: 'alberto-alvarez.png' },
      { slug: 'marius-fernandez', name: 'Marius Fernández', image: 'marius.png' },
      { slug: 'mister-skip', name: 'Mister Skip', image: 'mister-skip.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    criminales: [
      { slug: 'el-senor-de-las-ratas', name: 'El Señor de las Ratas', image: 'el-senor-de-las-ratas.png' },
      { slug: 'malik', name: 'Malik', image: 'Malik.png' },
      { slug: 'yeng', name: 'Yeng', image: 'Yeng.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    civiles: [
      { slug: 'amira-roxana', name: 'Amira Roxana', image: 'amira-roxana.png' },
      { slug: 'autoridad', name: 'Autoridad', image: 'autoridad.png' },
      { slug: 'bastet', name: 'Bastet', image: 'bastet.png' },
      { slug: 'cacharrero', name: 'Cacharrero', image: 'Cacharrero.png' },
      { slug: 'david', name: 'David', image: 'david.png' },
      { slug: 'eduardo-vaquerizo', name: 'Eduardo Vaquerizo', image: 'eduardo-vaquerizo.png' },
      { slug: 'el-golem', name: 'El Golem', image: 'el-golem.png' },
      { slug: 'el-guardian', name: 'El Guardián', image: 'el-guardian.png' },
      { slug: 'el-mago', name: 'El Mago', image: 'El Mago.png' },
      { slug: 'gregor', name: 'Gregor', image: 'gregor.png' },
      { slug: 'hassan-oleg', name: 'Hassan Oleg', image: 'Hassan_Oleg.png' },
      { slug: 'hassir', name: 'Hassir', image: 'hassir.png' },
      { slug: 'hermes', name: 'Hermes', image: 'hermes.png' },
      { slug: 'mateo-shu', name: 'Mateo Shu', image: 'Mateo_Shu.png' },
      { slug: 'nube', name: 'Nube', image: 'Nube.png' },
      { slug: 'panuelo', name: 'Pañuelo', image: 'Pañuelo.png' },
      { slug: 'pastel-de-carne', name: 'Pastel de Carne', image: 'Pastel de carne.png' },
      { slug: 'roberto-mckomick', name: 'Roberto McKomick', image: 'roberto-mckomick.png' },
      { slug: 'rojo', name: 'Rojo', image: 'Rojo.png' },
      { slug: 'sedal', name: 'Sedal', image: 'Sedal.png' },
      { slug: 'senora-pepa', name: 'Señora Pepa', image: 'senora-pepa.png' },
      { slug: 'superglue', name: 'SuperGlue', image: 'Superglue.png' },
      { slug: 'the-rock', name: 'The Rock', image: 'The Rock.png' },
      { slug: 'venus-sibila', name: 'Venus / Sibila', image: 'Venus Sibila.png' }
    ].sort((a, b) => a.name.localeCompare(b.name))
  };

  // Create group cards
  groups.forEach(group => {
    const card = document.createElement('div');
    card.className = 'character-card group-card';
    card.innerHTML = `
      <a href="{{ site.baseurl }}/groups/${group.slug}/" class="character-link">
        <div class="character-image-container">
          <img src="{{ site.baseurl }}/assets/img/characters/${group.image}" 
               alt="${group.name}" 
               class="character-image"
               loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <div class="character-placeholder" style="display: none;">
            <span class="character-initial">${group.name.charAt(0)}</span>
          </div>
        </div>
        <div class="character-info">
          <h3 class="character-name">${group.name}</h3>
          <p class="group-description">${group.description}</p>
        </div>
      </a>
    `;
    groupsGallery.appendChild(card);
  });
  
  // Function to create character cards for a category
  function createCharacterCards(characters, galleryId) {
    const gallery = document.getElementById(galleryId);
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
  }

  // Create character cards for each category
  createCharacterCards(characterCategories.protagonistas, 'protagonistas-gallery');
  createCharacterCards(characterCategories.heroes, 'heroes-gallery');
  createCharacterCards(characterCategories.villanos, 'villanos-gallery');
  createCharacterCards(characterCategories.metacorp, 'metacorp-gallery');
  createCharacterCards(characterCategories.estudiantes, 'estudiantes-gallery');
  createCharacterCards(characterCategories.periodistas, 'periodistas-gallery');
  createCharacterCards(characterCategories.medicos, 'medicos-gallery');
  createCharacterCards(characterCategories.politicos, 'politicos-gallery');
  createCharacterCards(characterCategories.militares, 'militares-gallery');
  createCharacterCards(characterCategories.profesionales, 'profesionales-gallery');
  createCharacterCards(characterCategories.historicos, 'historicos-gallery');
  createCharacterCards(characterCategories.criminales, 'criminales-gallery');
  createCharacterCards(characterCategories.civiles, 'civiles-gallery');

  // Initialize Masonry for all galleries after images load
  function initializeMasonry(galleryId) {
    const gallery = document.getElementById(galleryId);
    if (gallery) {
      imagesLoaded(gallery, function() {
        new Masonry(gallery, {
          itemSelector: '.character-card',
          columnWidth: '.character-card',
          gutter: 20,
          fitWidth: true
        });
      });
    }
  }

  // Initialize Masonry for groups gallery
  imagesLoaded(groupsGallery, function() {
    new Masonry(groupsGallery, {
      itemSelector: '.character-card',
      columnWidth: '.character-card',
      gutter: 20,
      fitWidth: true
    });
  });
  
  // Initialize Masonry for all character category galleries
  initializeMasonry('protagonistas-gallery');
  initializeMasonry('heroes-gallery');
  initializeMasonry('villanos-gallery');
  initializeMasonry('metacorp-gallery');
  initializeMasonry('estudiantes-gallery');
  initializeMasonry('periodistas-gallery');
  initializeMasonry('medicos-gallery');
  initializeMasonry('politicos-gallery');
  initializeMasonry('militares-gallery');
  initializeMasonry('profesionales-gallery');
  initializeMasonry('historicos-gallery');
  initializeMasonry('criminales-gallery');
  initializeMasonry('civiles-gallery');
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

.character-section {
  margin-bottom: 3rem;
}

.character-category-title {
  text-align: center;
  margin: 2rem 0 1rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 8px;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
}

.section-header {
  text-align: center;
  margin: 3rem 0 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  border: 2px solid #e0e8f0;
}

.section-header h2 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: bold;
}

.section-header p {
  margin: 0;
  color: #5a6c7d;
  font-size: 1.1rem;
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

.group-card {
  border: 2px solid #FFD700;
  background: linear-gradient(135deg, #fff9e6 0%, #fff 100%);
}

.group-card:hover {
  border-color: #FFA500;
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.2);
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

.group-description {
  margin: 0.5rem 0 0 0;
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  line-height: 1.3;
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