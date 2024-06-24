let currentSlide = {};

// Fonction pour afficher le slide
function showSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const carouselInner = carousel.querySelector('.carousel-inner');

    // Détecter la largeur de l'écran pour ajuster le nombre d'éléments visibles
    const itemsPerSlide = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = Math.ceil(totalSlides / itemsPerSlide) - 1;

    if (index > totalSlides - itemsPerSlide) currentSlide[carouselId] = 0;
    if (index < 0) currentSlide[carouselId] = maxIndex;

    // Calculer la largeur totale à déplacer
    const movePercent = -currentSlide[carouselId] * 100 / itemsPerSlide;
    carouselInner.style.transform = `translateX(${movePercent}%)`;
}

// Fonction pour le slide suivant
function nextSlide(carouselId) {
    currentSlide[carouselId]++;
    showSlide(carouselId, currentSlide[carouselId]);
}

// Fonction pour le slide précédent
function prevSlide(carouselId) {
    currentSlide[carouselId]--;
    showSlide(carouselId, currentSlide[carouselId]);
}

// Initialiser chaque carrousel
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const id = carousel.id;
        currentSlide[id] = 0;
        showSlide(id, 0);
    });
});

// Réajuster les slides à chaque changement de taille de fenêtre
window.addEventListener('resize', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const id = carousel.id;
        showSlide(id, currentSlide[id]);
    });
});
