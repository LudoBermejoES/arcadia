/**
 * Arcadia - Sistema de Búsqueda Avanzado
 * Usa MiniSearch para búsqueda fuzzy full-text con soporte español
 */

class ArcadiaSearch {
  constructor() {
    this.searchIndex = null;
    this.searchData = [];
    this.modal = document.getElementById('searchModal');
    this.input = document.getElementById('searchInput');
    this.results = document.getElementById('searchResults');
    this.clearBtn = document.getElementById('searchClear');
    this.closeBtn = document.getElementById('searchClose');
    this.toggleBtn = document.querySelector('.search-toggle');
    this.filterBtns = document.querySelectorAll('.filter-btn');

    this.currentFilter = 'all';
    this.selectedIndex = -1;
    this.searchResults = [];

    this.init();
  }

  /**
   * Normaliza texto para búsqueda - elimina acentos/diacríticos para español
   * Permite que "mesmero" encuentre "mésmero" y viceversa
   */
  normalizeText(text) {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
      .toLowerCase();
  }

  async init() {
    await this.loadSearchIndex();
    this.bindEvents();
  }

  async loadSearchIndex() {
    try {
      // Usar path relativo al baseurl de Jekyll
      const basePath = document.querySelector('meta[name="base-url"]')?.content || '';
      const response = await fetch(`${basePath}/assets/js/search-index.json`);
      if (!response.ok) throw new Error('Índice de búsqueda no encontrado');

      this.searchData = await response.json();

      // Crear instancia MiniSearch con configuración optimizada para español
      this.searchIndex = new MiniSearch({
        fields: ['title', 'content', 'category', 'tags', 'normalizedTitle', 'normalizedContent'],
        storeFields: ['title', 'url', 'category', 'content'],
        searchOptions: {
          boost: { title: 10, normalizedTitle: 8, tags: 5, category: 3 },
          fuzzy: 0.2, // Permite ~20% de errores de caracteres (typos)
          prefix: true, // Habilita búsqueda por prefijo
          combineWith: 'OR' // Coincide con cualquier término
        },
        // Tokenizador personalizado para mejor manejo del español
        tokenize: (text) => {
          // Divide por espacios y puntuación, mantiene palabras de 2+ caracteres
          return text.toLowerCase().match(/[\p{L}\p{N}]{2,}/gu) || [];
        },
        // Procesa términos para normalizar acentos
        processTerm: (term) => this.normalizeText(term)
      });

      // Añadir documentos con versiones normalizadas para búsqueda sin acentos
      const documents = this.searchData.map((doc, index) => ({
        id: index,
        title: doc.title,
        content: doc.content,
        category: doc.category,
        tags: Array.isArray(doc.tags) ? doc.tags.join(' ') : (doc.tags || ''),
        url: doc.url,
        // Versiones normalizadas para coincidencia sin acentos
        normalizedTitle: this.normalizeText(doc.title),
        normalizedContent: this.normalizeText(doc.content)
      }));

      this.searchIndex.addAll(documents);

      console.log('Índice MiniSearch cargado:', this.searchData.length, 'documentos');
    } catch (error) {
      console.error('Error cargando índice de búsqueda:', error);
      this.showError('No se pudo cargar el índice de búsqueda.');
    }
  }

