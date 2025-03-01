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



document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("backgroundCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let shapes = [];

    function createShape(x, y) {
        const size = Math.random() * 50 + 20;
        const opacity = 1;
        const growthSpeed = Math.random() * 0.5 + 0.2;
        const fadeSpeed = 0.008;
        const rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() * 0.02) - 0.01;

        const colors = [
            "rgba(65, 105, 225, 0.8)",  
            "rgba(30, 144, 255, 0.7)",  
            "rgba(0, 102, 204, 0.6)"    
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const shapeTypes = ["circle", "square", "triangle"];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

        shapes.push({ x, y, size, opacity, growthSpeed, fadeSpeed, color, shapeType, rotation, rotationSpeed });
    }

    function drawShapes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach((shape, index) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation * Math.PI / 180);
            ctx.globalAlpha = shape.opacity;
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 3;

            if (shape.shapeType === "circle") {
                ctx.beginPath();
                ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
                ctx.stroke();
            } else if (shape.shapeType === "square") {
                ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            } else if (shape.shapeType === "triangle") {
                ctx.beginPath();
                ctx.moveTo(0, -shape.size);
                ctx.lineTo(-shape.size, shape.size);
                ctx.lineTo(shape.size, shape.size);
                ctx.closePath();
                ctx.stroke();
            }

            ctx.restore();

            shape.size += shape.growthSpeed;
            shape.opacity -= shape.fadeSpeed;
            shape.rotation += shape.rotationSpeed;

            if (shape.opacity <= 0) shapes.splice(index, 1);
        });

        requestAnimationFrame(drawShapes);
    }

    function startRandomizedShapes() {
        function generateRandomShape() {
            const randomX = Math.random() * canvas.width;
            const randomY = Math.random() * canvas.height;
            createShape(randomX, randomY);

            // Call itself again at a random interval (between 300ms - 1200ms)
            setTimeout(generateRandomShape, Math.random() * 900 + 300);
        }

        generateRandomShape();
    }

    startRandomizedShapes();
    drawShapes();
});


function toggleNightMode() {
    document.body.classList.toggle("night-mode-active"); // Toggle the class

    // Change the moon icon to a sun icon and vice versa
    const nightModeIcon = document.querySelector(".night-mode");
    if (document.body.classList.contains("night-mode-active")) {
        nightModeIcon.textContent = "☀️"; // Change to sun icon
    } else {
        nightModeIcon.textContent = "🌙"; // Change back to moon icon
    }
}


  document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const textArray = ["Software Developer", "Nice to Meet You!"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      let currentText = textArray[textIndex];

      if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
      } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        speed = 1000; // Pause before erasing
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        speed = 500; // Pause before typing new text
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  });