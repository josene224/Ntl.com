document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Animate hamburger menu
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

const toggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
const navToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
});