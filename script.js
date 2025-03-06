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
    var canvas = document.getElementById("backgroundCanvas");
    var context = canvas.getContext("2d");

    var time = 0,
        velocity = 0.1,
        velocityTarget = 0.1,
        width,
        height,
        lastX,
        lastY;

    var MAX_OFFSET = 400;
    var SPACING = 4;
    var POINTS = MAX_OFFSET / SPACING;
    var PEAK = MAX_OFFSET * 0.25;
    var POINTS_PER_LAP = 6;
    var SHADOW_STRENGTH = 0;

    function setup() {
        resize();
        step();
        window.addEventListener("resize", resize);
        window.addEventListener("mousedown", onMouseDown);
        document.addEventListener("touchstart", onTouchStart);
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function step() {
        time += velocity;
        velocity += (velocityTarget - velocity) * 0.3;
        clear();
        render();
        requestAnimationFrame(step);
    }

    function clear() {
        context.clearRect(0, 0, width, height);
    }

    function render() {
        var x, y,
            cx = width / 2,
            cy = height / 2;

        context.globalCompositeOperation = "lighter";
        context.strokeStyle = "#4169e1";
        context.lineWidth = 2;
        context.beginPath();

        for (var i = POINTS; i > 0; i--) {
            var value = i * SPACING + (time % SPACING);

            var ax = Math.sin(value / POINTS_PER_LAP) * Math.PI,
                ay = Math.cos(value / POINTS_PER_LAP) * Math.PI;

            x = ax * value;
            y = ay * value * 0.35;

            var o = 1 - Math.min(value, PEAK) / PEAK;

            y -= Math.pow(o, 2) * 200;
            y += (200 * value) / MAX_OFFSET;
            y += (x / cx) * width * 0.1;

            context.globalAlpha = 0.3 * (1 - ( value / MAX_OFFSET )); 
            context.shadowBlur = SHADOW_STRENGTH * o;

            context.lineTo(cx + x, cy + y);
            context.stroke();

            context.beginPath();
            context.moveTo(cx + x, cy + y);
        }

        context.lineTo(cx, cy - 200);
        context.lineTo(cx, 0);
        context.stroke();
    }

    function onMouseDown(event) {
        lastX = event.clientX;
        lastY = event.clientY;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(event) {
        var vx = (event.clientX - lastX) / 100;
        var vy = (event.clientY - lastY) / 100;

        if (event.clientY < height / 2) vx *= -1;
        if (event.clientX > width / 2) vy *= -1;

        velocityTarget = vx + vy;

        lastX = event.clientX;
        lastY = event.clientY;
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    function onTouchStart(event) {
        event.preventDefault();
        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    }

    function onTouchMove(event) {
        var vx = (event.touches[0].clientX - lastX) / 100;
        var vy = (event.touches[0].clientY - lastY) / 100;

        if (event.touches[0].clientY < height / 2) vx *= -1;
        if (event.touches[0].clientX > width / 2) vy *= -1;

        velocityTarget = vx + vy;

        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
    }

    function onTouchEnd() {
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
    }

    setup();
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

  document.addEventListener("DOMContentLoaded", function () {
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    function handleScroll() {
        scrollElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                el.classList.add("show");
            } else {
                el.classList.remove("show"); // Remove when out of view
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});
