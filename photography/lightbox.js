const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');

document.querySelectorAll('.photo-button').forEach((button) => {
    button.addEventListener('click', () => {
        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.dataset.alt || '';
        lightbox.showModal();
    });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
});
