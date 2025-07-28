---
---
(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<div class="search-result">';
        appendString += '<h3><a href="' + item.url + '">' + item.title + '</a></h3>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p>';
        appendString += '<small>Categoría: ' + item.category + '</small>';
        appendString += '</div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've also included the boost property which can be used to weight the importance of each field.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('content');
      this.field('category');
      this.field('tags');
    });

    // Download the data from the JSON file we generated
    var data = {{ site.data.search | jsonify }};
    if (!data) {
      // Fallback: load search.json
      fetch('{{ site.baseurl }}/search.json')
        .then(response => response.json())
        .then(data => {
          performSearch(data);
        });
    } else {
      performSearch(data);
    }

    function performSearch(data) {
      for (var key in data) { // Add the data to lunr
        idx.add({
          'id': key,
          'title': data[key].title,
          'content': data[key].content,
          'category': data[key].category,
          'tags': data[key].tags
        });
      }

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, data); // We'll write this in the next section
    }
  }
})();

// Simple search without lunr (fallback)
function simpleSearch(searchTerm, data) {
  var results = [];
  
  for (var key in data) {
    var item = data[key];
    var searchContent = (item.title + ' ' + item.content + ' ' + item.tags).toLowerCase();
    
    if (searchContent.indexOf(searchTerm.toLowerCase()) !== -1) {
      results.push({
        title: item.title,
        url: item.url,
        content: item.content,
        category: item.category
      });
    }
  }
  
  return results;
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', function() {
  var searchBox = document.getElementById('search-input');
  var searchForm = document.getElementById('search-form');
  
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var searchTerm = searchBox.value;
      if (searchTerm) {
        window.location.href = '{{ site.baseurl }}/search/?query=' + encodeURIComponent(searchTerm);
      }
    });
  }
});