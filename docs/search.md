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