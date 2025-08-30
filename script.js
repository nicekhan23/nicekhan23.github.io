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
                element.textContent = element.getAttribute('data-' + lang);
            });

            // Update language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });
        }

        // Add smooth scrolling and navbar highlight
        document.addEventListener('DOMContentLoaded', function() {
            // Language switcher event listeners
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    switchLanguage(lang);
                });
            });

            const navLinks = document.querySelectorAll('.nav-links a');
            const sections = document.querySelectorAll('section');

            // Highlight active nav link on scroll
            window.addEventListener('scroll', function() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            // Add parallax effect to welcome section
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const welcomeSection = document.getElementById('welcome-section');
                if (welcomeSection) {
                    welcomeSection.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            });
        });
