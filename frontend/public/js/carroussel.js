document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${translateX}%)`;
    }

    document.querySelector('.carousel-control.next').addEventListener('click', showNextSlide);
    document.querySelector('.carousel-control.prev').addEventListener('click', showPrevSlide);

    setInterval(showNextSlide, 3000); // Change slide every 3 seconds
});
