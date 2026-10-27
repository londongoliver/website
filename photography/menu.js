const portfolioMenu = document.querySelector('.portfolio-menu');
const menuToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (portfolioMenu) {
    portfolioMenu.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            portfolioMenu.open = true;
        }
    });
    portfolioMenu.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse'
            && window.matchMedia('(hover: hover) and (pointer: fine)').matches
            && !portfolioMenu.contains(document.activeElement)) {
            portfolioMenu.open = false;
        }
    });
    portfolioMenu.addEventListener('focusout', (event) => {
        if (!portfolioMenu.contains(event.relatedTarget)
            && !portfolioMenu.matches(':hover')
            && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            portfolioMenu.open = false;
        }
    });
}

if (menuToggle && siteNav) {
    const closeMenu = () => {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        siteNav.classList.toggle('is-open', !isOpen);
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    });

    siteNav.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.site-header')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) closeMenu();
    });
}
