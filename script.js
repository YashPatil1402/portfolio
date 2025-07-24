// ===== VARIABLES AND CONSTANTS =====
const scriptURL = 'https://script.google.com/macros/s/AKfycbwD3FG3KuBLdE0vit4ltAINYrkyP95A2GbdTUOf15yDwdwi-1bGTUIhGgH5oBkCWdNvlg/exec';

// Typing animation text
const typingTexts = [
    'Computer Engineering Student',
    'Web Developer',
    'Tech Enthusiast',
    'Problem Solver',
    'Future Engineer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const loadingScreen = document.getElementById('loading-screen');
const contactForm = document.getElementById('contact-form');
const response = document.getElementById('response');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ===== NAVBAR FUNCTIONALITY =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('show');
        backToTopBtn.classList.add('show');
    } else {
        navbar.classList.remove('show');
        backToTopBtn.classList.remove('show');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING ANIMATION =====
function typeWriter() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== BACK TO TOP BUTTON =====
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SKILLS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// ===== PROJECT FILTERING =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== PROJECT PROGRESS ANIMATION =====
function animateProjectProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            bar.style.width = progress;
        }
    });
}

// ===== CONTACT FORM HANDLING =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-primary');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        const fetchResponse = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (fetchResponse.ok) {
            showResponse('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        showResponse('Something went wrong! Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

function showResponse(message, type) {
    response.textContent = message;
    response.className = `form-response ${type}`;
    response.style.display = 'block';
    
    // Hide response after 5 seconds
    setTimeout(() => {
        response.style.display = 'none';
    }, 5000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills-section')) {
                animateSkillBars();
            }
            
            // Animate project progress bars when projects section is visible
            if (entry.target.classList.contains('projects-section')) {
                animateProjectProgress();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.skills-section, .projects-section').forEach(section => {
    observer.observe(section);
});

// ===== MOUSE CURSOR EFFECTS =====
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects
    document.querySelectorAll('a, button, .project-card, .skill-category, .contact-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// ===== PARALLAX SCROLLING EFFECTS =====
function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.5 * (index + 1);
        element.style.transform = `translateY(${rate}px)`;
    });
}

// ===== FORM VALIDATION =====
function validateForm() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        // Remove previous error styling
        input.classList.remove('error');
        
        if (!value) {
            input.classList.add('error');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// ===== SCROLL ANIMATIONS =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', () => {
    parallaxEffect();
    revealOnScroll();
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom',
            easing: 'ease-in-out',
            offset: 100
        });
    }
    
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Initialize cursor effect (for desktop only)
    if (window.innerWidth > 768) {
        createCursorEffect();
    }
    
    // Initialize project filter (show all projects initially)
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(parallaxEffect, 10);
const throttledReveal = throttle(revealOnScroll, 10);

window.addEventListener('scroll', throttledParallax);
window.addEventListener('scroll', throttledReveal);

// ===== ADDITIONAL CSS FOR CUSTOM CURSOR =====
const cursorStyles = `
.custom-cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background: #4e54c8;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
}

.cursor-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid rgba(78, 84, 200, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.15s ease;
}

.custom-cursor.cursor-hover {
    transform: scale(2);
    background: #f8cdda;
}

.cursor-follower.cursor-hover {
    transform: scale(1.5);
    border-color: rgba(248, 205, 218, 0.5);
}

.error {
    border-color: #e74c3c !important;
    background-color: rgba(231, 76, 60, 0.05) !important;
}

.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 768px) {
    .custom-cursor,
    .cursor-follower {
        display: none;
    }
}
`;

// Inject cursor styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Show a fun message
        showResponse('🎉 Konami Code activated! You found the easter egg!', 'success');
    }
});

console.log('🚀 Portfolio website loaded successfully!');
console.log('💡 Try the Konami Code: ↑↑↓↓←→←→BA');
