// JhulaCraft Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu after clicking a link
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }

                    // Update active nav link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (correspondingNavLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add hover effects for buttons (excluding carousel arrows and newsletter button)
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        // Skip carousel arrows and newsletter button to avoid transform conflicts
        if (button.classList.contains('carousel-arrow') ||
            button.classList.contains('carousel-arrow-left') ||
            button.classList.contains('carousel-arrow-right') ||
            button.classList.contains('newsletter-btn')) {
            return;
        }

        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Category card hover text effect
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        const categoryTitle = card.querySelector('.category-title');
        if (categoryTitle) {
            // Store the original text
            const originalText = categoryTitle.textContent.trim();

            // Add hover event listeners
            card.addEventListener('mouseenter', () => {
                categoryTitle.textContent = 'ORDER NOW';
            });

            card.addEventListener('mouseleave', () => {
                categoryTitle.textContent = originalText;
            });
        }
    });

    // Carousel functionality
    const carousel = document.querySelector('.products-carousel');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    const paginationDots = document.querySelectorAll('.pagination-dot');

    if (carousel && leftArrow && rightArrow && paginationDots.length > 0) {
        let currentSlide = 0;
        let totalSlides = paginationDots.length;
        let itemsPerSlide = 3; // Default for desktop

        // Update items per slide based on screen size
        function updateItemsPerSlide() {
            if (window.innerWidth <= 768) {
                itemsPerSlide = 1; // Mobile: 1 item per slide
            } else if (window.innerWidth <= 1024) {
                itemsPerSlide = 2; // Tablet: 2 items per slide
            } else {
                itemsPerSlide = 3; // Desktop: 3 items per slide
            }
        }

        // Update carousel position
        function updateCarousel() {
            const translateX = -(currentSlide * 100);
            carousel.style.transform = `translateX(${translateX}%)`;

            // Update pagination dots
            paginationDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
            updateCarousel();
        }

        // Next slide
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop back to first slide
            }
            updateCarousel();
        }

        // Previous slide
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = totalSlides - 1; // Loop to last slide
            }
            updateCarousel();
        }

        // Event listeners
        leftArrow.addEventListener('click', prevSlide);
        rightArrow.addEventListener('click', nextSlide);

        // Pagination dots event listeners
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            updateItemsPerSlide();
            updateCarousel();
        });

        // Initialize
        updateItemsPerSlide();
        updateCarousel();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left - go to next slide
                } else {
                    prevSlide(); // Swipe right - go to previous slide
                }
            }
        }
    }

    console.log('JhulaCraft website initialized successfully!');
});
