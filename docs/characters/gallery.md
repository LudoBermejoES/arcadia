---
layout: default
title: "Galería Completa de Arcadia"
permalink: /characters/gallery/
---

# Galería Completa de Arcadia

<div class="gallery-intro">
  <p>Explora el universo completo de Arcadia: <strong>organizaciones</strong> que moldean el mundo y <strong>214 personajes únicos</strong> que lo habitan. Cada entrada representa 15 años de narrativa colaborativa.</p>
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

<!-- Artistas -->
<div class="character-section">
  <h3 class="character-category-title">🎨 Artistas</h3>
  <div class="gallery-container" id="artistas-gallery">
    <!-- Artist cards will be dynamically loaded here -->
  </div>
</div>

<!-- Civiles -->
<div class="character-section">
  <h3 class="character-category-title">🏘️ Civiles</h3>
  <div class="gallery-container" id="civiles-gallery">
    <!-- Civilian character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Entidades -->
<div class="character-section">
  <h3 class="character-category-title">🔮 Entidades</h3>
  <div class="gallery-container" id="entidades-gallery">
    <!-- Entity character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Estudiantes -->
<div class="character-section">
  <h3 class="character-category-title">🎓 Estudiantes</h3>
  <div class="gallery-container" id="estudiantes-gallery">
    <!-- Student cards will be dynamically loaded here -->
  </div>
</div>

<!-- Héroes -->
<div class="character-section">
  <h3 class="character-category-title">🦸‍♂️ Héroes</h3>
  <div class="gallery-container" id="heroes-gallery">
    <!-- Hero cards will be dynamically loaded here -->
  </div>
</div>

<!-- Históricos -->
<div class="character-section">
  <h3 class="character-category-title">🏛️ Históricos</h3>
  <div class="gallery-container" id="historicos-gallery">
    <!-- Historical figure cards will be dynamically loaded here -->
  </div>
</div>

<!-- Independientes -->
<div class="character-section">
  <h3 class="character-category-title">⚡ Independientes</h3>
  <div class="gallery-container" id="independientes-gallery">
    <!-- Independent character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Modelos -->
<div class="character-section">
  <h3 class="character-category-title">📸 Modelos</h3>
  <div class="gallery-container" id="modelos-gallery">
    <!-- Model cards will be dynamically loaded here -->
  </div>
</div>

<!-- Médicos -->
<div class="character-section">
  <h3 class="character-category-title">⚕️ Médicos</h3>
  <div class="gallery-container" id="medicos-gallery">
    <!-- Medical professional cards will be dynamically loaded here -->
  </div>
</div>

<!-- MetaCorp -->
<div class="character-section">
  <h3 class="character-category-title">🚔 MetaCorp</h3>
  <div class="gallery-container" id="metacorp-gallery">
    <!-- MetaCorp cards will be dynamically loaded here -->
  </div>
</div>

<!-- Militares -->
<div class="character-section">
  <h3 class="character-category-title">⚔️ Militares</h3>
  <div class="gallery-container" id="militares-gallery">
    <!-- Military character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Participantes de Héroes o Villanos -->
<div class="character-section">
  <h3 class="character-category-title">📺 Participantes de Héroes o Villanos</h3>
  <div class="gallery-container" id="participantes-hevi-gallery">
    <!-- Héroes o Villanos contest participant cards will be dynamically loaded here -->
  </div>
</div>

<!-- Periodistas -->
<div class="character-section">
  <h3 class="character-category-title">📺 Periodistas</h3>
  <div class="gallery-container" id="periodistas-gallery">
    <!-- Journalist cards will be dynamically loaded here -->
  </div>
</div>

<!-- Políticos -->
<div class="character-section">
  <h3 class="character-category-title">🏛️ Políticos</h3>
  <div class="gallery-container" id="politicos-gallery">
    <!-- Political figure cards will be dynamically loaded here -->
  </div>
</div>

<!-- Profesionales -->
<div class="character-section">
  <h3 class="character-category-title">👔 Profesionales</h3>
  <div class="gallery-container" id="profesionales-gallery">
    <!-- Professional character cards will be dynamically loaded here -->
  </div>
