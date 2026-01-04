// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    initMobileNav();
    
    // Smooth Scrolling for Navigation Links
    initSmoothScroll();
    
    // Intersection Observer for Animations
    initScrollAnimations();
    
    // Active Navigation Link Highlighting
    initActiveNavLinks();
    
    // Dynamic Year Update
    updateCopyrightYear();
    
    // Add scroll effects to navbar
    initNavbarScroll();
});

/**
 * Initialize mobile navigation toggle
 */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.aircraft-card, .training-item, .certificate-item, ' +
        '.timeline-item, .education-item, .affiliation-card, .contact-item'
    );

    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(el);
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call once on load
}

/**
 * Update copyright year dynamically
 */
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.footer p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('©')) {
            element.textContent = element.textContent.replace(/© \d{4}/, `© ${currentYear}`);
        }
    });
}

/**
 * Add scroll effects to navbar
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Add animation to flight hours table rows
 */
function animateFlightHoursTable() {
    const tableRows = document.querySelectorAll('.flight-hours-table tbody tr');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    tableRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(row);
    });
}

// Initialize table animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateFlightHoursTable);
} else {
    animateFlightHoursTable();
}

/**
 * Add parallax effect to hero section
 */
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

initParallaxEffect();

/**
 * Add hover effects to cards
 */
function enhanceCardInteractions() {
    const cards = document.querySelectorAll(
        '.aircraft-card, .training-item, .education-item, ' +
        '.affiliation-card, .contact-item, .certificate-item'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

enhanceCardInteractions();

/**
 * Add keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
}

initKeyboardNavigation();

/**
 * Add accessibility improvements
 */
function enhanceAccessibility() {
    // Add aria-labels to interactive elements
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Add focus visible styles
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

enhanceAccessibility();

/**
 * Performance optimization: Lazy loading images (if added later)
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
}

initLazyLoading();

/**
 * Add scroll to top button (optional enhancement)
 */
function initScrollToTop() {
    // Check if scroll position is sufficient to show button
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Could add a scroll-to-top button here if desired
        // For now, we keep the implementation minimal as requested
    });
}

initScrollToTop();

// Console message for developers
console.log('%c🛩️ Mohamed Abdi - Aviation Portfolio', 'font-size: 20px; color: #1e3a8a; font-weight: bold;');
console.log('%cCommercial Multi-Engine Pilot | Instrument Rated', 'font-size: 14px; color: #3b82f6;');
console.log('Website loaded successfully!');
