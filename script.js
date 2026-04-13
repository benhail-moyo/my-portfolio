// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hamburger Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Scroll Header Hide/Show
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const isLight = document.body.classList.contains('light-theme');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll Down
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else {
        // Scroll Up
        navbar.classList.add('scroll-up');
        navbar.classList.remove('scroll-down');
    }

    if (scrollTop < 10) {
        navbar.classList.remove('scroll-up');
        navbar.style.boxShadow = 'none';
        navbar.style.background = isLight ? 'rgba(245, 245, 240, 0.85)' : 'rgba(5, 5, 5, 0.8)';
    } else {
        navbar.style.background = isLight ? 'rgba(245, 245, 240, 0.95)' : 'rgba(5, 5, 5, 0.95)';
    }

    lastScrollTop = scrollTop;
});

// Intersection Observer for Fade-In Effects
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Typewriter effect for subtitle (optional extra touch)
const subtitle = document.querySelector('.subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        subtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    } else {
        subtitle.innerHTML += '<span style="animation: blink 1s infinite">_</span>';
    }
}

// Add blinking cursor style dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start typewriter after a short delay
setTimeout(typeWriter, 500);

// Certification Cards Click Handler
const certificationCards = document.querySelectorAll('.certification-card');
certificationCards.forEach(card => {
    card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    });
});

