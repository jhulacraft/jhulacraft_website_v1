// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');

    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get view type
            const viewType = this.getAttribute('data-view');

            // Remove existing grid classes
            productsGrid.classList.remove('grid-1', 'grid-2', 'grid-3');

            // Add new grid class
            if (viewType === 'list') {
                productsGrid.classList.add('grid-1');
            } else if (viewType === 'grid-2') {
                productsGrid.classList.add('grid-2');
            } else {
                productsGrid.classList.add('grid-3');
            }
        });
    });

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');

    sortSelect.addEventListener('change', function () {
        const sortValue = this.value;
        const productItems = Array.from(document.querySelectorAll('.product-item'));

        // Sort products based on selected option
        productItems.sort((a, b) => {
            switch (sortValue) {
                case 'name':
                    const nameA = a.querySelector('.product-title').textContent.trim();
                    const nameB = b.querySelector('.product-title').textContent.trim();
                    return nameA.localeCompare(nameB);

                case 'price-low':
                case 'price-high':
                    // Since we don't have prices in the current design,
                    // we'll sort by name for now
                    const titleA = a.querySelector('.product-title').textContent.trim();
                    const titleB = b.querySelector('.product-title').textContent.trim();
                    return sortValue === 'price-low' ?
                        titleA.localeCompare(titleB) :
                        titleB.localeCompare(titleA);

                case 'newest':
                    // Reverse the current order for "newest"
                    return Math.random() - 0.5;

                default:
                    return 0;
            }
        });

        // Re-append sorted items to the grid
        const grid = document.querySelector('.products-grid');
        productItems.forEach(item => {
            grid.appendChild(item);
        });
    });

    // Category filter functionality
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Here you would typically filter products based on category
            // For now, we'll just show all products
            console.log('Category selected:', this.textContent);
        });
    });

    // WhatsApp button functionality
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productTitle = this.closest('.product-item').querySelector('.product-title').textContent.trim();
            const message = `Hi! I'm interested in the ${productTitle}. Can you please provide more details?`;
            const phoneNumber = '919157643543'; // JhulaCraft phone number
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    // Pagination functionality
    const paginationNumbers = document.querySelectorAll('.pagination-number');

    paginationNumbers.forEach(number => {
        number.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all numbers
            paginationNumbers.forEach(n => n.classList.remove('active'));

            // Add active class to clicked number
            this.classList.add('active');

            // Scroll to top of products section
            document.querySelector('.products-section').scrollIntoView({
                behavior: 'smooth'
            });

            // Here you would typically load new products for the selected page
            console.log('Page selected:', this.textContent);
        });
    });

    // Previous/Next pagination
    const prevButton = document.querySelector('.pagination-link.prev');
    const nextButton = document.querySelector('.pagination-link.next');

    if (prevButton) {
        prevButton.addEventListener('click', function (e) {
            e.preventDefault();

            const currentActive = document.querySelector('.pagination-number.active');
            const prevNumber = currentActive.previousElementSibling;

            if (prevNumber && prevNumber.classList.contains('pagination-number')) {
                currentActive.classList.remove('active');
                prevNumber.classList.add('active');

                document.querySelector('.products-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function (e) {
            e.preventDefault();

            const currentActive = document.querySelector('.pagination-number.active');
            const nextNumber = currentActive.nextElementSibling;

            if (nextNumber && nextNumber.classList.contains('pagination-number')) {
                currentActive.classList.remove('active');
                nextNumber.classList.add('active');

                document.querySelector('.products-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for product images
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach(img => {
        // Set initial styles
        img.style.transition = 'opacity 0.3s ease';

        if (img.complete && img.naturalHeight !== 0) {
            // Image is already loaded
            img.style.opacity = '1';
        } else {
            // Image is still loading
            img.style.opacity = '0';

            img.addEventListener('load', function () {
                this.style.opacity = '1';
            });

            // Fallback: ensure image becomes visible after 2 seconds
            setTimeout(() => {
                if (img.style.opacity === '0') {
                    img.style.opacity = '1';
                }
            }, 2000);
        }
    });
});

// Utility function to show loading state
function showLoading() {
    const grid = document.querySelector('.products-grid');
    grid.style.opacity = '0.5';
    grid.style.pointerEvents = 'none';
}

// Utility function to hide loading state
function hideLoading() {
    const grid = document.querySelector('.products-grid');
    grid.style.opacity = '1';
    grid.style.pointerEvents = 'auto';
}

// Function to simulate loading new products (for future API integration)
function loadProducts(category = 'all', page = 1, sortBy = 'default') {
    showLoading();

    // Simulate API call delay
    setTimeout(() => {
        hideLoading();
        console.log(`Loading products: category=${category}, page=${page}, sort=${sortBy}`);
    }, 500);
}
