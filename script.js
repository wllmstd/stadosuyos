document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select all modal triggers
    const openButtons = document.querySelectorAll(".view-more");
    const closeButtons = document.querySelectorAll(".close");
    const modals = document.querySelectorAll(".modal");

    // Ensure all modals are hidden on page load
    modals.forEach(modal => {
        modal.style.display = "none";
    });

    // Open the corresponding modal
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetModalId = this.getAttribute("data-modal");
            const targetModal = document.getElementById(targetModalId);
            if (targetModal) {
                targetModal.style.display = "flex";
            }
        });
    });

    // Close modals when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentSlide = 0;

// Show Slide with Smooth Animation
function showSlide(index) {
    const slideWidth = slides[0].clientWidth; // Get single slide width
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    
    // Update active dot
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

// Next Slide
rightArrow.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Previous Slide
leftArrow.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Click on Dots to Change Slide
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Initialize First Slide
showSlide(currentSlide);

