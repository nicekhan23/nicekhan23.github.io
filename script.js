// Language switching functionality
const languageData = {
    en: 'English',
    kz: 'Қазақша', 
    ru: 'Русский'
};

let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with language data attributes
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        const newText = element.getAttribute('data-' + lang);
        if (newText) {
            // Check if element has innerHTML content that needs to be preserved
            if (element.children.length === 0) {
                element.textContent = newText;
            } else {
                // For elements with child elements, update innerHTML carefully
                element.innerHTML = newText;
            }
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');
    
    // Language switcher event listeners
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langButtons.length);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log('Switching to language:', lang);
            switchLanguage(lang);
        });
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Add click handlers for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link on scroll
    function updateActiveNavLink() {
        let current = '';
        const navHeight = document.getElementById('navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 200;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            
            // Add parallax effect to welcome section
            const scrolled = window.pageYOffset;
            const welcomeSection = document.getElementById('welcome-section');
            if (welcomeSection && scrolled < window.innerHeight) {
                welcomeSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, 10);
    });

    // Initial call to set active nav link
    updateActiveNavLink();

    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Handle mobile menu if needed
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}