// ============================================
// WORK PAGE - FILTER FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            
            // Add filtering class for animation
            projectsGrid.classList.add('filtering');

            // Filter cards
            projectCards.forEach((card, index) => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animationDelay = `${index * 0.05}s`;
                    
                    // Trigger reflow for animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Remove filtering class
            setTimeout(() => {
                projectsGrid.classList.remove('filtering');
            }, 500);

            // Update URL hash
            if (filter !== 'all') {
                window.history.pushState({}, '', `#${filter}`);
            } else {
                window.history.pushState({}, '', window.location.pathname);
            }
        });
    });

    // Handle URL hash on load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetBtn = document.querySelector(`[data-filter="${hash}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }

    // Stagger animation on load
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });

    // Intersection Observer for lazy loading images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });

    projectCards.forEach(card => {
        imageObserver.observe(card);
    });

    console.log('Work page filter initialized ✨');
});
