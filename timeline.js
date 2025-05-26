/**
 * Timeline/Loyalty Framework JavaScript
 * Creates interactive timeline with points and content
 */

// Initialize Timeline Section
function initializeTimelineSection() {
    // Check if timeline section already exists
    if (document.querySelector('.timeline-section')) return;
    
    // Create timeline section before the contact section
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    const timelineSection = document.createElement('section');
    timelineSection.id = 'timeline';
    timelineSection.className = 'section timeline-section';
    timelineSection.setAttribute('data-section', 'timeline');
    
    // Timeline content
    const timelineItems = [
        {
            title: 'Discovery & Analysis',
            description: 'We begin by deeply understanding your organization's culture, goals, and audience. Through stakeholder interviews, data analysis, and immersive research, we identify the unique opportunities for your hospitality infrastructure.',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
        },
        {
            title: 'Strategic Framework',
            description: 'We develop a comprehensive strategic framework that aligns your organizational purpose with transformative hospitality experiences, creating a roadmap for implementation across all touchpoints.',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 9H21" stroke="currentColor" stroke-width="1.5"/><path d="M9 21V9" stroke="currentColor" stroke-width="1.5"/></svg>'
        },
        {
            title: 'Experience Design',
            description: 'Our team crafts the detailed experience design, from spatial concepts to digital interactions, ensuring every element reinforces your strategic vision and creates meaningful connections.',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4Z" stroke="currentColor" stroke-width="1.5"/><path d="M5 19.5C5 15.9101 8.13401 13 12 13C15.866 13 19 15.9101 19 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
        },
        {
            title: 'Implementation',
            description: 'We guide the implementation process, working closely with your team and partners to bring the strategic framework to life through training, systems integration, and operational alignment.',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 6L15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 12L15 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>'
        },
        {
            title: 'Measurement & Evolution',
            description: 'Our relationship continues as we measure impact, gather insights, and evolve the strategy based on real-world performance, ensuring your hospitality infrastructure remains dynamic and effective.',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 14C8.5 14 9.5 16 12 16C14.5 16 15.5 14 15.5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/></svg>'
        }
    ];
    
    timelineSection.innerHTML = `
        <div class="content-container">
            <h2 class="section-title">Our Approach</h2>
            <p class="section-subtitle">A proven methodology for transformative results.</p>
            
            <div class="timeline-container">
                <div class="timeline-line"></div>
                ${timelineItems.map((item, index) => `
                    <div class="timeline-item" data-index="${index + 1}">
                        <div class="timeline-content">
                            <div class="timeline-icon">${item.icon}</div>
                            <h3 class="timeline-title">${item.title}</h3>
                            <p class="timeline-description">${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Section Arc -->
        <svg class="section-arc bottom" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M 0,0 Q 100,100 200,0" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        </svg>
    `;
    
    // Insert before contact section
    contactSection.parentNode.insertBefore(timelineSection, contactSection);
    
    // Add timeline points
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const point = document.createElement('div');
            point.classList.add('timeline-point');
            point.setAttribute('data-index', index + 1);
            
            // Position point
            const percentage = (index / (timelineItems.length - 1)) * 100;
            point.style.top = `${percentage}%`;
            
            // Add click event
            point.addEventListener('click', () => {
                // Highlight point
                document.querySelectorAll('.timeline-point').forEach(p => p.classList.remove('active'));
                point.classList.add('active');
                
                // Show corresponding item
                const itemIndex = point.getAttribute('data-index');
                const targetItem = document.querySelector(`.timeline-item[data-index="${itemIndex}"]`);
                if (targetItem) {
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            
            timelineContainer.appendChild(point);
        });
    }
    
    // Add to navigation dots
    const navDots = document.querySelector('.nav-dots');
    if (navDots) {
        const timelineDot = document.createElement('button');
        timelineDot.className = 'nav-dot';
        timelineDot.setAttribute('data-section', 'timeline');
        timelineDot.setAttribute('aria-label', 'Navigate to Timeline section');
        
        const dotInner = document.createElement('span');
        dotInner.className = 'dot-inner';
        
        timelineDot.appendChild(dotInner);
        
        // Insert before contact dot
        const contactDot = document.querySelector('.nav-dot[data-section="contact"]');
        if (contactDot) {
            navDots.insertBefore(timelineDot, contactDot);
        } else {
            navDots.appendChild(timelineDot);
        }
        
        // Add click event
        timelineDot.addEventListener('click', () => {
            const section = document.querySelector('[data-section="timeline"]');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Initialize scroll animation for timeline items
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Highlight corresponding point
                const index = entry.target.getAttribute('data-index');
                document.querySelectorAll('.timeline-point').forEach(point => {
                    if (point.getAttribute('data-index') === index) {
                        point.classList.add('active');
                    } else {
                        point.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });
}

// Call this function from the main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add to existing initialization
    setTimeout(() => {
        initializeTimelineSection();
    }, 2000);
});

// Call immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeTimelineSection();
}
