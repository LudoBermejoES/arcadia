// Lightbox functionality for character and group images
document.addEventListener('DOMContentLoaded', function() {
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-image" src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Get all images in character-photo and location-photo divs
  const clickableImages = document.querySelectorAll('.character-photo img, .location-photo img');
  
  // Add click event to each image
  clickableImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      const lightboxImage = lightbox.querySelector('.lightbox-image');
      const lightboxCaption = lightbox.querySelector('.lightbox-caption');
      
      lightboxImage.src = this.src;
      lightboxImage.alt = this.alt;
      lightboxCaption.textContent = this.alt;
      
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close lightbox when clicking the X
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close lightbox when clicking the overlay
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close lightbox with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});