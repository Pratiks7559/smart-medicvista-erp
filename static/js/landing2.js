// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});


// Counter Animation
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target % 1 !== 0) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
                setTimeout(updateCounter, 20);
            } else {
                if (target % 1 !== 0) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        updateCounter();
    });
};

// Trigger counter animation on scroll
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Feature boxes animation
document.querySelectorAll('.feature-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px)';
    box.style.transition = `all 0.6s ease ${index * 0.1}s`;
    
    const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    boxObserver.observe(box);
});

// Newsletter form validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            submitBtn.textContent = '✓ Subscribed!';
            submitBtn.style.background = 'var(--primary)';
            submitBtn.style.color = 'white';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.textContent = 'Subscribe';
                submitBtn.style.background = 'white';
                submitBtn.style.color = 'var(--accent)';
            }, 3000);
        } else {
            emailInput.style.border = '2px solid red';
            setTimeout(() => {
                emailInput.style.border = 'none';
            }, 2000);
        }
    });
}


// Product Carousel
let currentSlide = 0;
const productsPerSlide = 3;
const productCards = document.querySelectorAll('.product-card');
const totalSlides = Math.ceil(productCards.length / productsPerSlide);

// Create dots
const dotsContainer = document.querySelector('.carousel-dots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}

function updateCarousel() {
    productCards.forEach((card, index) => {
        const slideIndex = Math.floor(index / productsPerSlide);
        if (slideIndex === currentSlide) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update dots
    document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Initialize carousel
updateCarousel();

// Auto-play carousel
setInterval(() => {
    moveCarousel(1);
}, 5000);


// Testimonial Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialCards[index].classList.add('active');
}

function moveTestimonial(direction) {
    currentTestimonial += direction;
    if (currentTestimonial < 0) currentTestimonial = totalTestimonials - 1;
    if (currentTestimonial >= totalTestimonials) currentTestimonial = 0;
    showTestimonial(currentTestimonial);
}

// Initialize first testimonial
if (testimonialCards.length > 0) {
    showTestimonial(0);
    
    // Auto-play testimonials
    setInterval(() => {
        moveTestimonial(1);
    }, 5000);
}
