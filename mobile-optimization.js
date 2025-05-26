/**
 * Mobile Optimization Enhancements
 * Improves responsiveness and touch interactions for mobile devices
 */

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Initialize mobile optimizations
function initializeMobileOptimizations() {
    if (isMobile) {
        document.body.classList.add('mobile-device');
        enhanceTouchInteractions();
        optimizeAnimations();
        adjustLayoutForMobile();
    }
    
    // Always add responsive handlers for window resizing
    window.addEventListener('resize', handleResponsiveLayout);
    handleResponsiveLayout();
}

// Enhance touch interactions for mobile
function enhanceTouchInteractions() {
    // Make symbols more touch-friendly
    const symbols = document.querySelectorAll('.symbol-item');
    symbols.forEach(symbol => {
        symbol.classList.add('touch-enhanced');
    });
    
    // Improve touch area for navigation dots
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.classList.add('touch-enhanced');
    });
    
    // Add touch feedback effects
    document.querySelectorAll('button, .submit-button, .capability-block, .symbol-item')
        .forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                element.classList.remove('touch-active');
                setTimeout(() => element.classList.remove('touch-active'), 300);
            });
        });
}

// Optimize animations for mobile performance
function optimizeAnimations() {
    // Reduce particle count
    const particles = document.querySelectorAll('.signal-particles');
    if (particles.length > 0) {
        // Will be handled by CSS with fewer particles
        particles[0].classList.add('mobile-optimized');
    }
    
    // Simplify orbital effects
    const orbitals = document.querySelectorAll('.orbital-artifact');
    if (orbitals.length > 3) {
        // Remove excess orbitals to improve performance
        for (let i = 3; i < orbitals.length; i++) {
            orbitals[i].remove();
        }
    }
}

// Adjust layout for mobile screens
function adjustLayoutForMobile() {
    // Adjust hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('mobile-adjusted');
    }
    
    // Adjust content spacing
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('mobile-spacing');
    });
    
    // Adjust navigation
    const navDots = document.querySelector('.nav-dots');
    if (navDots) {
        navDots.classList.add('mobile-nav');
    }
}

// Handle responsive layout changes
function handleResponsiveLayout() {
    const width = window.innerWidth;
    
    // Small mobile (up to 480px)
    if (width <= 480) {
        document.body.setAttribute('data-viewport', 'small-mobile');
        adjustFontSizes('small');
    } 
    // Medium mobile (up to 768px)
    else if (width <= 768) {
        document.body.setAttribute('data-viewport', 'mobile');
        adjustFontSizes('medium');
    } 
    // Tablet (up to 1024px)
    else if (width <= 1024) {
        document.body.setAttribute('data-viewport', 'tablet');
        adjustFontSizes('normal');
    } 
    // Desktop
    else {
        document.body.setAttribute('data-viewport', 'desktop');
        adjustFontSizes('normal');
    }
    
    // Adjust content container width
    const contentContainers = document.querySelectorAll('.content-container');
    contentContainers.forEach(container => {
        if (width <= 768) {
            container.style.width = '90%';
        } else if (width <= 1024) {
            container.style.width = '85%';
        } else {
            container.style.width = '80%';
        }
    });
}

// Adjust font sizes for different screen sizes
function adjustFontSizes(size) {
    if (size === 'small') {
        document.documentElement.style.setProperty('--section-padding', '60px');
    } else if (size === 'medium') {
        document.documentElement.style.setProperty('--section-padding', '80px');
    } else {
        document.documentElement.style.setProperty('--section-padding', '120px');
    }
}

// Call this function from the main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add to existing initialization
    setTimeout(() => {
        initializeMobileOptimizations();
    }, 1000);
});
