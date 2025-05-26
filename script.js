/**
 * Narratum.io - Enhanced Interactive JavaScript
 * Features interactive background, symbol interactions, and sound elements
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeLoader();
    initializeSignalParticles();
    initializeStarConnections();
    initializeOrbitalArtifacts();
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        initializeNavigation();
        initializeObservers();
        initializeParallax();
        initializeSymbolInteractions();
        initializeFormHandling();
        initializeAudioToggle();
        initializeColorMoodSwitcher();
        initializeInteractiveBackground();
        initializeLoyaltyJourney();
    }, 1000);
}

// Loading Screen
function initializeLoader() {
    const loader = document.querySelector('.loading-screen');
    
    if (loader) {
        // Force hide loader after a short delay
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Navigation Dots
function initializeNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Click event for navigation dots
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.getAttribute('data-section');
            const section = document.querySelector(`[data-section="${targetSection}"]`);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Immediately make navigation dots visible
    const navDotsContainer = document.querySelector('.nav-dots');
    if (navDotsContainer) {
        setTimeout(() => {
            navDotsContainer.classList.add('visible');
        }, 1000);
    }
    
    // Scroll event to update active dot
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('data-section');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    });
}

// Star Connections - Creates connecting lines between stars and symbols
function initializeStarConnections() {
    const container = document.querySelector('.app-container');
    const stars = [];
    const connections = [];
    const symbolPoints = [];
    
    // Create stars
    for (let i = 0; i < 15; i++) {
        createStar();
    }
    
    // Define symbol points (around the NARRATUM text and tagline)
    setTimeout(() => {
        // Get the position of the title
        const title = document.querySelector('.site-title');
        const tagline = document.querySelector('.site-tagline');
        
        if (title && tagline) {
            const titleRect = title.getBoundingClientRect();
            const taglineRect = tagline.getBoundingClientRect();
            
            // Add points around the title
            symbolPoints.push({
                x: titleRect.left + titleRect.width * 0.2,
                y: titleRect.top + titleRect.height * 0.5,
                color: 'var(--accent-gold)'
            });
            
            symbolPoints.push({
                x: titleRect.right - titleRect.width * 0.2,
                y: titleRect.top + titleRect.height * 0.3,
                color: 'var(--accent-gold)'
            });
            
            symbolPoints.push({
                x: titleRect.left + titleRect.width * 0.5,
                y: titleRect.bottom + 20,
                color: 'var(--accent-cyan)'
            });
            
            // Add points around the tagline
            symbolPoints.push({
                x: taglineRect.left + taglineRect.width * 0.3,
                y: taglineRect.top + taglineRect.height * 0.5,
                color: 'var(--accent-cyan)'
            });
            
            symbolPoints.push({
                x: taglineRect.right - taglineRect.width * 0.2,
                y: taglineRect.bottom + 10,
                color: 'var(--accent-gold)'
            });
            
            // Create symbol points
            symbolPoints.forEach(point => {
                const symbolPoint = document.createElement('div');
                symbolPoint.classList.add('symbol-point');
                symbolPoint.style.left = `${point.x}px`;
                symbolPoint.style.top = `${point.y}px`;
                symbolPoint.style.backgroundColor = point.color;
                container.appendChild(symbolPoint);
                
                // Create connections to nearby stars
                stars.forEach(star => {
                    const distance = Math.sqrt(
                        Math.pow(star.x - point.x, 2) + 
                        Math.pow(star.y - point.y, 2)
                    );
                    
                    if (distance < 300) {
                        createConnection(star, point);
                    }
                });
            });
        }
    }, 2000);
    
    // Update connections on scroll
    window.addEventListener('scroll', updateConnections);
    
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        
        container.appendChild(star);
        stars.push({ element: star, x, y });
    }
    
    function createConnection(point1, point2) {
        const connection = document.createElement('div');
        connection.classList.add('star-connection');
        container.appendChild(connection);
        
        const connectionData = {
            element: connection,
            point1, point2,
            active: false,
            opacity: 0
        };
        
        connections.push(connectionData);
        updateConnection(connectionData);
    }
    
    function updateConnections() {
        connections.forEach(connection => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            // Activate connections when scrolling down
            if (scrollPosition > viewportHeight * 0.1 && scrollPosition < viewportHeight * 0.8) {
                connection.active = true;
                connection.opacity = Math.min(1, connection.opacity + 0.05);
            } else {
                connection.opacity = Math.max(0, connection.opacity - 0.05);
                if (connection.opacity <= 0) {
                    connection.active = false;
                }
            }
            
            connection.element.style.opacity = connection.opacity;
            updateConnection(connection);
        });
    }
    
    function updateConnection(connection) {
        const { element, point1, point2 } = connection;
        
        // Calculate distance and angle
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Position and rotate the connection
        element.style.width = `${distance}px`;
        element.style.left = `${point1.x}px`;
        element.style.top = `${point1.y}px`;
        element.style.transform = `rotate(${angle}deg)`;
    }
}

// Orbital Artifacts - Creates orbital circles with moving dots
function initializeOrbitalArtifacts() {
    const container = document.querySelector('.app-container');
    
    // Create orbital artifacts
    for (let i = 0; i < 3; i++) {
        createOrbitalArtifact();
    }
    
    function createOrbitalArtifact() {
        const orbital = document.createElement('div');
        orbital.classList.add('orbital-artifact');
        
        // Random position and size
        const size = 150 + Math.random() * 300;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        orbital.style.width = `${size}px`;
        orbital.style.height = `${size}px`;
        orbital.style.left = `${x}px`;
        orbital.style.top = `${y}px`;
        
        // Create orbital ring
        const ring = document.createElement('div');
        ring.classList.add('orbital-ring');
        orbital.appendChild(ring);
        
        // Create moving dot
        const dot = document.createElement('div');
        dot.classList.add('orbital-dot');
        dot.style.animationDuration = `${10 + Math.random() * 20}s`;
        orbital.appendChild(dot);
        
        container.appendChild(orbital);
    }
}

// Intersection Observer for Animations
function initializeObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Observer for capability blocks
    const capabilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                // Add staggered animation delay
                const index = entry.target.getAttribute('data-index');
                entry.target.style.transitionDelay = `${(index - 1) * 0.2}s`;
            }
        });
    }, observerOptions);
    
    const capabilityBlocks = document.querySelectorAll('.capability-block');
    capabilityBlocks.forEach(block => {
        capabilityObserver.observe(block);
    });
    
    // Observer for journey nodes
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                // Add staggered animation delay
                const index = entry.target.getAttribute('data-node');
                entry.target.style.transitionDelay = `${(index - 1) * 0.3}s`;
            }
        });
    }, observerOptions);
    
    const journeyNodes = document.querySelectorAll('.journey-node');
    journeyNodes.forEach(node => {
        journeyObserver.observe(node);
    });
}

// Parallax Effect
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroArc = heroSection.querySelector('.section-arc');
            if (heroArc) {
                heroArc.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }
        
        // Parallax for other section arcs
        const sectionArcs = document.querySelectorAll('.section-arc:not(.hero .section-arc)');
        sectionArcs.forEach(arc => {
            const section = arc.closest('.section');
            const sectionTop = section.offsetTop;
            const distanceFromTop = scrollY - sectionTop;
            
            if (arc.classList.contains('top')) {
                arc.style.transform = `translateY(${distanceFromTop * 0.2}px)`;
            } else if (arc.classList.contains('bottom')) {
                arc.style.transform = `translateY(${distanceFromTop * 0.1}px)`;
            }
        });
    });
}

// Symbol Interactions
function initializeSymbolInteractions() {
    const symbols = document.querySelectorAll('.symbol-item');
    
    symbols.forEach(symbol => {
        symbol.addEventListener('click', function() {
            // Toggle active state
            const wasActive = this.classList.contains('active');
            
            // Close all other symbols
            symbols.forEach(s => s.classList.remove('active'));
            
            // Toggle current symbol
            if (!wasActive) {
                this.classList.add('active');
                
                // Add magical particle effect
                createMagicalParticles(this);
            }
        });
    });
    
    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.symbol-item')) {
            symbols.forEach(s => s.classList.remove('active'));
        }
    });
}

// Create magical particles for symbol interaction
function createMagicalParticles(symbolElement) {
    const rect = symbolElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magical-particle');
        
        // Random position around the symbol
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Set particle properties
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.4;
        
        // Add to DOM
        document.body.appendChild(particle);
        
        // Animate and remove
        setTimeout(() => {
            particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(particle);
            }, 1000);
        }, 10);
    }
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="button-text">Sending...</span>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="success-icon">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3>Message Sent</h3>
                        <p>Thank you for reaching out. We'll be in touch soon.</p>
                    </div>
                `;
            }, 1500);
        });
    }
}

// Audio Toggle with Enhanced Sound
function initializeAudioToggle() {
    const audioToggle = document.querySelector('.audio-toggle');
    let audioContext;
    let masterGain;
    let oscillators = [];
    
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            const currentState = audioToggle.getAttribute('data-state');
            
            if (currentState === 'inactive') {
                // Initialize audio context if not already created
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    masterGain = audioContext.createGain();
                    masterGain.gain.value = 0;
                    masterGain.connect(audioContext.destination);
                    
                    // Create ambient sound
                    createAmbientSound();
                }
                
                // Fade in
                masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                masterGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 2);
                
                audioToggle.setAttribute('data-state', 'active');
            } else {
                // Fade out
                if (audioContext && masterGain) {
                    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                    masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
                }
                
                audioToggle.setAttribute('data-state', 'inactive');
            }
        });
    }
    
    function createAmbientSound() {
        // Base frequencies for a calming ambient sound
        const frequencies = [
            55, // A1
            110, // A2
            220, // A3
            330, // E4
            440, // A4
        ];
        
        // Create oscillators for each frequency
        frequencies.forEach(freq => {
            // Main oscillator
            const osc = audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            // Individual gain for this oscillator
            const gain = audioContext.createGain();
            gain.gain.value = 0.1 + Math.random() * 0.1;
            
            // Connect oscillator to its gain node
            osc.connect(gain);
            
            // Connect gain to master gain
            gain.connect(masterGain);
            
            // Start oscillator
            osc.start();
            
            // Store oscillator for later reference
            oscillators.push(osc);
            
            // Modulate the frequency slightly over time for organic feel
            setInterval(() => {
                const now = audioContext.currentTime;
                osc.frequency.setValueAtTime(osc.frequency.value, now);
                osc.frequency.linearRampToValueAtTime(
                    freq * (0.99 + Math.random() * 0.02), 
                    now + 2 + Math.random() * 3
                );
            }, 5000);
        });
        
        // Add subtle noise for texture
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        
        const noiseGain = audioContext.createGain();
        noiseGain.gain.value = 0.01;
        
        noise.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start();
    }
}

// Signal Particles Background
function initializeSignalParticles() {
    const container = document.querySelector('.signal-particles');
    
    if (container) {
        // Create initial particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
        
        // Continue creating particles at intervals
        setInterval(createParticle, 2000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('signal-particle');
        
        // Random position, size, and duration
        const size = 1 + Math.random() * 3;
        const posX = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add to container
        container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            container.removeChild(particle);
        }, duration * 1000);
    }
}

// Color Mood Switcher
function initializeColorMoodSwitcher() {
    const moodDots = document.querySelectorAll('.mood-dot');
    const root = document.documentElement;
    
    moodDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const mood = dot.getAttribute('data-mood');
            
            // Remove active class from all dots
            moodDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Apply color scheme based on mood
            switch (mood) {
                case 'default':
                    root.style.setProperty('--bg-primary', '#0a1520');
                    root.style.setProperty('--bg-secondary', '#0d1825');
                    root.style.setProperty('--accent-gold', '#fbbf24');
                    root.style.setProperty('--accent-cyan', '#7dd3fc');
                    break;
                case 'teal':
                    root.style.setProperty('--bg-primary', '#0a2025');
                    root.style.setProperty('--bg-secondary', '#0d2530');
                    root.style.setProperty('--accent-gold', '#2dd4bf');
                    root.style.setProperty('--accent-cyan', '#06b6d4');
                    break;
                case 'purple':
                    root.style.setProperty('--bg-primary', '#1a0a25');
                    root.style.setProperty('--bg-secondary', '#250d30');
                    root.style.setProperty('--accent-gold', '#a78bfa');
                    root.style.setProperty('--accent-cyan', '#8b5cf6');
                    break;
                case 'gold':
                    root.style.setProperty('--bg-primary', '#251a0a');
                    root.style.setProperty('--bg-secondary', '#302510');
                    root.style.setProperty('--accent-gold', '#f59e0b');
                    root.style.setProperty('--accent-cyan', '#fbbf24');
                    break;
            }
        });
    });
}

// Interactive Background with Cursor Tracking
function initializeInteractiveBackground() {
    const container = document.querySelector('.app-container');
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update orbital artifacts position slightly based on mouse
        const orbitals = document.querySelectorAll('.orbital-artifact');
        orbitals.forEach(orbital => {
            const rect = orbital.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.02;
            const deltaY = (mouseY - centerY) * 0.02;
            
            orbital.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    });
}

// Loyalty Journey Visualization
function initializeLoyaltyJourney() {
    const journeyContainer = document.querySelector('.loyalty-journey');
    
    if (journeyContainer) {
        const nodes = journeyContainer.querySelectorAll('.journey-node');
        
        // Create connecting lines between nodes
        for (let i = 0; i < nodes.length - 1; i++) {
            const node1 = nodes[i];
            const node2 = nodes[i + 1];
            
            createJourneyConnection(node1, node2);
        }
        
        // Create a connection from last to first for circular journey
        if (nodes.length > 2) {
            createJourneyConnection(nodes[nodes.length - 1], nodes[0]);
        }
    }
    
    function createJourneyConnection(node1, node2) {
        const connection = document.createElement('div');
        connection.classList.add('journey-connection');
        
        // Position connection
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        connection.style.width = `${length}px`;
        connection.style.left = `${x1}px`;
        connection.style.top = `${y1}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        document.body.appendChild(connection);
    }
}    // Fade in and out
    setTimeout(() => {
        overlay.style.opacity = '1';
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500);
        }, 300);
    }, 10);
}

// Interactive Background with Cursor Response
function initializeInteractiveBackground() {
    const container = document.querySelector('.app-container');
    const stars = [];
    const maxStars = 50;
    
    // Create initial stars
    for (let i = 0; i < maxStars; i++) {
        createStar();
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Affect stars based on mouse position
        stars.forEach(star => {
            const rect = star.getBoundingClientRect();
            const starX = rect.left + rect.width / 2;
            const starY = rect.top + rect.height / 2;
            
            // Calculate distance
            const dx = mouseX - starX;
            const dy = mouseY - starY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only affect stars within a certain radius
            if (distance < 200) {
                // Calculate movement based on inverse distance
                const factor = 1 - distance / 200;
                const moveX = dx * factor * 0.1;
                const moveY = dy * factor * 0.1;
                
                // Apply movement with transition
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
                star.style.opacity = 0.5 + factor * 0.5;
            } else {
                // Reset position
                star.style.transform = 'translate(0, 0)';
                star.style.opacity = '';
            }
        });
    });
    
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('interactive-star');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random size
        const size = 1 + Math.random() * 2;
        
        // Set properties
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = 0.1 + Math.random() * 0.5;
        
        // Add to container and store reference
        container.appendChild(star);
        stars.push(star);
    }
}

// Initialize Loyalty Journey
function initializeLoyaltyJourney() {
    const journeyNodes = document.querySelectorAll('.journey-node');
    
    journeyNodes.forEach(node => {
        // Add hover effect
        node.addEventListener('mouseenter', () => {
            const nodeIcon = node.querySelector('.node-icon');
            if (nodeIcon) {
                nodeIcon.style.transform = 'scale(1.1)';
                nodeIcon.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.2)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            const nodeIcon = node.querySelector('.node-icon');
            if (nodeIcon) {
                nodeIcon.style.transform = '';
                nodeIcon.style.boxShadow = '';
            }
        });
    });
}
