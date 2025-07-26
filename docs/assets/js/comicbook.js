// Comic Book Theme JavaScript for Arcadia RPG
// Enhanced interactions for superhero content

document.addEventListener('DOMContentLoaded', function() {
    
    // Add comic book sound effects on click
    function addSoundEffect(element, sound) {
        element.addEventListener('click', function() {
            console.log(sound + '!');
        });
    }
    
    // Hero card interactions
    const heroCards = document.querySelectorAll('.hero-card, .character-card');
    heroCards.forEach(card => {
        addSoundEffect(card, 'POW');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Campaign card interactions
    const campaignCards = document.querySelectorAll('.campaign-card');
    campaignCards.forEach(card => {
        addSoundEffect(card, 'WHOOSH');
    });
    
    // Add comic book transitions
    function addComicTransition(elements) {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Animate panels on page load
    const panels = document.querySelectorAll('.comic-panel, .stat-card');
    addComicTransition(panels);
    
    // Speech bubble interactions
    const speechBubbles = document.querySelectorAll('.speech-bubble');
    speechBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            this.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Add comic book cursor effects
    document.body.style.cursor = 'default';
    
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
    });
    
    // Navigation enhancements
    const navLinks = document.querySelectorAll('.site-nav a, nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
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
    });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            console.log('Escape pressed - comic book style!');
        }
    });
    
    // Console easter egg
    console.log(`
    🦸‍♂️ WELCOME TO ARCADIA! 🦸‍♀️
    
    ════════════════════════════
    💥 15 Years of Epic Adventures
    🎭 3 Legendary Campaigns  
    👥 200+ Heroic Characters
    ⚡ Powered by Comic Book Theme
    ════════════════════════════
    
    Ready for action, hero?
    `);
});

// CSS animations to be added dynamically
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
    
    .comic-pow {
        animation: pow 0.3s ease;
    }
`;

// Inject comic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = comicStyles;
document.head.appendChild(styleSheet);