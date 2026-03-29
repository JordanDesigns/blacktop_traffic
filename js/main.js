// ============================================
// Navigation scroll behavior
// ============================================
const nav = document.querySelector('.nav');

function handleNavScroll() {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Active nav link based on current page
function setActiveNavLink() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const linkMap = {
        'index.html': 'Home',
        'services.html': 'Services',
        'about.html': 'About',
        'contact.html': 'Contact',
        '': 'Home'
    };

    const activeName = linkMap[page] || 'Home';

    document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.trim() === activeName) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ============================================
// Mobile menu
// ============================================
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');
const hamburgerLabel = document.querySelector('.nav__hamburger-label');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburgerLabel.textContent = isOpen ? 'Close' : 'Menu';
    });
}

// ============================================
// Scroll reveal animations
// ============================================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// Parallax effect on hero stripe
// ============================================
const heroStripe = document.querySelector('.hero__stripe');

if (heroStripe) {
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.3;
            heroStripe.style.transform = `skewX(-10deg) translateY(${offset}px)`;
        }
    }, { passive: true });
}

// ============================================
// Smooth scroll for in-page anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// Service card hover tilt (subtle)
// ============================================
document.querySelectorAll('.preview-card, .detail-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
        card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease, background 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'background 0.5s ease';
    });
});

// ============================================
// Initialize
// ============================================
handleNavScroll();
setActiveNavLink();
