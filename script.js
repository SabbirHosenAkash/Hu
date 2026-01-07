// --- 1. Typing Effect ---
const textArray = ["Bangladeshi Musician", "Creative Writer", "Web Developer", "SEO Expert"];
let textIndex = 0; let charIndex = 0; let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-effect");
    if (!typingElement) return;
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 70 : 150;
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true; typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; textIndex = (textIndex + 1) % textArray.length; typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}

// --- 2. Silent Form Submission (Success Message Without Refresh) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const btn = contactForm.querySelector('.send-btn');
        
        status.innerHTML = "Sending... <i class='fas fa-spinner fa-spin'></i>";
        btn.disabled = true;

        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "✅ Message Sent Successfully! I'll contact you soon.";
                status.style.color = "var(--primary)";
                contactForm.reset();
            } else {
                status.innerHTML = "❌ Error occurred. Please try again.";
                status.style.color = "red";
            }
        }).catch(error => {
            status.innerHTML = "❌ Connection error.";
        }).finally(() => {
            btn.disabled = false;
        });
    });
}

// --- 3. Initializations ---
document.addEventListener("DOMContentLoaded", () => {
    // Typing Start
    setTimeout(typeEffect, 1000);

    // AOS Animation
    AOS.init({ duration: 1000, once: true });

    // Swiper Project Slider
    new Swiper('.project-slider', {
        loop: true, autoplay: { delay: 3500 },
        pagination: { el: '.swiper-pagination', clickable: true },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: { rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true }
    });

    // Particles JS
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 70 },
                "color": { "value": "#00ff88" },
                "size": { "value": 2 },
                "line_linked": { "enable": true, "distance": 150, "color": "#00ff88", "opacity": 0.1 },
                "move": { "enable": true, "speed": 2 }
            }
        });
    }

    // Skills Scroll Animation
    const skillSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.fill-3d').forEach(bar => {
                    bar.style.width = bar.style.getPropertyValue('--width');
                });
            }
        });
    }, { threshold: 0.5 });
    if (skillSection) observer.observe(skillSection);
});

// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('active');
}
