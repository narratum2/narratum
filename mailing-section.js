/**
 * Mailing List Section Implementation
 * Creates a sleek mailing list section inspired by Apeiron
 */

// Initialize Mailing List Section
function initializeMailingSection() {
    // Check if mailing section already exists
    if (document.querySelector('.mailing-section')) return;
    
    // Create mailing section before the footer
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const mailingSection = document.createElement('section');
    mailingSection.className = 'mailing-section';
    
    mailingSection.innerHTML = `
        <div class="mailing-container">
            <h2 class="mailing-title">GET REGULAR UPDATES BY</h2>
            <h2 class="mailing-title">JOINING OUR MAILING LIST.</h2>
            
            <form class="mailing-form">
                <input type="text" class="mailing-input" placeholder="Name" required>
                <input type="email" class="mailing-input" placeholder="Email" required>
                <button type="submit" class="mailing-submit">Submit</button>
            </form>
            
            <div class="mailing-logo">
                <h1 class="site-title" style="font-size: 64px; margin-top: 60px;">NARRATUM</h1>
            </div>
            
            <div class="mailing-footer">
                <p>© 2024 Narratum Ltd. All Rights Reserved</p>
                <p>
                    <a href="#">Privacy Policy</a> | 
                    <a href="#">Terms & Conditions</a> | 
                    <a href="mailto:connect@narratum.io">connect@narratum.io</a>
                </p>
            </div>
        </div>
        <div class="mailing-background"></div>
    `;
    
    // Insert before footer
    footer.parentNode.insertBefore(mailingSection, footer);
    
    // Add event listener for form submission
    const form = mailingSection.querySelector('.mailing-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const formContainer = form.parentNode;
            form.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.style.margin = '40px 0';
            successMessage.innerHTML = `
                <h3 style="font-size: 24px; margin-bottom: 16px;">Thank you for subscribing!</h3>
                <p>You'll receive our updates soon.</p>
            `;
            
            formContainer.insertBefore(successMessage, form.nextSibling);
        });
    }
    
    // Add CSS file if not already added
    if (!document.querySelector('link[href="mailing-section.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'mailing-section.css';
        document.head.appendChild(link);
    }
}

// Update Infrastructure Section with new copy
function updateInfrastructureSection() {
    const infrastructureSection = document.querySelector('.infrastructure');
    if (!infrastructureSection) return;
    
    const contentContainer = infrastructureSection.querySelector('.content-container');
    if (!contentContainer) return;
    
    // Update title and content
    contentContainer.innerHTML = `
        <h2 class="section-title">Infrastructure, Not Service</h2>
        <div class="prose">
            <p class="lead">We build systems that transform how organizations connect with their communities to build <span style="color: var(--accent-gold);">loyalty</span>.</p>
            <p>Our approach is rooted in the understanding that meaningful connections require more than just service delivery—they demand strategic infrastructure that can adapt, evolve, and create lasting value.</p>
            <p>By focusing on the underlying systems rather than surface-level interactions, we help organizations build sustainable relationships that withstand market fluctuations and changing consumer behaviors.</p>
        </div>
    `;
}

// Update Loyalty Section with new copy
function updateLoyaltySection() {
    const loyaltySection = document.querySelector('.loyalty');
    if (!loyaltySection) return;
    
    const contentContainer = loyaltySection.querySelector('.content-container');
    if (!contentContainer) return;
    
    // Update title and intro content
    const titleElement = contentContainer.querySelector('.section-title');
    if (titleElement) {
        titleElement.textContent = 'Loyalty Systems';
    }
    
    const subtitleElement = contentContainer.querySelector('.section-subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = 'Building lasting relationships through strategic engagement.';
    }
    
    const proseElement = contentContainer.querySelector('.prose');
    if (proseElement) {
        proseElement.innerHTML = `
            <p class="lead">We specialize in building comprehensive loyalty systems that connect data analytics, team building, hospitality technology, and API integration into a seamless ecosystem.</p>
        `;
    }
    
    // Update journey nodes with new content
    const journeyNodes = contentContainer.querySelectorAll('.journey-node');
    if (journeyNodes.length >= 4) {
        // Data Analytics
        const dataAnalyticsNode = journeyNodes[0];
        if (dataAnalyticsNode) {
            const nodeContent = dataAnalyticsNode.querySelector('.node-content');
            if (nodeContent) {
                nodeContent.innerHTML = `
                    <h3>Data Analytics Integration</h3>
                    <p>We transform raw data into actionable insights, helping organizations understand community behaviors, preferences, and engagement patterns.</p>
                `;
            }
        }
        
        // Team Building
        const teamBuildingNode = journeyNodes[1];
        if (teamBuildingNode) {
            const nodeContent = teamBuildingNode.querySelector('.node-content');
            if (nodeContent) {
                nodeContent.innerHTML = `
                    <h3>Team Building & Alignment</h3>
                    <p>We develop frameworks that align team capabilities with organizational goals, creating cultures of innovation and community-centered thinking.</p>
                `;
            }
        }
        
        // Hospitality Technology
        const hospitalityTechNode = journeyNodes[2];
        if (hospitalityTechNode) {
            const nodeContent = hospitalityTechNode.querySelector('.node-content');
            if (nodeContent) {
                nodeContent.innerHTML = `
                    <h3>Hospitality Technology</h3>
                    <p>We integrate cutting-edge technology solutions that enhance the human elements of hospitality, creating seamless experiences that feel personal and meaningful.</p>
                `;
            }
        }
        
        // AI & API Integration
        const apiIntegrationNode = journeyNodes[3];
        if (apiIntegrationNode) {
            const nodeContent = apiIntegrationNode.querySelector('.node-content');
            if (nodeContent) {
                nodeContent.innerHTML = `
                    <h3>AI & API Integration</h3>
                    <p>We leverage artificial intelligence and seamless API connections to create adaptive systems that evolve with changing community needs and organizational capabilities.</p>
                `;
            }
        }
    }
    
    // Update conclusion if it exists
    const conclusionElement = contentContainer.querySelector('.loyalty-conclusion');
    if (conclusionElement) {
        conclusionElement.innerHTML = `
            <p>From cultural institutions seeking deeper patron relationships to corporate environments building internal culture, our loyalty systems become the invisible infrastructure that turns visitors into members, customers into advocates, and employees into ambassadors.</p>
        `;
    }
}

// Call this function from the main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add to existing initialization
    setTimeout(() => {
        initializeMailingSection();
        updateInfrastructureSection();
        updateLoyaltySection();
    }, 2000);
});

// Call immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeMailingSection();
    updateInfrastructureSection();
    updateLoyaltySection();
}
