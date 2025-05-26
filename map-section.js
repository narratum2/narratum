/**
 * Map Section Implementation with Location Dots
 * Adds interactive map with dots for Los Angeles, New York, Mexico City, Rio de Janeiro, Switzerland, Berlin, and Hong Kong
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    const mapSection = document.getElementById('map-section');
    if (!mapSection) return;
    
    // Create map container if it doesn't exist
    let mapContainer = mapSection.querySelector('.map-container');
    if (!mapContainer) {
        mapContainer = document.createElement('div');
        mapContainer.className = 'map-container';
        mapSection.appendChild(mapContainer);
    }
    
    // Clear existing content
    mapContainer.innerHTML = '';
    
    // Add world map SVG background
    const mapSvg = document.createElement('div');
    mapSvg.className = 'world-map-svg';
    mapContainer.appendChild(mapSvg);
    
    // Define locations with coordinates (approximate x,y percentages on the map)
    const locations = [
        { name: 'Los Angeles', x: 15, y: 38, description: 'West Coast Innovation Hub' },
        { name: 'New York', x: 23, y: 35, description: 'East Coast Strategic Center' },
        { name: 'Mexico City', x: 20, y: 45, description: 'Latin American Gateway' },
        { name: 'Rio de Janeiro', x: 32, y: 60, description: 'South American Operations' },
        { name: 'Switzerland', x: 48, y: 32, description: 'European Headquarters' },
        { name: 'Berlin', x: 50, y: 28, description: 'Technology & Design Studio' },
        { name: 'Hong Kong', x: 78, y: 42, description: 'Asian Pacific Center' }
    ];
    
    // Create location dots
    locations.forEach(location => {
        createLocationDot(mapContainer, location);
    });
    
    // Add map title and description
    const mapTitle = document.createElement('h2');
    mapTitle.className = 'map-title';
    mapTitle.textContent = 'Global Presence';
    mapSection.insertBefore(mapTitle, mapContainer);
    
    const mapDescription = document.createElement('p');
    mapDescription.className = 'map-description';
    mapDescription.textContent = 'Strategic locations connecting our global network of expertise and innovation.';
    mapSection.insertBefore(mapDescription, mapContainer);
    
    // Add connection lines between dots
    createConnectionLines(mapContainer, locations);
    
    // Add subtle animation to the map
    animateMap();
}

function createLocationDot(container, location) {
    const dot = document.createElement('div');
    dot.className = 'location-dot';
    dot.style.left = `${location.x}%`;
    dot.style.top = `${location.y}%`;
    
    // Create pulse effect
    const pulse = document.createElement('div');
    pulse.className = 'pulse-effect';
    dot.appendChild(pulse);
    
    // Create location label
    const label = document.createElement('div');
    label.className = 'location-label';
    label.textContent = location.name;
    dot.appendChild(label);
    
    // Create location description
    const description = document.createElement('div');
    description.className = 'location-description';
    description.textContent = location.description;
    dot.appendChild(description);
    
    // Add hover and click interactions
    dot.addEventListener('mouseenter', function() {
        this.classList.add('active');
    });
    
    dot.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });
    
    dot.addEventListener('click', function() {
        // Toggle expanded state
        this.classList.toggle('expanded');
        
        // Close other expanded dots
        document.querySelectorAll('.location-dot.expanded').forEach(expandedDot => {
            if (expandedDot !== this) {
                expandedDot.classList.remove('expanded');
            }
        });
        
        // Create particle effect if becoming expanded
        if (this.classList.contains('expanded')) {
            createMapParticleEffect(this);
        }
    });
    
    container.appendChild(dot);
    
    // Add delay to stagger appearance
    setTimeout(() => {
        dot.classList.add('visible');
    }, 300 + Math.random() * 1000);
}

function createConnectionLines(container, locations) {
    // Create SVG element for lines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'connection-lines');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    container.appendChild(svg);
    
    // Connect major hubs
    const connections = [
        [0, 1], // LA to NY
        [1, 4], // NY to Switzerland
        [4, 5], // Switzerland to Berlin
        [4, 6], // Switzerland to Hong Kong
        [0, 2], // LA to Mexico City
        [2, 3], // Mexico City to Rio
        [1, 3]  // NY to Rio
    ];
    
    connections.forEach(([fromIdx, toIdx]) => {
        const from = locations[fromIdx];
        const to = locations[toIdx];
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Create a curved path between points
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const curve = Math.min(Math.abs(dx) * 0.5, 20); // Control curve amount
        
        // Define curved path
        const path = `M ${from.x} ${from.y} Q ${from.x + dx/2} ${from.y - curve} ${to.x} ${to.y}`;
        
        line.setAttribute('d', path);
        line.setAttribute('class', 'connection-line');
        line.setAttribute('data-from', fromIdx);
        line.setAttribute('data-to', toIdx);
        
        svg.appendChild(line);
        
        // Animate line drawing
        const length = line.getTotalLength();
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
        
        setTimeout(() => {
            line.style.transition = 'stroke-dashoffset 2s ease-in-out';
            line.style.strokeDashoffset = '0';
        }, 1000 + Math.random() * 1000);
    });
}

function animateMap() {
    // Add subtle floating animation to dots
    document.querySelectorAll('.location-dot').forEach(dot => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 3 + Math.random() * 2;
        
        dot.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
    });
    
    // Add subtle pulse to connection lines
    document.querySelectorAll('.connection-line').forEach(line => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 4 + Math.random() * 3;
        
        line.style.animation = `pulseLine ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
    });
}

function createMapParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'map-particle';
        
        // Random size
        const size = 2 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at center of element
        particle.style.position = 'fixed';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        particle.style.backgroundColor = 'rgba(255, 215, 0, 0.8)'; // Gold color
        particle.style.borderRadius = '50%';
        particle.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        particle.style.opacity = '0';
        
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 40;
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

// Add CSS styles for map
function addMapStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .map-container {
            position: relative;
            width: 100%;
            height: 60vh;
            min-height: 400px;
            margin: 2rem auto;
            background-color: rgba(10, 20, 30, 0.3);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .world-map-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMzBDMTAgMzAgMjAgMjAgMzAgMjBDNDAgMjAgNDUgMzAgNTUgMzBDNjUgMzAgNzAgMjAgODAgMjBDOTAgMjAgOTAgMzAgOTAgMzBDOTAgMzAgODUgNDAgNzUgNDBDNjUgNDAgNjAgMzAgNTAgMzBDNDAgMzAgMzUgNDAgMjUgNDBDMTUgNDAgMTAgMzAgMTAgMzBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMTAgNTBDMTAgNTAgMjAgNDAgMzAgNDBDNDAgNDAgNDUgNTAgNTUgNTBDNjUgNTAgNzAgNDAgODAgNDBDOTAgNDAgOTAgNTAgOTAgNTBDOTAgNTAgODUgNjAgNzUgNjBDNjUgNjAgNjAgNTAgNTAgNTBDNDAgNTAgMzUgNjAgMjUgNjBDMTUgNjAgMTAgNTAgMTAgNTBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMTAgNzBDMTAgNzAgMjAgNjAgMzAgNjBDNDAgNjAgNDUgNzAgNTUgNzBDNjUgNzAgNzAgNjAgODAgNjBDOTAgNjAgOTAgNzAgOTAgNzBDOTAgNzAgODUgODAgNzUgODBDNjUgODAgNjAgNzAgNTAgNzBDNDAgNzAgMzUgODAgMjUgODBDMTUgODAgMTAgNzAgMTAgNzBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=');
            background-size: cover;
            background-position: center;
            opacity: 0.2;
        }
        
        .map-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .map-description {
            text-align: center;
            max-width: 600px;
            margin: 0 auto 3rem;
            font-size: 1.2rem;
            opacity: 0.8;
        }
        
        .location-dot {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: rgba(255, 215, 0, 0.8); /* Gold color */
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            z-index: 10;
        }
        
        .location-dot.visible {
            transform: translate(-50%, -50%) scale(1);
        }
        
        .pulse-effect {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: rgba(255, 215, 0, 0.4);
            transform: translate(-50%, -50%) scale(1);
            animation: pulse 2s infinite;
        }
        
        .location-label {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .location-description {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 0.7rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .location-dot.active .location-label,
        .location-dot.expanded .location-label {
            opacity: 1;
        }
        
        .location-dot.expanded .location-description {
            opacity: 1;
        }
        
        .location-dot.active {
            transform: translate(-50%, -50%) scale(1.5);
            z-index: 20;
        }
        
        .location-dot.expanded {
            transform: translate(-50%, -50%) scale(2);
            z-index: 30;
            background-color: rgba(255, 215, 0, 1);
        }
        
        .connection-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            pointer-events: none;
        }
        
        .connection-line {
            fill: none;
            stroke: rgba(255, 215, 0, 0.2);
            stroke-width: 1px;
        }
        
        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.4;
            }
            70% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
            100% {
                transform: translate(-50%, -50%) scale(2.5);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0% {
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1.1) translateY(-5px);
            }
        }
        
        @keyframes pulseLine {
            0% {
                stroke-opacity: 0.2;
            }
            100% {
                stroke-opacity: 0.5;
            }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .map-container {
                height: 50vh;
                min-height: 300px;
            }
            
            .map-title {
                font-size: 2rem;
            }
            
            .map-description {
                font-size: 1rem;
                margin-bottom: 2rem;
            }
            
            .location-dot {
                width: 10px;
                height: 10px;
            }
            
            .location-label {
                font-size: 0.7rem;
            }
            
            .location-description {
                font-size: 0.6rem;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
}

// Initialize map styles
addMapStyles();

// Execute immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeMap();
}
