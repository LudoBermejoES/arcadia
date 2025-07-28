---
---
// Simple search functionality for Jekyll site
(function() {
  // Initialize search when page loads
  document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search-input');
    var searchForm = document.getElementById('search-form');
    
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var searchTerm = searchInput.value.trim();
        if (searchTerm) {
          window.location.href = '{{ site.baseurl }}/search/?query=' + encodeURIComponent(searchTerm);
        }
      });
    }
  });
})();