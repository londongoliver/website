const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dot')];
const carousel = document.querySelector('.hero-carousel');
const header = document.querySelector('.landing-header');

if (slides.length && dots.length && carousel) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeIndex = 0;
    let paused = reducedMotion.matches;
    let interacting = false;
    let interval;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle('is-active', isActive);
            if (isActive) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    };

    const updateAutoplay = () => {
        window.clearInterval(interval);
        if (!paused && !interacting && !document.hidden) {
            interval = window.setInterval(() => showSlide(activeIndex + 1), 6000);
        }
    };

    dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
    carousel.addEventListener('mouseenter', () => {
        interacting = true;
        updateAutoplay();
    });
    carousel.addEventListener('mouseleave', () => {
        interacting = false;
        updateAutoplay();
    });
    carousel.addEventListener('focusin', () => {
        interacting = true;
        updateAutoplay();
    });
    carousel.addEventListener('focusout', (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            interacting = false;
            updateAutoplay();
        }
    });
    document.addEventListener('visibilitychange', updateAutoplay);
    reducedMotion.addEventListener('change', (event) => {
        paused = event.matches;
        updateAutoplay();
    });
    updateAutoplay();
}

if (header && carousel) {
    const updateHeader = () => {
        header.classList.toggle('is-scrolled', carousel.getBoundingClientRect().bottom <= 0);
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    updateHeader();
}
