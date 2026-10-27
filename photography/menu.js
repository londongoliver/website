const portfolioMenu = document.querySelector('.portfolio-menu');

if (portfolioMenu) {
    portfolioMenu.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') portfolioMenu.open = true;
    });
    portfolioMenu.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse' && !portfolioMenu.contains(document.activeElement)) {
            portfolioMenu.open = false;
        }
    });
    portfolioMenu.addEventListener('focusout', (event) => {
        if (!portfolioMenu.contains(event.relatedTarget) && !portfolioMenu.matches(':hover')) {
            portfolioMenu.open = false;
        }
    });
}
