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
if (subtitle) {
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
}

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

// Screenshot Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselModal = document.getElementById('carousel-modal');

    // Only initialize carousel if it exists on the page
    if (!carouselModal) {
        console.log('Carousel modal not found on this page');
        return;
    }

    const carouselClose = document.querySelector('.carousel-close');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const carouselTriggers = document.querySelectorAll('.carousel-trigger');

    console.log('Carousel modal:', carouselModal);
    console.log('Carousel triggers:', carouselTriggers);
    console.log('Number of triggers:', carouselTriggers.length);

    let currentIndex = 0;
    let autoScrollInterval;
    let autoScrollActive = true;
    const autoScrollDelay = 3000; // 3 seconds

    // Open carousel
    carouselTriggers.forEach(trigger => {
        console.log('Adding click listener to trigger:', trigger);
        trigger.addEventListener('click', (e) => {
            console.log('Trigger clicked!', e);
            carouselModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            startAutoScroll();
        });
    });

    // Close carousel
    carouselClose.addEventListener('click', closeCarousel);
    carouselModal.querySelector('.carousel-overlay').addEventListener('click', closeCarousel);

    function closeCarousel() {
        carouselModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopAutoScroll();
        resetCarousel();
    }

    // Navigate slides
    function goToSlide(index) {
        if (index < 0) {
            index = carouselSlides.length - 1;
        } else if (index >= carouselSlides.length) {
            index = 0;
        }

        currentIndex = index;
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    carouselPrev.addEventListener('click', () => {
        autoScrollActive = false;
        goToSlide(currentIndex - 1);
        // Restart auto-scroll after 5 seconds of inactivity
        clearTimeout(autoScrollInterval);
        setTimeout(() => {
            autoScrollActive = true;
            startAutoScroll();
        }, 5000);
    });

    carouselNext.addEventListener('click', () => {
        autoScrollActive = false;
        goToSlide(currentIndex + 1);
        // Restart auto-scroll after 5 seconds of inactivity
        clearTimeout(autoScrollInterval);
        setTimeout(() => {
            autoScrollActive = true;
            startAutoScroll();
        }, 5000);
    });

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            autoScrollActive = false;
            goToSlide(index);
            // Restart auto-scroll after 5 seconds of inactivity
            clearTimeout(autoScrollInterval);
            setTimeout(() => {
                autoScrollActive = true;
                startAutoScroll();
            }, 5000);
        });
    });

    // Auto-scroll functionality
    function startAutoScroll() {
        if (!autoScrollActive) return;

        autoScrollInterval = setInterval(() => {
            if (autoScrollActive) {
                goToSlide(currentIndex + 1);
            }
        }, autoScrollDelay);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resetCarousel() {
        currentIndex = 0;
        autoScrollActive = true;
        goToSlide(0);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!carouselModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeCarousel();
        } else if (e.key === 'ArrowLeft') {
            autoScrollActive = false;
            goToSlide(currentIndex - 1);
            clearTimeout(autoScrollInterval);
            setTimeout(() => {
                autoScrollActive = true;
                startAutoScroll();
            }, 5000);
        } else if (e.key === 'ArrowRight') {
            autoScrollActive = false;
            goToSlide(currentIndex + 1);
            clearTimeout(autoScrollInterval);
            setTimeout(() => {
                autoScrollActive = true;
                startAutoScroll();
            }, 5000);
        }
    });
});

