// Comic Book Theme JavaScript for Arcadia RPG
// Original theme by Jagjeet: https://github.com/Jagjeet/comicbook-theme
// Enhanced for Arcadia RPG with superhero features

// ============================================================================
// NAVIGATION FUNCTIONALITY (Original theme)
// ============================================================================

function myFunction() {
  var x = document.getElementById("top-nav");
  if (x.className === "top-nav") {
    x.className += " responsive";
  } else {
    x.className = "top-nav";
  }
}

// ============================================================================
// VIEWPORT DETECTION (Original theme)
// ============================================================================

var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// ============================================================================
// SCROLL ANIMATIONS (Original theme)
// ============================================================================

var last_known_scroll_position = null;
window.addEventListener("scroll", function(e){
  var comicPanelList = document.querySelectorAll(".comic-description");
  var comicOverlayList = document.querySelectorAll(".comic-overlay");
  var comicPanelArray = Array.prototype.slice.call(comicPanelList);
  var comicOverlayArray = Array.prototype.slice.call(comicOverlayList);

  if (last_known_scroll_position !== null) {
    if (Math.abs(last_known_scroll_position - window.scrollY) >= 1) {
      var i = 0;
      for (i=0; i < comicPanelArray.length; i+=1) {
        if (isInViewport(comicPanelArray[i])) {
          comicPanelArray[i].classList.add("comic-description-animate");
          comicOverlayArray[i].classList.add("comic-overlay-animate");
        }
      }
    }
  }
  last_known_scroll_position = window.scrollY;
});

// ============================================================================
// ARCADIA RPG ENHANCEMENTS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Add comic book sound effects on click
    function addSoundEffect(element, sound) {
        element.addEventListener('click', function() {
            console.log('💥 ' + sound + '! 💥');
        });
    }
    
    // Hero card interactions
    const heroCards = document.querySelectorAll('.hero-card, .character-card, .campaign-card');
    heroCards.forEach(card => {
        addSoundEffect(card, 'POW');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Comic panel interactions
    const comicPanels = document.querySelectorAll('.comic-panel');
    comicPanels.forEach(panel => {
        addSoundEffect(panel, 'WHOOSH');
        
        panel.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.comic-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        panel.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.comic-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Hero emoji animations
    const heroEmojis = document.querySelectorAll('.hero-emoji, .character-emoji');
    heroEmojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        emoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        emoji.addEventListener('click', function() {
            this.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Navigation enhancements
    const navLinks = document.querySelectorAll('.top-nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
    
    // Stats counter animation
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        if (!target || isNaN(target)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
            }
        }, duration / steps);
    }
    
    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close responsive nav if open
            const nav = document.getElementById("top-nav");
            if (nav && nav.className.includes("responsive")) {
                nav.className = "top-nav";
            }
        }
    });
    
    // Page transition effects
    function addPageTransition(elements) {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Animate main content on page load
    const mainElements = document.querySelectorAll('main > *, .comic, .campaign-card, .stat-card');
    if (mainElements.length > 0) {
        addPageTransition(mainElements);
    }
    
    // Console easter egg for Arcadia
    console.log(`
    🦸‍♂️ WELCOME TO ARCADIA! 🦸‍♀️
    
    ════════════════════════════════════════
    💥 15 Years of Epic Superhero Adventures
    🎭 3 Legendary Campaigns: La Familia, Génesis, La Fuerza Oculta
    👥 200+ Heroic Characters and Memorable Villains
    ⚡ Powered by Comic Book Theme
    🎮 Built with Jekyll & Hosted on GitHub Pages
    ════════════════════════════════════════
    
    Ready for action, hero? The city needs you!
    
    🎯 Explore the campaigns and discover your destiny!
    `);
});

// ============================================================================
// CSS ANIMATIONS (Dynamic injection)
// ============================================================================

const comicStyles = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes pow {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .comic-pow {
        animation: pow 0.3s ease;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease;
    }
    
    .comic-description-animate {
        animation: fadeInUp 0.5s ease;
    }
    
    .comic-overlay-animate {
        animation: fadeInUp 0.5s ease;
    }
`;

// Inject comic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = comicStyles;
document.head.appendChild(styleSheet);