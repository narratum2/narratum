/**
 * Enhanced UX and Content Restoration
 * Fixes missing text, improves popups, and restores keyword visualization
 */

// Add keyword nebulas to hero section
function addKeywordNebulas() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Check if nebulas already exist
    if (heroSection.querySelector('.keyword-nebula')) return;
    
    // Create and add keyword nebulas
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

// Fix partnership section content
function fixPartnershipContent() {
    const partnershipCategories = document.querySelectorAll('.partnership-category');
    
    if (partnershipCategories.length >= 2) {
        // Educational Excellence
        const educationalCategory = partnershipCategories[0];
        if (educationalCategory) {
            const educationalContent = educationalCategory.querySelector('p');
            if (educationalContent) {
                educationalContent.textContent = 'Leading universities and educational institutions reimagining campus experiences and digital engagement.';
            }
        }
        
        // Corporate Campuses
        const corporateCategory = partnershipCategories[1];
        if (corporateCategory) {
            const corporateContent = corporateCategory.querySelector('p');
            if (corporateContent) {
                corporateContent.textContent = 'Fortune 500 companies transforming workplace culture and employee experience.';
            }
        }
        
        // Add Hospitality section if it doesn't exist
        if (partnershipCategories.length < 3) {
            const partnershipGrid = document.querySelector('.partnerships-grid');
            if (partnershipGrid) {
                const hospitalityCategory = document.createElement('div');
                hospitalityCategory.className = 'partnership-category';
                hospitalityCategory.innerHTML = `
                    <h3>Hospitality</h3>
                    <p>Luxury hotels and hospitality brands creating memorable guest experiences through strategic infrastructure.</p>
                    <div class="partnership-stats">
                        <div class="stat">
                            <span class="stat-number">20+</span>
                            <span class="stat-label">Properties</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">1.5M+</span>
                            <span class="stat-label">Annual Guests</span>
                        </div>
                    </div>
                `;
                partnershipGrid.appendChild(hospitalityCategory);
            }
        } else {
            // Update existing Hospitality section
            const hospitalityCategory = partnershipCategories[2];
            if (hospitalityCategory) {
                const title = hospitalityCategory.querySelector('h3');
                if (title) {
                    title.textContent = 'Hospitality';
                }
                
                const content = hospitalityCategory.querySelector('p');
                if (content) {
                    content.textContent = 'Luxury hotels and hospitality brands creating memorable guest experiences through strategic infrastructure.';
                }
            }
        }
    }
}

// Enhance symbol grid popups
function enhanceSymbolGridPopups() {
    const symbolItems = document.querySelectorAll('.symbol-item');
    
    symbolItems.forEach(item => {
        // Add close button to content if it doesn't exist
        const content = item.querySelector('.symbol-content');
        if (content && !content.querySelector('.close-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.setAttribute('aria-label', 'Close');
            content.appendChild(closeBtn);
            
            // Add click event to close button
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.remove('active');
            });
        }
        
        // Remove existing click event and add enhanced one
        item.removeEventListener('click', handleSymbolClick);
        item.addEventListener('click', handleSymbolClick);
    });
    
    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.symbol-item')) {
            symbolItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// Handle symbol click with magical effects
function handleSymbolClick(e) {
    e.stopPropagation();
    
    const item = this;
    const wasActive = item.classList.contains('active');
    
    // Close all other popups
    document.querySelectorAll('.symbol-item.active').forEach(activeItem => {
        if (activeItem !== item) {
            activeItem.classList.remove('active');
        }
    });
    
    // Toggle active state
    item.classList.toggle('active');
    
    // Create magical particle effect if becoming active
    if (!wasActive && item.classList.contains('active')) {
        createParticleEffect(item);
    }
}

// Create magical particle effect
function createParticleEffect(element) {
    const glyph = element.querySelector('.symbol-glyph');
    if (!glyph) return;
    
    const rect = glyph.getBoundingClientRect();
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
        
        // Position at center of glyph
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 60;
        const destinationX = centerX + Math.cos(angle) * distance;
        const destinationY = centerY + Math.sin(angle) * distance;
        
        // Add to body
        document.body.appendChild(particle);
        
        // Animate
        setTimeout(() => {
            particle.style.opacity = '0.8';
            particle.style.transform = `translate(${destinationX - centerX}px, ${destinationY - centerY}px)`;
            
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

// Fix footer design
function fixFooterDesign() {
    const mailingSection = document.querySelector('.mailing-section');
    if (mailingSection) {
        // Remove yellow background if present
        mailingSection.style.background = 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)';
        mailingSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        
        // Update text colors
        const mailingTitle = mailingSection.querySelector('.mailing-title');
        if (mailingTitle) {
            mailingTitle.style.color = 'var(--text-primary)';
        }
        
        // Update button colors
        const submitButton = mailingSection.querySelector('.mailing-submit');
        if (submitButton) {
            submitButton.style.backgroundColor = 'var(--accent-gold)';
            submitButton.style.color = 'var(--bg-primary)';
        }
    }
}

// Add CSS file if not already added
function addEnhancedStyles() {
    if (!document.querySelector('link[href="enhanced-ux.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'enhanced-ux.css';
        document.head.appendChild(link);
    }
}

// Initialize all enhancements
function initializeEnhancements() {
    addEnhancedStyles();
    addKeywordNebulas();
    fixPartnershipContent();
    enhanceSymbolGridPopups();
    fixFooterDesign();
}

// Call on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeEnhancements, 1000);
});

// Call immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeEnhancements();
}