</div>

<!-- Villanos -->
<div class="character-section">
  <h3 class="character-category-title">🦹‍♂️ Villanos</h3>
  <div class="gallery-container" id="villanos-gallery">
    <!-- Villain cards will be dynamically loaded here -->
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
    
    participantesHeVi: [
      // Grupo Alfa - Los Favoritos del Público
      { slug: 'cerebro', name: 'Cerebro', image: 'cerebro.png' },
      { slug: 'leon-federico', name: 'León Federico', image: 'leon-federico.png' },
      { slug: 'marta-alberti', name: 'Marta Alberti', image: 'marta-alberti.png' },
      { slug: 'raffella-giovanni', name: 'Raffella Giovanni', image: 'raffella-giovanni.png' },
      { slug: 'roberto-vazquez', name: 'Roberto Vázquez', image: 'roberto-vazquez.png' },
      // Grupo Gamma - Los Criminales Rehabilitados  
      { slug: '2d', name: '2D', image: '2d.png' },
      { slug: 'cyberpunk', name: 'Cyberpunk', image: 'cyberpunk.png' },
      { slug: 'martillo', name: 'Martillo', image: 'martillo.png' },
      { slug: 'siberia', name: 'Siberia', image: 'siberia.png' },
      // Grupo Delta - Los Dormilones
      { slug: 'la-nueva-sombra', name: 'La Nueva Sombra', image: 'la_nueva_sombra.png' },
      { slug: 'temblores', name: 'Temblores', image: 'Temblores.png' },
      { slug: 'tifon', name: 'Tifón', image: 'tifon.png' },
      { slug: 'zambo-mambo', name: 'Zambo y Mambo', image: 'zambo-mambo.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    heroes: [
      { slug: 'alice-tesla', name: 'Alice Tesla', image: 'Alice_Tesla.png' },
      { slug: 'alondra', name: 'Alondra', image: 'alondra.png' },
      { slug: 'anarquista', name: 'Anarquista', image: 'anarquista.png' },
      { slug: 'arcadio', name: 'Arcadio', image: 'Arcadio.png' },
      { slug: 'austros', name: 'Austros', image: 'austros.png' },
      { slug: 'autoridad', name: 'Autoridad', image: 'autoridad.png' },
      { slug: 'bailarina', name: 'Bailarina', image: 'Bailarina.png' },
      { slug: 'boreas', name: 'Bóreas', image: 'boreas.png' },
      { slug: 'cefiro', name: 'Céfiro', image: 'cefiro.png' },
      { slug: 'david', name: 'David', image: 'david.png' },
      { slug: 'esperanza-nambasi', name: 'Esperanza Nambasi', image: 'esperanza-nambasi.png' },
      { slug: 'el-golem', name: 'El Golem', image: 'el-golem.png' },
      { slug: 'el-guardian', name: 'El Guardián', image: 'el-guardian.png' },
      { slug: 'el-mago', name: 'El Mago', image: 'El Mago.png' },
      { slug: 'eneiros', name: 'Eneiros', image: 'Eneiros.png' },
      { slug: 'estocada', name: 'Estocada', image: 'Estocada.png' },
      { slug: 'euro', name: 'Euro', image: 'euro.png' },
      { slug: 'gusto', name: 'Gusto', image: 'Gusto.png' },
      { slug: 'la-sombra', name: 'La Sombra', image: 'La Sombra.png' },
      { slug: 'lucifer-hero', name: 'Lucifer', image: 'Lucifer.png' },
      { slug: 'neon', name: 'Neón', image: 'Neon.png' },
      { slug: 'nube', name: 'Nube', image: 'Nube.png' },
      { slug: 'oido', name: 'Oído', image: 'Oido.png' },
      { slug: 'olfato', name: 'Olfato', image: 'Olfato.png' },
      { slug: 'rayo-igneo', name: 'Rayo Ígneo', image: 'rayo-igneo.png' },
      { slug: 'relampago', name: 'Relámpago', image: 'Relampago.png' },
      { slug: 'serpiente', name: 'Serpiente', image: 'Serpiente.png' },
      { slug: 'tacto', name: 'Tacto', image: 'Tacto.png' },
      { slug: 'trueno', name: 'Trueno', image: 'Trueno.png' },
      { slug: 'venus-sibila', name: 'Venus / Sibila', image: 'Venus Sibila.png' },
      { slug: 'vista', name: 'Vista', image: 'Vista.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    villanos: [
  { slug: 'abismo', name: 'Abismo', image: 'abismo.png' },
      { slug: 'aldonza-lorenzo', name: 'Aldonza Lorenzo', image: 'Aldonza Lorenzo.png' },
      { slug: 'baronesa-de-jade', name: 'Baronesa de Jade', image: 'baronesa-de-jade.png' },
      { slug: 'baron-soledad', name: 'Barón Soledad', image: 'baron-soledad.png' },
      { slug: 'bellona', name: 'Bellona', image: 'Bellona.jpg' },
      { slug: 'caos', name: 'Caos', image: 'Caos.png' },
      { slug: 'comadreja-negra', name: 'Comadreja Negra', image: 'Comadreja negra.png' },
      { slug: 'cloris', name: 'Cloris', image: 'Cloris.jpg' },
      { slug: 'crazy-mary', name: 'Crazy Mary', image: 'crazy-mary.png' },
      { slug: 'destino', name: 'Destino', image: 'destino.png' },
      { slug: 'diablo', name: 'Diablo', image: 'diablo.png' },
      { slug: 'ego', name: 'EGO', image: 'ego.png' },
      { slug: 'el-emperador-oscuro', name: 'El Emperador Oscuro', image: 'El Emperador Oscuro.png' },
      { slug: 'el-matador', name: 'El Matador', image: 'Matador.png' },
      { slug: 'el-viejo', name: 'El Viejo', image: 'el-viejo.png' },
      { slug: 'furina', name: 'Furina', image: 'Furina.jpg' },
      { slug: 'garfios', name: 'Garfios', image: 'garfios.png' },
      { slug: 'hermes', name: 'Hermes', image: 'hermes.png' },
      { slug: 'infalible', name: 'Infalible', image: 'infalible.png' },
      { slug: 'janus', name: 'Janus', image: 'Janus.jpg' },
      { slug: 'la-baronesa', name: 'La Baronesa', image: 'La Baronesa.png' },
      { slug: 'la-comadreja', name: 'La Comadreja', image: 'la-comadreja.png' },
      { slug: 'la-dama', name: 'La Dama', image: 'la-dama.png' },
      { slug: 'la-desconocida', name: 'La Desconocida', image: 'la-desconocida.png' },
      { slug: 'la-emperatriz', name: 'La Emperatriz', image: 'la-emperatriz.png' },
      { slug: 'la-reina-cobra', name: 'La Reina Cobra', image: 'la-reina-cobra.png' },
      { slug: 'lsd', name: 'LSD', image: 'lsd.png' },
      { slug: 'manni', name: 'Manni', image: 'Manni.png' },
      { slug: 'maza', name: 'Maza', image: 'Maza.png' },
      { slug: 'mentallo', name: 'Mentallo', image: 'Mentallo.png' },
      { slug: 'merx', name: 'Merx', image: 'Merx.jpg' },
      { slug: 'metalo', name: 'Metalo', image: 'Metalo.png' },
      { slug: 'mister-skip', name: 'Mister Skip', image: 'mister-skip.png' },
      { slug: 'mulciber', name: 'Mulciber', image: 'Mulcifer.jpg' },
      { slug: 'pandorum', name: 'Pandorum', image: 'Pandorum.png' },
      { slug: 'panuelo', name: 'Pañuelo', image: 'Pañuelo.png' },
      { slug: 'parda', name: 'Parda', image: 'parda.png' },
      { slug: 'pastel-de-carne', name: 'Pastel de Carne', image: 'Pastel de carne.png' },
      { slug: 'psicodalia', name: 'Psicodalia', image: 'psicodalia.png' },
      { slug: 'rojo', name: 'Rojo', image: 'Rojo.png' },
      { slug: 'saltamontes', name: 'Saltamontes', image: 'Saltamontes.png' },
      { slug: 'sedal', name: 'Sedal', image: 'Sedal.png' },
      { slug: 'superglue', name: 'SuperGlue', image: 'Superglue.png' },
      { slug: 'telarana', name: 'Telaraña', image: 'telaraña.png' },
      { slug: 'voltumna', name: 'Voltumna', image: 'Voltumna.jpg' },
      { slug: 'zanni', name: 'Zanni', image: 'Zanni.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    metacorp: [
      { slug: 'francisco-egin', name: 'Francis Egin', image: 'francisco-egin.png' },
      { slug: 'inigo-temblez', name: 'Iñigo Temblez', image: 'Inigo_Temblez.png' },
      { slug: 'mario-igarruti', name: 'Mario Igarruti', image: 'Mario_Igarruti.png' },
      { slug: 'oneill', name: 'Oneill', image: 'Oneill.png' },
      { slug: 'pablo-de-la-serna', name: 'Pablo de la Serna', image: 'Pablo_de_la_Serna.png' },
      { slug: 'roberto-gomez', name: 'Roberto Gómez', image: 'Roberto_Gomez.png' },
      { slug: 'waldo-gutierrez', name: 'Waldo Gutierrez', image: 'Waldo Gutierrez.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    estudiantes: [
      { slug: 'diego-moreau-kim', name: 'Diego Moreau-Kim', image: 'diego-moreau-kim.png' },
      { slug: 'elena-petrov-nielsen', name: 'Elena Petrov-Nielsen', image: 'elena-petrov-nielsen.png' },
      { slug: 'francisco-moreau', name: 'Francisco Moreau', image: 'francisco-moureu.png' },
      { slug: 'kai-okonkwo-singh', name: 'Kai Okonkwo-Singh', image: 'kai-okonkwo-singh.png' },
      { slug: 'marina-sato-garcia', name: 'Marina Sato-García', image: 'marina-sato-garcia.png' },
      { slug: 'zara-al-mahmoud-silva', name: 'Zara Al-Mahmoud-Silva', image: 'zara-al-mahmoud-silva.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    periodistas: [
      { slug: 'magdalena', name: 'Magdalena Agapé', image: 'Magdalena.png' },
      { slug: 'nicolas-cifuentes', name: 'Nicolás Cifuentes', image: 'nicolas-cifuentes.png' },
      { slug: 'ricky-sataka', name: 'Ricky Sataka', image: 'ricky-sataka.png' },
      { slug: 'trifasico', name: 'Trifásico', image: 'trifasico.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    artistas: [
      { slug: 'alonso-dossantos', name: 'Alonso Dossantos', image: 'alonso-dossantos.png' },
      { slug: 'chen-wei-romano', name: 'Chen Wei-Romano', image: 'chen-wei-romano.png' },
      { slug: 'david-park-kowalski', name: 'David Park-Kowalski', image: 'david-park-kowalski.png' },
      { slug: 'elena-volkov-mendez', name: 'Elena Volkov-Mendez', image: 'elena-volkov-mendez.png' },
      { slug: 'fatima-al-rashid', name: 'Fatima Al-Rashid', image: 'fatima-al-rashid.png' },
      { slug: 'jane-irinar', name: 'Jane Irinar', image: 'jane-irinar.png' },
      { slug: 'joaquin-navarro-okafor', name: 'Joaquín Navarro-Okafor', image: 'joaquin-navarro-okafor.png' },
      { slug: 'mikhail-petrosyan', name: 'Mikhail Petrosyan', image: 'mikhail-petrosyan.png' },
      { slug: 'ramon-beguell', name: 'Ramón Beguell', image: 'Ramon_Beguell.png' },
      { slug: 'granito', name: 'Granito', image: 'Granito.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),

    modelos: [
      { slug: 'aleksandr-romanov-idris', name: 'Aleksandr "Sasha" Romanov-Idris', image: 'aleksandr-romanov-idris.png' },
      { slug: 'amara-okonkwo-garcia', name: 'Amara Okonkwo-García', image: 'amara-okonkwo-garcia.png' },
      { slug: 'arjun-patel-kosov', name: 'Arjun Patel-Kosov', image: 'arjun-patel-kosov.png' },
      { slug: 'diego-markovic-santana', name: 'Diego Marković-Santana', image: 'diego-markovic-santana.png' },
      { slug: 'katarina-vukovic-reyes', name: 'Katarina Vuković-Reyes', image: 'katarina-vukovic-reyes.png' },
      { slug: 'leila-habibi-park', name: 'Leila Habibi-Park', image: 'leila-habibi-park.png' },
      { slug: 'malik-hassan-petrov', name: 'Malik Hassan-Petrov', image: 'malik-hassan-petrov.png' },
      { slug: 'nadiya-kovalenko-nguyen', name: 'Nadiya Kovalenko-Nguyen', image: 'nadiya-kovalenko-nguyen.png' },
      { slug: 'takeshi-yamamoto-delgado', name: 'Takeshi Yamamoto-Delgado', image: 'takeshi-yamamoto-delgado.png' },
      { slug: 'yasmin-al-cortes', name: 'Yasmin Al-Cortés', image: 'yasmin-al-cortes.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    medicos: [
      { slug: 'doctor-anselmo', name: 'Doctor Anselmo', image: 'doctor-anselmo.png' },
      { slug: 'felipe-alvarez', name: 'Felipe Álvarez', image: 'felipe-alvarez.png' },
      { slug: 'lorena-sanchez', name: 'Lorena Sanchez', image: 'lorena-sanchez.png' },
      { slug: 'luis-montenegro', name: 'Luis Montenegro', image: 'Luis Montenegro.png' },
      { slug: 'mia-tanaka', name: 'Mia Tanaka', image: 'mia-tanaka.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    politicos: [
      { slug: 'francois-chala', name: 'François Chalá', image: 'francois-chala.png' },
      { slug: 'leopoldo-gomez', name: 'Leopoldo Gómez', image: 'leopoldo-gomez.png' },
      { slug: 'ricardo-abeluengo', name: 'Ricardo Abeluengo', image: 'Ricardo_Abeluengo.png' },
      { slug: 'sofia-nakamura', name: 'Sofía Nakamura', image: 'sofia-nakamura.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    militares: [
      { slug: 'general-martinez', name: 'General Martínez', image: 'general-martinez.png' },
      { slug: 'ignacio-rodriguez', name: 'Ignacio Rodríguez', image: 'ignacio-rodriguez.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    profesionales: [
      { slug: 'amira-roxana', name: 'Amira Roxana', image: 'amira-roxana.png' },
      { slug: 'cacharrero', name: 'Cacharrero', image: 'Cacharrero.png' },
      { slug: 'charada', name: 'Charada', image: 'Charada.png' },
      { slug: 'federico-lopez', name: 'Federico López', image: 'federico-lopez.png' },
      { slug: 'lambert', name: 'Lambert', image: 'lambert.png' },
      { slug: 'mateo-shu', name: 'Mateo Shu', image: 'Mateo_Shu.png' },
      { slug: 'sr-thomas', name: 'Sr. Thomas', image: 'Thomas_lawyer.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    historicos: [
      { slug: 'alberto-alvarez', name: 'Alberto Álvarez', image: 'alberto-alvarez.png' },
      { slug: 'alfonso-xiii', name: 'Alfonso XIII', image: 'alfonso-xiii.png' },
      { slug: 'antonio-calvero', name: 'Antonio Calvero', image: 'antonio-calvero.png' },
      { slug: 'fidel-castro', name: 'Fidel Castro', image: 'fidel-castro.png' },
      { slug: 'francisco-franco', name: 'Francisco Franco', image: 'francisco-franco.png' },
      { slug: 'john-f-kennedy', name: 'John F. Kennedy', image: 'john-f-kennedy.png' },
      { slug: 'jruschov', name: 'Jruschov', image: 'Jruschov.png' },
      { slug: 'juan-guzman', name: 'Juan Guzmán', image: 'juan-guzman.png' },
      { slug: 'marius-fernandez', name: 'Marius Fernández', image: 'marius.png' },
      { slug: 'primo-de-rivera', name: 'Primo de Rivera', image: 'primo-de-rivera.png' },
      { slug: 'rey-ofobutu', name: 'Rey Ofobutu', image: 'rey-ofobutu.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    independientes: [
      { slug: 'alfred', name: 'Alfred', image: 'alfred.png' },
      { slug: 'el-senor-de-las-ratas', name: 'El Señor de las Ratas', image: 'el-senor-de-las-ratas.png' },
      { slug: 'malik', name: 'Malik', image: 'Malik.png' },
      { slug: 'roberto-mckomick', name: 'Roberto McKomick', image: 'roberto-mckomick.png' },
      { slug: 'yeng', name: 'Yeng', image: 'Yeng.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    civiles: [
      { slug: 'amara-quebe', name: 'Amara Quebé', image: 'amara-quebe.png' },
      { slug: 'anianca', name: 'Anianca', image: 'anianca.png' },
      { slug: 'carmen-delgado', name: 'Carmen Delgado', image: 'carmen-delgado.png' },
      { slug: 'carmen-okafor-petersen', name: 'Carmen Okafor-Petersen', image: 'carmen-okafor-petersen.png' },
      { slug: 'dani-rodriguez', name: 'Dani Rodriguez', image: 'dani-rodriguez.png' },
      { slug: 'dmitri-volkov-santiago', name: 'Dmitri Volkov-Santiago', image: 'dmitri-volkov-santiago.png' },
      { slug: 'eduardo-vaquerizo', name: 'Eduardo Vaquerizo', image: 'eduardo-vaquerizo.png' },
      { slug: 'elena-fuentes', name: 'Elena Fuentes', image: 'elena-fuentes.png' },
      { slug: 'esperanza-valdez-kominski', name: 'Esperanza Valdez-Kominski', image: 'esperanza-valdez-kominski.png' },
      { slug: 'gregor', name: 'Gregor', image: 'gregor.png' },
      { slug: 'hassan-oleg', name: 'Hassan Oleg', image: 'Hassan_Oleg.png' },
      { slug: 'hassir', name: 'Hassir', image: 'hassir.png' },
      { slug: 'heinrich-von-staufen-morales', name: 'Heinrich Von Staufen-Morales', image: 'heinrich-von-staufen-morales.png' },
      { slug: 'ignacio-fuentes', name: 'Ignacio Fuentes', image: 'ignacio-fuentes.png' },
      { slug: 'isabella-rosetti-nakamura', name: 'Isabella Rosetti-Nakamura', image: 'isabella-rosetti-nakamura.png' },
      { slug: 'leila-nasiri', name: 'Leila Nasiri', image: 'leila-nasiri.png' },
      { slug: 'marcial-gomez', name: 'Marcial Gomez', image: 'marcial-gomez.png' },
      { slug: 'margot-chen-beaumont', name: 'Margot Chen-Beaumont', image: 'margot-chen-beaumont.png' },
      { slug: 'marta-gutierrez', name: 'Marta Gutierrez', image: 'marta-gutierrez.png' },
      { slug: 'marta-heredia', name: 'Marta Heredia', image: 'marta-heredia.png' },
      { slug: 'nacho-smuck', name: 'Nacho Smück', image: 'nacho-smuck.png' },
      { slug: 'nasrin-ahmadi', name: 'Nasrin Ahmadi', image: 'nasrin-ahmadi.png' },
      { slug: 'natacha', name: 'Natacha', image: 'natacha.png' },
      { slug: 'raphael-dubois-yamamoto', name: 'Raphael Dubois-Yamamoto', image: 'raphael-dubois-yamamoto.png' },
      { slug: 'sebastian-torres-andersen', name: 'Sebastian Torres-Andersen', image: 'sebastian-torres-andersen.png' },
      { slug: 'senora-pepa', name: 'Señora Pepa', image: 'senora-pepa.png' },
      // Pacientes de Althea Argos (Psique)
      { slug: 'adrian-belmont-vasquez', name: 'Adrian Belmont-Vasquez', image: 'adrian-belmont-vasquez.png' },
      { slug: 'carmen-rousseau-nakamura', name: 'Carmen Rousseau-Nakamura', image: 'carmen-rousseau-nakamura.png' },
      { slug: 'esperanza-kowalski-okafor', name: 'Esperanza Kowalski-Okafor', image: 'esperanza-kowalski-okafor.png' },
      { slug: 'isabella-rodriguez-tanaka', name: 'Isabella Rodriguez-Tanaka', image: 'isabella-rodriguez-tanaka.png' },
      { slug: 'marcus-thompson-petrov', name: 'Marcus Thompson-Petrov', image: 'marcus-thompson-petrov.png' },
      { slug: 'viktor-chen-andersson', name: 'Viktor Chen-Andersson', image: 'viktor-chen-andersson.png' }
    ].sort((a, b) => a.name.localeCompare(b.name)),
    
    entidades: [
      { slug: 'el-guardian', name: 'El Guardián', image: 'el-guardian.png' },
      { slug: 'el-emperador-oscuro', name: 'El Emperador Oscuro', image: 'El Emperador Oscuro.png' },
      { slug: 'hermanas-magdalena', name: 'Hermanas Magdalena', image: 'hermanas-magdalena.png' },
      { slug: 'bastet', name: 'Bastet', image: 'bastet.png' },
      { slug: 'senora-de-la-sonrisa', name: 'Señora de la Sonrisa', image: 'senora-sonrisa.png' }
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
  createCharacterCards(characterCategories.artistas, 'artistas-gallery');
  createCharacterCards(characterCategories.civiles, 'civiles-gallery');
  createCharacterCards(characterCategories.entidades, 'entidades-gallery');
  createCharacterCards(characterCategories.estudiantes, 'estudiantes-gallery');
  createCharacterCards(characterCategories.heroes, 'heroes-gallery');
  createCharacterCards(characterCategories.historicos, 'historicos-gallery');
  createCharacterCards(characterCategories.independientes, 'independientes-gallery');
  createCharacterCards(characterCategories.modelos, 'modelos-gallery');
  createCharacterCards(characterCategories.medicos, 'medicos-gallery');
  createCharacterCards(characterCategories.metacorp, 'metacorp-gallery');
  createCharacterCards(characterCategories.militares, 'militares-gallery');
  createCharacterCards(characterCategories.participantesHeVi, 'participantes-hevi-gallery');
  createCharacterCards(characterCategories.periodistas, 'periodistas-gallery');
  createCharacterCards(characterCategories.politicos, 'politicos-gallery');
  createCharacterCards(characterCategories.profesionales, 'profesionales-gallery');
  createCharacterCards(characterCategories.villanos, 'villanos-gallery');

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
  initializeMasonry('artistas-gallery');
  initializeMasonry('civiles-gallery');
  initializeMasonry('entidades-gallery');
  initializeMasonry('estudiantes-gallery');
  initializeMasonry('heroes-gallery');
  initializeMasonry('historicos-gallery');
  initializeMasonry('independientes-gallery');
  initializeMasonry('modelos-gallery');
  initializeMasonry('medicos-gallery');
  initializeMasonry('metacorp-gallery');
  initializeMasonry('militares-gallery');
  initializeMasonry('participantes-hevi-gallery');
  initializeMasonry('periodistas-gallery');
  initializeMasonry('politicos-gallery');
  initializeMasonry('profesionales-gallery');
  initializeMasonry('villanos-gallery');
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
  width: 180px;
  max-width: 180px;
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
  aspect-ratio: 2/3;
  max-height: 270px;
  overflow: hidden;
  background: #f5f5f5;
  border-radius: 8px;
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
    width: 140px;
    max-width: 140px;
  }
  
  .character-image-container {
    aspect-ratio: 2/3;
    max-height: 210px;
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
    width: 120px;
    max-width: 120px;
    margin-bottom: 15px;
  }
  
  .character-image-container {
    aspect-ratio: 2/3;
    max-height: 180px;
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