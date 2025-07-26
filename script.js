// Yash Patil's Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeProjectFilters();
    initializeContactForm();
    initializeBackToTop();
    initializeMobileMenu();
    initializeResumeButton();
    initializeTypingAnimation();
    initializeHeroButtons();
});

// Initialize hero section buttons
function initializeHeroButtons() {
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    const contactMeBtn = document.querySelector('a[href="#contact"]');
    
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('projects');
        });
    }
    
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    // Add scroll effect to navbar
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--color-surface)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }, 16));

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            // Scroll to target section
            scrollToSection(targetId);
        });
    });

    function updateActiveNavLink() {
        let current = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Check for saved theme preference or detect system preference
    let currentTheme = localStorage.getItem('theme');
    
    if (!currentTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light';
        }
    }
    
    applyTheme(currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        document.body.className = document.body.className.replace(/theme-\w+/, '') + ` theme-${theme}`;
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
}

// Typing animation for hero subtitle
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.classList.add('typing-cursor');
    
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.classList.remove('typing-cursor');
            }, 1000);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const elementsToAnimate = [
        '.hero__content',
        '.about__content',
        '.skill__category',
        '.project__card',
        '.timeline__item',
        '.contact__content'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Skills progress bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                
                setTimeout(() => {
                    progressBar.style.width = level + '%';
                }, 300);
                
                skillsObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
}

// Project filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with animation
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize all projects as visible
    projectCards.forEach(card => {
        card.classList.add('visible');
        card.style.display = 'block';
    });
}

// Contact form handling with Google Sheets integration
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = document.getElementById('submit-btn');

    // Google Script URL for form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwD3FG3KuBLdE0vit4ltAINYrkyP95A2GbdTUOf15yDwdwi-1bGTUIhGgH5oBkCWdNvlg/exec';

    // Add input validation
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearErrors);
    });

    contactForm.addEventListener('submit', handleFormSubmit);

    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        clearInputError(input);

        if (!value) {
            showInputError(input, 'This field is required');
            return false;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }

        return true;
    }

    function clearErrors(e) {
        clearInputError(e.target);
    }

    function showInputError(input, message) {
        clearInputError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);
        input.style.borderColor = 'var(--color-error)';
    }

    function clearInputError(input) {
        const errorElement = input.parentNode.querySelector('.input-error');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        formInputs.forEach(input => {
            if (!validateInput({ target: input })) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showFormMessage('Please fix the errors above and try again.', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            // Prepare form data
            const formData = new FormData(contactForm);
            
            // Submit to Google Sheets
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });

            // Always show success message since Google Sheets doesn't return proper status
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message status status--${type}`;
        messageElement.textContent = message;
        
        contactForm.appendChild(messageElement);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', throttle(function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, 16));

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Resume button functionality
function initializeResumeButton() {
    const viewResumeBtn = document.getElementById('view-resume');
    
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showResumeModal();
        });
    }
}

function showResumeModal() {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <h3 style="margin-bottom: var(--space-16); color: var(--color-primary);">Resume Download</h3>
            <p style="margin-bottom: var(--space-24); color: var(--color-text); line-height: 1.6;">
                Thank you for your interest in my profile! I'm constantly updating my resume with my latest projects and achievements. 
                <br><br>
                For the most up-to-date information about my skills and experience, please feel free to connect with me on LinkedIn or send me a message through the contact form below.
            </p>
            <div style="display: flex; gap: var(--space-16); justify-content: center; flex-wrap: wrap;">
                <a href="https://lnkd.in/eqchiNMk" target="_blank" class="btn btn--primary">
                    View LinkedIn Profile
                </a>
                <button class="btn btn--secondary modal-contact">
                    Contact Me
                </button>
                <button class="btn btn--outline modal-close">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    // Add event listeners
    modalOverlay.querySelector('.modal-close').addEventListener('click', () => {
        modalOverlay.remove();
    });

    modalOverlay.querySelector('.modal-contact').addEventListener('click', () => {
        modalOverlay.remove();
        scrollToSection('contact');
    });

    // Animate modal in
    setTimeout(() => {
        modalOverlay.classList.add('visible');
    }, 10);

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    // Close modal with Escape key
    const handleEscape = function(e) {
        if (e.key === 'Escape') {
            modalOverlay.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle Enter key on focusable elements
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
    
    // Handle arrow keys for navigation
    if (e.altKey) {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'ArrowDown':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
    }
});

// Initialize on load and handle window resize
window.addEventListener('load', function() {
    // Trigger initial animations for visible elements
    document.querySelectorAll('.fade-in').forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalculate positions and animations if needed
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }, 250);
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
        }, 0);
    });
}
