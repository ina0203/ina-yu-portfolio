// ============================================
// INA YU PORTFOLIO - MAIN SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.pillar, .work-card, .category-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
        }

        lastScroll = currentScroll;
    });

    // Parallax effect for hero (subtle)
    const hero = document.querySelector('.hero-content');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
                hero.style.opacity = 1 - (scrolled * 0.001);
            }
        });
    }

    // Cursor effect (optional - for desktop)
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .custom-cursor {
                width: 20px;
                height: 20px;
                border: 1px solid rgba(248, 246, 243, 0.5);
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
                transform: translate(-50%, -50%);
            }
            .custom-cursor.hover {
                width: 40px;
                height: 40px;
                border-color: rgba(248, 246, 243, 0.8);
            }
        `;
        document.head.appendChild(cursorStyle);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .work-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Stagger animation for work cards
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Category items stagger
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });

    console.log('Portfolio initialized successfully ✨');
});

// Page transition (for multi-page navigation)
document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && !link.hash) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    }
});

// On page load fade in
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
