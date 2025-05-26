/**
 * Enhanced Symbol Interactions and Popup Functionality - Fixed Version
 * Ensures popups work correctly and icons are perfectly centered
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fix symbol grid popups and centering
    fixSymbolGridInteractions();
    
    // Ensure infrastructure section text is visible
    fixInfrastructureSection();
    
    // Initialize all other enhancements
    initializeAllEnhancements();
});

// Fix symbol grid interactions and centering
function fixSymbolGridInteractions() {
    // Get all symbol items
    const symbolItems = document.querySelectorAll('.symbol-item');
    
    // Fix SVG icon centering with direct style application
    document.querySelectorAll('.symbol-icon').forEach(icon => {
        icon.setAttribute('dominant-baseline', 'middle');
        icon.setAttribute('text-anchor', 'middle');
        icon.style.transform = 'translateY(0)'; // Ensure perfect vertical alignment
    });
    
    // Add click event listeners to each symbol item
    symbolItems.forEach(item => {
        // Remove any existing click listeners to prevent duplicates
        const clone = item.cloneNode(true);
        item.parentNode.replaceChild(clone, item);
        
        // Add new click listener with proper event handling
        clone.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class on clicked item
            const wasActive = this.classList.contains('active');
            
            // Close all other active items
            symbolItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active state on current item
            this.classList.toggle('active');
            
            // Create particle effect if becoming active
            if (!wasActive && this.classList.contains('active')) {
                createParticleEffect(this);
            }
        });
        
        // Add close button to content if it doesn't exist
        const content = clone.querySelector('.symbol-content');
        if (content && !content.querySelector('.close-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.setAttribute('aria-label', 'Close');
            content.appendChild(closeBtn);
            
            // Add click event to close button
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                clone.classList.remove('active');
            });
        }
    });
    
    // Close popups when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.symbol-item')) {
            symbolItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Add CSS to ensure proper centering and popup visibility
    addCustomStyles();
    
    // Force immediate application of styles
    forceStyleRefresh();
}

// Create particle effect for magical interaction
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at center of element
        particle.style.position = 'fixed';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        particle.style.opacity = '0';
        
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 60;
        const destinationX = Math.cos(angle) * distance;
        const destinationY = Math.sin(angle) * distance;
        
        // Add to body
        document.body.appendChild(particle);
        
        // Animate
        setTimeout(() => {
            particle.style.opacity = '0.8';
            particle.style.transform = `translate(${destinationX}px, ${destinationY}px)`;
            
            // Remove after animation
            setTimeout(() => {
                particle.style.opacity = '0';
                setTimeout(() => {
                    particle.remove();
                }, 300);
            }, 500 + Math.random() * 500);
        }, 10);
    }
}

// Fix infrastructure section text visibility
function fixInfrastructureSection() {
    const infrastructureSection = document.getElementById('infrastructure');
    if (infrastructureSection) {
        const prose = infrastructureSection.querySelector('.prose');
        if (prose) {
            // Ensure prose content is visible
            prose.style.display = 'block';
            prose.style.opacity = '1';
            prose.style.visibility = 'visible';
            
            // Ensure paragraphs are visible
            const paragraphs = prose.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.display = 'block';
                p.style.opacity = '1';
                p.style.visibility = 'visible';
                p.style.marginBottom = '1rem';
                p.style.lineHeight = '1.6';
            });
        }
    }
}

// Add custom styles to ensure proper display
function addCustomStyles() {
    // Create style element if it doesn't exist
    let styleEl = document.getElementById('enhanced-fixes-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'enhanced-fixes-style';
        document.head.appendChild(styleEl);
    }
    
    // Add CSS rules
    styleEl.textContent = `
        /* Symbol centering fixes */
        .symbol-icon {
            dominant-baseline: middle !important;
            text-anchor: middle !important;
            transform: translateY(0) !important;
        }
        
        /* Popup visibility fixes */
        .symbol-content {
            position: absolute !important;
            top: 120% !important;
            left: 50% !important;
            transform: translateX(-50%) translateY(10px) !important;
            width: 280px !important;
            background: rgba(10, 21, 32, 0.85) !important;
            backdrop-filter: blur(8px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 8px !important;
            padding: 20px !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
            z-index: 100 !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.05) !important;
            text-align: left !important;
            pointer-events: none !important;
        }
        
        .symbol-item.active .symbol-content {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateX(-50%) translateY(0) !important;
            pointer-events: auto !important;
        }
        
        /* Close button styling */
        .symbol-content .close-btn {
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            width: 20px !important;
            height: 20px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            opacity: 0.6 !important;
            transition: opacity 0.3s ease !important;
            background: none !important;
            border: none !important;
            color: white !important;
        }
        
        .symbol-content .close-btn:hover {
            opacity: 1 !important;
        }
        
        .symbol-content .close-btn::before,
        .symbol-content .close-btn::after {
            content: '' !important;
            position: absolute !important;
            width: 12px !important;
            height: 1px !important;
            background-color: currentColor !important;
        }
        
        .symbol-content .close-btn::before {
            transform: rotate(45deg) !important;
        }
        
        .symbol-content .close-btn::after {
            transform: rotate(-45deg) !important;
        }
        
        /* Infrastructure section fixes */
        #infrastructure .prose {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        #infrastructure .prose p {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            margin-bottom: 1rem !important;
            line-height: 1.6 !important;
        }
        
        /* Particle effect styling */
        .particle {
            position: fixed !important;
            background-color: rgba(255, 255, 255, 0.8) !important;
            border-radius: 50% !important;
            pointer-events: none !important;
            z-index: 9999 !important;
            transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        }
        
        /* Symbol item hover effects */
        .symbol-item {
            cursor: pointer !important;
            transition: transform 0.3s ease !important;
        }
        
        .symbol-item:hover {
            transform: scale(1.05) !important;
        }
        
        .symbol-item .symbol-glyph {
            transition: all 0.3s ease !important;
        }
        
        .symbol-item:hover .symbol-glyph {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)) !important;
        }
        
        /* Ensure symbol labels are visible */
        .symbol-label {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            margin-top: 10px !important;
            text-align: center !important;
        }
    `;
}

// Force style refresh to ensure immediate application
function forceStyleRefresh() {
    // Force a reflow
    document.body.offsetHeight;
    
    // Apply inline styles directly to symbols for immediate effect
    document.querySelectorAll('.symbol-icon').forEach(icon => {
        icon.style.dominantBaseline = 'middle';
        icon.style.textAnchor = 'middle';
        icon.style.transform = 'translateY(0)';
    });
    
    // Ensure symbol content is properly styled
    document.querySelectorAll('.symbol-content').forEach(content => {
        content.style.position = 'absolute';
        content.style.top = '120%';
        content.style.left = '50%';
        content.style.transform = 'translateX(-50%) translateY(10px)';
        content.style.width = '280px';
        content.style.background = 'rgba(10, 21, 32, 0.85)';
        content.style.backdropFilter = 'blur(8px)';
        content.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        content.style.borderRadius = '8px';
        content.style.padding = '20px';
        content.style.zIndex = '100';
        content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.05)';
        content.style.textAlign = 'left';
    });
    
    // Apply active styles to any active items
    document.querySelectorAll('.symbol-item.active .symbol-content').forEach(content => {
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        content.style.transform = 'translateX(-50%) translateY(0)';
        content.style.pointerEvents = 'auto';
    });
}

// Initialize all other enhancements
function initializeAllEnhancements() {
    // Add keyword nebulas if not present
    const heroSection = document.querySelector('.hero');
    if (heroSection && !heroSection.querySelector('.keyword-nebula')) {
        const keywords = [
            { text: 'hospitality sentiment', class: 'hospitality' },
            { text: 'touchpoint', class: 'touchpoint' },
            { text: 'experiences', class: 'experience' },
            { text: 'sentiment', class: 'sentiment' }
        ];
        
        keywords.forEach(keyword => {
            const nebula = document.createElement('div');
            nebula.className = `keyword-nebula ${keyword.class}`;
            nebula.textContent = keyword.text;
            heroSection.appendChild(nebula);
            
            // Animate appearance
            setTimeout(() => {
                nebula.style.opacity = '0.6';
            }, 500 + Math.random() * 1000);
        });
    }
}

// Execute immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fixSymbolGridInteractions();
    fixInfrastructureSection();
    initializeAllEnhancements();
}

// Add a direct event handler for symbol items
window.addEventListener('load', function() {
    // Direct click handlers for each symbol
    document.querySelectorAll('.symbol-item').forEach(item => {
        item.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class
            const wasActive = this.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.symbol-item').forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle this item
            this.classList.toggle('active');
            
            // Create particle effect if becoming active
            if (!wasActive && this.classList.contains('active')) {
                createParticleEffect(this);
            }
        };
    });
    
    // Force style refresh again after full load
    forceStyleRefresh();
});
