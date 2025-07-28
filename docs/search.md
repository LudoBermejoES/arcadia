---
layout: default
title: "Búsqueda"
permalink: /search/
---

# Búsqueda en Arcadia

<form id="search-form" action="{{ site.baseurl }}/search/" method="get">
  <input type="text" id="search-box" name="query" placeholder="Buscar personajes, grupos, sesiones..." value="">
  <button type="submit">🔍 Buscar</button>
</form>

<div id="search-results"></div>

<script type="text/javascript" src="{{ site.baseurl }}/assets/js/search.js"></script>

<script>
// Initialize search on page load
document.addEventListener('DOMContentLoaded', function() {
  var searchBox = document.getElementById('search-box');
  var searchResults = document.getElementById('search-results');
  
  // Get search term from URL
  var urlParams = new URLSearchParams(window.location.search);
  var searchTerm = urlParams.get('query');
  
  if (searchTerm) {
    searchBox.value = searchTerm;
    performSearch(searchTerm);
  }
  
  function performSearch(term) {
    if (!term) return;
    
    // Load search data and perform search
    fetch('{{ site.baseurl }}/search.json')
      .then(response => response.json())
      .then(data => {
        var results = simpleSearch(term, data);
        displayResults(results);
      })
      .catch(error => {
        console.error('Search error:', error);
        searchResults.innerHTML = '<p>Error al realizar la búsqueda. Inténtalo de nuevo.</p>';
      });
  }
  
  function simpleSearch(searchTerm, data) {
    var results = [];
    var lowerTerm = searchTerm.toLowerCase();
    
    data.forEach(function(item, index) {
      if (!item.title || !item.content) return;
      
      var searchContent = (item.title + ' ' + item.content).toLowerCase();
      
      if (searchContent.indexOf(lowerTerm) !== -1) {
        results.push({
          title: item.title,
          url: item.url,
          content: item.content,
          category: item.category || 'General'
        });
      }
    });
    
    return results;
  }
  
  function displayResults(results) {
    if (!results || results.length === 0) {
      searchResults.innerHTML = '<p>No se encontraron resultados para "' + searchBox.value + '".</p>';
      return;
    }
    
    var html = '<h3>Resultados de búsqueda (' + results.length + '):</h3>';
    
    results.forEach(function(result) {
      html += '<div class="search-result">';
      html += '<h4><a href="' + result.url + '">' + result.title + '</a></h4>';
      
      // Show a snippet of content
      var snippet = result.content.substring(0, 200);
      if (result.content.length > 200) snippet += '...';
      html += '<p>' + snippet + '</p>';
      
      html += '<small>Categoría: ' + result.category + '</small>';
      html += '</div>';
    });
    
    searchResults.innerHTML = html;
  }
});
</script>

<style>
#search-form {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

#search-box {
  flex: 1;
  padding: 10px;
  border: 2px solid #FFD700;
  border-radius: 5px;
  font-size: 16px;
}

#search-form button {
  padding: 10px 20px;
  background: #FFD700;
  color: #000;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

#search-form button:hover {
  background: #FFA500;
}

.search-result {
  background: rgba(255, 215, 0, 0.1);
  padding: 15px;
  margin: 10px 0;
  border-left: 4px solid #FFD700;
  border-radius: 5px;
}

.search-result h3 {
  margin: 0 0 10px 0;
}

.search-result h3 a {
  color: #FFD700;
  text-decoration: none;
}

.search-result h3 a:hover {
  text-decoration: underline;
}

.search-result p {
  margin: 10px 0;
  line-height: 1.5;
}

.search-result small {
  color: #999;
  font-style: italic;
}
</style>