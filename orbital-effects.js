/**
 * Orbital Effects and Advanced Animations for Narratum
 */

// Initialize Orbital Artifacts - Creates orbital circles with moving dots
function initializeOrbitalArtifacts() {
    const container = document.querySelector('.app-container');
    const orbitalCount = 5;
    
    for (let i = 0; i < orbitalCount; i++) {
        createOrbitalArtifact();
    }
    
    function createOrbitalArtifact() {
        const orbital = document.createElement('div');
        orbital.classList.add('orbital-artifact');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        orbital.style.left = `${x}px`;
        orbital.style.top = `${y}px`;
        
        // Create rings
        const ringCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < ringCount; i++) {
            const ring = document.createElement('div');
            ring.classList.add('orbital-ring');
            ring.style.transform = `scale(${0.6 + (i * 0.2)})`;
            orbital.appendChild(ring);
            
            // Add dots to ring
            const dotCount = Math.floor(Math.random() * 2) + 1;
            for (let j = 0; j < dotCount; j++) {
                const dot = document.createElement('div');
                dot.classList.add('orbital-dot');
                
                // Randomize color
                dot.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
                
                // Randomize animation duration
                const duration = 10 + (Math.random() * 20);
                dot.style.animationDuration = `${duration}s`;
                
                // Randomize starting position
                const startAngle = Math.random() * 360;
                dot.style.transform = `translateX(-50%) rotate(${startAngle}deg) translateY(-100px)`;
                
                ring.appendChild(dot);
            }
        }
        
        container.appendChild(orbital);
    }
}

// Enhanced Star Connections - Creates connecting lines between stars and symbols
function enhanceStarConnections() {
    // Create additional stars
    const container = document.querySelector('.app-container');
    const starCount = 20;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Random color
        star.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        
        // Random size
        const size = 2 + (Math.random() * 3);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity
        star.style.opacity = 0.3 + (Math.random() * 0.7);
        
        container.appendChild(star);
    }
    
    // Create symbol points around the NARRATUM text
    setTimeout(() => {
        const title = document.querySelector('.site-title');
        if (title) {
            const titleRect = title.getBoundingClientRect();
            
            // Create points around the title
            createSymbolPoint(titleRect.left + titleRect.width * 0.2, titleRect.top - 20, 'var(--accent-gold)');
            createSymbolPoint(titleRect.right - titleRect.width * 0.2, titleRect.top + 30, 'var(--accent-gold)');
            createSymbolPoint(titleRect.left + titleRect.width * 0.5, titleRect.bottom + 20, 'var(--accent-cyan)');
            createSymbolPoint(titleRect.left - 30, titleRect.top + titleRect.height * 0.5, 'var(--accent-cyan)');
            createSymbolPoint(titleRect.right + 30, titleRect.top + titleRect.height * 0.5, 'var(--accent-gold)');
        }
        
        // Create connections between points
        const points = document.querySelectorAll('.symbol-point');
        const stars = document.querySelectorAll('.star');
        
        points.forEach(point => {
            const pointRect = point.getBoundingClientRect();
            const pointX = pointRect.left + pointRect.width / 2;
            const pointY = pointRect.top + pointRect.height / 2;
            
            // Connect to nearby stars
            stars.forEach(star => {
                const starRect = star.getBoundingClientRect();
                const starX = starRect.left + starRect.width / 2;
                const starY = starRect.top + starRect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(starX - pointX, 2) + 
                    Math.pow(starY - pointY, 2)
                );
                
                if (distance < 200) {
                    createConnection(
                        {x: pointX, y: pointY}, 
                        {x: starX, y: starY}
                    );
                }
            });
        });
    }, 1000);
    
    function createSymbolPoint(x, y, color) {
        const point = document.createElement('div');
        point.classList.add('symbol-point');
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        point.style.backgroundColor = color;
        container.appendChild(point);
    }
    
    function createConnection(point1, point2) {
        const connection = document.createElement('div');
        connection.classList.add('star-connection');
        container.appendChild(connection);
        
        // Calculate distance and angle
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Position and rotate the connection
        connection.style.width = `${distance}px`;
        connection.style.left = `${point1.x}px`;
        connection.style.top = `${point1.y}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        // Animate the connection
        setTimeout(() => {
            connection.style.opacity = '0.6';
        }, 500);
    }
}

// Initialize Polygon Animations
function initializePolygonAnimations() {
    const container = document.querySelector('.app-container');
    
    // Create polygon container
    const polygonContainer = document.createElement('div');
    polygonContainer.classList.add('polygon-container');
    container.appendChild(polygonContainer);
    
    // Create polygons
    for (let i = 0; i < 3; i++) {
        createPolygon();
    }
    
    function createPolygon() {
        const polygon = document.createElement('div');
        polygon.classList.add('polygon');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        polygon.style.left = `${x}px`;
        polygon.style.top = `${y}px`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        polygon.style.transform = `rotate(${rotation}deg)`;
        
        // Random size
        const size = 50 + (Math.random() * 100);
        polygon.style.width = `${size}px`;
        polygon.style.height = `${size}px`;
        
        // Random color
        polygon.style.borderColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        
        polygonContainer.appendChild(polygon);
    }
}

// Initialize all advanced effects
function initializeAdvancedEffects() {
    initializeOrbitalArtifacts();
    enhanceStarConnections();
    initializePolygonAnimations();
    
    // Add scroll event listener for animation triggers
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Trigger animations based on scroll position
        const connections = document.querySelectorAll('.star-connection');
        connections.forEach(connection => {
            if (scrollPosition > viewportHeight * 0.1) {
                connection.style.opacity = '0.8';
            } else {
                connection.style.opacity = '0';
            }
        });
        
        // Make symbol points more visible on scroll
        const symbolPoints = document.querySelectorAll('.symbol-point');
        symbolPoints.forEach(point => {
            if (scrollPosition > viewportHeight * 0.1) {
                point.style.opacity = '0.8';
            } else {
                point.style.opacity = '0.3';
            }
        });
    });
}

// Call this function to initialize all advanced effects
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeAdvancedEffects, 1000);
});