  bindEvents() {
    console.log('bindEvents - toggleBtn:', this.toggleBtn);
    console.log('bindEvents - modal:', this.modal);

    // Abrir modal
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        console.log('Click en botón de búsqueda');
        e.preventDefault();
        e.stopPropagation();
        this.open();
      });
    } else {
      console.warn('No se encontró el botón .search-toggle');
    }

    // Cerrar modal
    this.closeBtn?.addEventListener('click', () => this.close());
    this.modal?.querySelector('.search-modal-backdrop')?.addEventListener('click', () => this.close());

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K para abrir búsqueda
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }

      // Escape para cerrar
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }

      // Navegación con flechas en resultados
      if (this.modal?.classList.contains('active')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.navigateResults(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateResults(-1);
        } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
          e.preventDefault();
          this.selectResult();
        }
      }
    });

    // Input de búsqueda con debounce
    let debounceTimer;
    this.input?.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(this.input.value);
      }, 100); // 100ms debounce para respuesta rápida
      this.clearBtn?.classList.toggle('visible', this.input.value.length > 0);
    });

    // Botón limpiar
    this.clearBtn?.addEventListener('click', () => {
      this.input.value = '';
      this.input.focus();
      this.clearBtn.classList.remove('visible');
      this.showPlaceholder();
    });

    // Botones de filtro
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        if (this.input.value) {
          this.performSearch(this.input.value);
        }
      });
    });
  }

  open() {
    console.log('open() llamado, modal:', this.modal);
    if (this.modal) {
      this.modal.classList.add('active');
      console.log('Clase active añadida, classList:', this.modal.classList);
    }
    this.input?.focus();
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal?.classList.remove('active');
    document.body.style.overflow = '';
    this.input.value = '';
    this.clearBtn?.classList.remove('visible');
    this.showPlaceholder();
  }

  performSearch(query) {
    if (!query.trim()) {
      this.showPlaceholder();
      return;
    }

    if (!this.searchIndex) {
      this.showError('El índice de búsqueda aún no está listo.');
      return;
    }

    try {
      // Buscar con MiniSearch - fuzzy y prefix habilitados
      let results = this.searchIndex.search(query, {
        fuzzy: 0.25, // Un poco más de tolerancia para consultas de usuario
        prefix: true,
        combineWith: 'OR'
      });

      // Filtrar por categoría si es necesario
      if (this.currentFilter !== 'all') {
        results = results.filter(result => {
          return result.category === this.currentFilter;
        });
      }

      this.searchResults = results.slice(0, 20); // Limitar a 20 resultados
      this.selectedIndex = -1;

      if (this.searchResults.length === 0) {
        // Intentar con más tolerancia fuzzy
        results = this.searchIndex.search(query, {
          fuzzy: 0.4, // Más tolerante para consultas difíciles
          prefix: true,
          combineWith: 'OR'
        });

        if (this.currentFilter !== 'all') {
          results = results.filter(result => result.category === this.currentFilter);
        }

        this.searchResults = results.slice(0, 20);

        if (this.searchResults.length === 0) {
          this.showNoResults(query);
        } else {
          this.renderResults(query);
        }
      } else {
        this.renderResults(query);
      }
    } catch (error) {
      console.error('Error de búsqueda:', error);
      this.showError('Error al realizar la búsqueda.');
    }
  }

  renderResults(query) {
    const html = this.searchResults.map((result, index) => {
      const excerpt = this.getExcerpt(result.content, query);
      const highlightedTitle = this.highlightMatch(result.title, query);
      const highlightedExcerpt = this.highlightMatch(excerpt, query);

      return `
        <a href="${result.url}" class="search-result-item" data-index="${index}">
          <span class="result-category">${this.getCategoryLabel(result.category)}</span>
          <span class="result-title">${highlightedTitle}</span>
          <p class="result-excerpt">${highlightedExcerpt}</p>
        </a>
      `;
    }).join('');

    this.results.innerHTML = html;

    // Añadir manejadores de hover
    this.results.querySelectorAll('.search-result-item').forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.updateSelection();
      });
    });
  }

  getExcerpt(content, query) {
    if (!content) return '';

    const normalizedContent = this.normalizeText(content);
    const normalizedQuery = this.normalizeText(query.split(/\s+/)[0]);
    const index = normalizedContent.indexOf(normalizedQuery);

    if (index === -1) {
      return content.substring(0, 150) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + 100);
    let excerpt = content.substring(start, end);

    if (start > 0) excerpt = '...' + excerpt;
    if (end < content.length) excerpt = excerpt + '...';

    return excerpt;
  }

  highlightMatch(text, query) {
    if (!query || !text) return text;

    const words = query.trim().split(/\s+/);
    let result = text;

    words.forEach(word => {
      if (word.length < 2) return;

      // Crear regex que coincida con versiones acentuadas y sin acentuar
      const normalizedWord = this.normalizeText(word);

      // Construir patrón regex que coincida con caracteres con o sin acentos
      let pattern = '';
      for (const char of normalizedWord) {
        const accentMap = {
          'a': '[aáàâäã]',
          'e': '[eéèêë]',
          'i': '[iíìîï]',
          'o': '[oóòôöõ]',
          'u': '[uúùûü]',
          'n': '[nñ]',
          'c': '[cç]'
        };
        pattern += accentMap[char] || this.escapeRegExp(char);
      }

      const regex = new RegExp(`(${pattern})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    });

    return result;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getCategoryLabel(category) {
    const labels = {
      'personajes': 'Personaje',
      'la-fuerza-oculta': 'La Fuerza Oculta',
      'la-familia': 'La Familia',
      'genesis': 'Génesis',
      'reformatorio': 'Reformatorio',
      'hospital': 'Hospital',
      'crematorio': 'Crematorio',
      'grupos': 'Grupo',
      'mundo': 'Mundo',
      'localizaciones': 'Lugar',
      'cronologia': 'Cronología',
      'inicio': 'Inicio',
      'resumenes': 'Resúmenes',
      'transcripciones': 'Transcripciones'
    };
    return labels[category] || category || 'General';
  }

  navigateResults(direction) {
    if (this.searchResults.length === 0) return;

    this.selectedIndex += direction;

    if (this.selectedIndex < 0) {
      this.selectedIndex = this.searchResults.length - 1;
    } else if (this.selectedIndex >= this.searchResults.length) {
      this.selectedIndex = 0;
    }

    this.updateSelection();
  }

  updateSelection() {
    this.results.querySelectorAll('.search-result-item').forEach((item, index) => {
      item.classList.toggle('selected', index === this.selectedIndex);
      if (index === this.selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  selectResult() {
    const selectedItem = this.results.querySelector('.search-result-item.selected');
    if (selectedItem) {
      window.location.href = selectedItem.href;
    }
  }

  showPlaceholder() {
    this.results.innerHTML = `
      <div class="search-placeholder">
        <div class="placeholder-icon">🔍</div>
        <p>Escribe para buscar en todo el contenido</p>
        <div class="search-tips">
          <p><strong>Consejos de búsqueda:</strong></p>
          <ul>
            <li>Busca personajes: <code>Mésmero</code> o <code>Mesmero</code></li>
            <li>Busca campañas: <code>La Familia</code></li>
            <li>Busca lugares: <code>Barrio Gótico</code></li>
            <li>Tolera errores: <code>telekinesis</code> encuentra <code>telequinesis</code></li>
          </ul>
        </div>
      </div>
    `;
  }

  showNoResults(query) {
    // Obtener sugerencias usando MiniSearch autoSuggest
    let suggestions = [];
    if (this.searchIndex) {
      try {
        suggestions = this.searchIndex.autoSuggest(query, {
          fuzzy: 0.3,
          prefix: true
        }).slice(0, 3);
      } catch (e) {
        console.warn('Error en autoSuggest:', e);
      }
    }

    let suggestionsHtml = '';
    if (suggestions.length > 0) {
      suggestionsHtml = `
        <p>¿Quisiste decir?</p>
        <div class="search-suggestions">
          ${suggestions.map(s => `<button class="suggestion-btn" data-suggestion="${s.suggestion}">${s.suggestion}</button>`).join('')}
        </div>
      `;
    }

    this.results.innerHTML = `
      <div class="search-no-results">
        <p>No se encontraron resultados para "<strong>${this.escapeHtml(query)}</strong>"</p>
        ${suggestionsHtml}
        <p>Intenta con términos más generales o revisa la ortografía.</p>
      </div>
    `;

    // Añadir manejadores de click para sugerencias
    this.results.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.input.value = btn.dataset.suggestion;
        this.performSearch(btn.dataset.suggestion);
      });
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showError(message) {
    this.results.innerHTML = `
      <div class="search-no-results">
        <p>${message}</p>
      </div>
    `;
  }
}

// Inicializar búsqueda cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Pequeño delay para asegurar que todos los elementos estén renderizados
  setTimeout(() => {
    window.arcadiaSearch = new ArcadiaSearch();
    console.log('ArcadiaSearch inicializado');
    console.log('Toggle button encontrado:', !!document.querySelector('.search-toggle'));
    console.log('Modal encontrado:', !!document.getElementById('searchModal'));
  }, 0);
});
