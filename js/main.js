// Main JavaScript for Gà Vui Website
// Smooth scrolling, mobile menu, animations, and interactive features

document.addEventListener('DOMContentLoaded', function() {

    // ===== MOBILE MENU TOGGLE =====
    const createMobileMenu = () => {
        const header = document.querySelector('.header .container');
        const navbar = document.querySelector('.navbar');

        // Create mobile menu button
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: #fff;
            margin-left: auto;
            margin-right: 1rem;
        `;

        // Insert mobile menu button before navbar
        header.insertBefore(mobileMenuBtn, navbar);

        // Mobile menu toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('mobile-menu-active');
            this.innerHTML = navbar.classList.contains('mobile-menu-active')
                ? '<i class="fa-solid fa-times"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-menu-active');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });

        // Show/hide mobile menu button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navbar.classList.add('mobile-menu');
            } else {
                mobileMenuBtn.style.display = 'none';
                navbar.classList.remove('mobile-menu', 'mobile-menu-active');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        };

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };

    // ===== SMOOTH SCROLLING =====
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ===== SCROLL ANIMATIONS =====
    const scrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        document.querySelectorAll('.product-card, .feature-box, .blog-box').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    };

    // ===== STICKY HEADER =====
    const stickyHeader = () => {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    };

    // ===== PRODUCT CARD HOVER EFFECTS =====
    const productCardEffects = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
    };

    // ===== NEWSLETTER FORM VALIDATION =====
    const newsletterValidation = () => {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (!email || !email.includes('@')) {
                alert('Vui lòng nhập email hợp lệ!');
                return;
            }

            // Simulate form submission
            alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi voucher đến email của bạn.');
            this.reset();
        });
    };

    // ===== LOADING ANIMATION =====
    const loadingAnimation = () => {
        // Add loading class to body
        document.body.classList.add('loading');

        // Remove loading class after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 300);
        });
    };

    // ===== IMAGE LAZY LOADING =====
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    };

    // ===== BUTTON NAVIGATION =====
    const buttonNavigation = () => {
        // Cart icon should navigate to cart page
        const cartIcon = document.querySelector('.fa-cart-shopping');
        if (cartIcon) {
            cartIcon.style.cursor = 'pointer';
            cartIcon.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }

        // "Xem ngay" buttons in banners should go to shop
        document.querySelectorAll('.btn-white').forEach(btn => {
            if (btn.textContent.trim() === 'Xem ngay') {
                btn.addEventListener('click', () => {
                    window.location.href = 'shop.html';
                });
            }
        });

        // "Đặt Ngay" buttons should scroll to products section
        document.querySelectorAll('.btn-primary').forEach(btn => {
            if (btn.textContent.trim() === 'Đặt Ngay') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });

        // Newsletter subscription buttons
        document.querySelectorAll('button[type="submit"]').forEach(btn => {
            if (btn.textContent.trim() === 'Đăng Ký') {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const form = this.closest('form');
                    const email = form.querySelector('input[type="email"]').value;

                    if (!email || !email.includes('@')) {
                        showNotification('Vui lòng nhập email hợp lệ!', 'error');
                        return;
                    }

                    // Simulate subscription
                    showNotification('Cảm ơn bạn đã đăng ký! Voucher sẽ được gửi đến email của bạn.', 'success');
                    form.reset();
                });
            }
        });

        // Contact form submit
        const contactForm = document.querySelector('#form-details form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = this.querySelector('input[placeholder*="Tên"]').value;
                const email = this.querySelector('input[placeholder*="Email"]').value;
                const message = this.querySelector('textarea').value;

                if (!name || !email || !message) {
                    showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                    return;
                }

                showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.', 'success');
                this.reset();
            });
        }

        // Cart page buttons
        const applyBtn = document.querySelector('button.normal');
        if (applyBtn && applyBtn.textContent.trim() === 'Áp dụng') {
            applyBtn.addEventListener('click', () => {
                showNotification('Mã giảm giá đã được áp dụng!', 'success');
            });
        }

        const checkoutBtn = document.querySelector('button.normal');
        if (checkoutBtn && (checkoutBtn.textContent.trim() === 'Tiến hành kiểm tra' || checkoutBtn.textContent.trim() === 'Tiến hành thanh toán')) {
            checkoutBtn.addEventListener('click', () => {
                showNotification('Đang chuyển hướng đến trang thanh toán...', 'info');
                // In a real app, this would redirect to payment page
                setTimeout(() => {
                    showNotification('Tính năng thanh toán đang được phát triển!', 'info');
                }, 1500);
            });
        }
    };

    // ===== NOTIFICATION SYSTEM =====
    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;

        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = '#4CAF50';
                break;
            case 'error':
                notification.style.background = '#f44336';
                break;
            case 'info':
                notification.style.background = '#2196F3';
                break;
            default:
                notification.style.background = '#333';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    };

    // ===== CART FUNCTIONALITY =====
    const cartFunctionality = () => {
        let cartCount = 0;
        const cartIcon = document.querySelector('.fa-cart-shopping');

        // Add to cart functionality
        document.querySelectorAll('.btn-outline').forEach(btn => {
            btn.addEventListener('click', function() {
                cartCount++;
                updateCartCount();
                showCartNotification(this.closest('.product-card').querySelector('h3').textContent);
            });
        });

        const updateCartCount = () => {
            let badge = document.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4757;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: bold;
                `;
                cartIcon.parentElement.style.position = 'relative';
                cartIcon.parentElement.appendChild(badge);
            }
            badge.textContent = cartCount;
        };

        const showCartNotification = (productName) => {
            showNotification(`Đã thêm ${productName} vào giỏ hàng!`, 'success');
        };

        // Cart page functionality
        const cartPageFunctionality = () => {
            // Handle quantity changes
            const quantityInputs = document.querySelectorAll('#cart table tbody input[type="number"]');
            quantityInputs.forEach(input => {
                input.addEventListener('change', function() {
                    updateCartTotals();
                });
            });

            // Handle item removal
            const removeButtons = document.querySelectorAll('#cart table tbody td a');
            removeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const row = this.closest('tr');
                    const productName = row.querySelector('td:nth-child(3)').textContent;
                    row.remove();
                    showNotification(`Đã xóa ${productName} khỏi giỏ hàng!`, 'info');
                    updateCartTotals();
                });
            });
        };

        const updateCartTotals = () => {
            const rows = document.querySelectorAll('#cart table tbody tr');
            let total = 0;

            rows.forEach(row => {
                const priceText = row.querySelector('td:nth-child(4)').textContent;
                const quantity = parseInt(row.querySelector('input[type="number"]').value) || 1;
                // Parse price by removing all non-digit characters
                const price = parseInt(priceText.replace(/[^\d]/g, ''));

                const rowTotal = price * quantity;
                row.querySelector('td:nth-child(6)').textContent = rowTotal.toLocaleString('vi-VN') + 'đ';
                total += rowTotal;
            });

            // Update subtotal table
            const subtotalTable = document.querySelector('#subtotal table');
            if (subtotalTable) {
                const subtotalRow = subtotalTable.querySelector('tr:first-child td:last-child');
                const totalRow = subtotalTable.querySelector('tr:last-child td:last-child');

                if (subtotalRow) subtotalRow.textContent = total.toLocaleString('vi-VN') + 'đ';
                if (totalRow) totalRow.textContent = total.toLocaleString('vi-VN') + 'đ';
            }
        };

        // Initialize cart page functionality
        if (document.querySelector('#cart')) {
            cartPageFunctionality();
            updateCartTotals();
        }
    };

    // ===== ADD CSS ANIMATIONS =====
    const addCSSAnimations = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile Menu Styles */
            .mobile-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: #400303;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
            }

            .mobile-menu-active {
                left: 0;
            }

            .mobile-menu a {
                margin: 1rem 0;
                font-size: 1.2rem;
            }

            /* Scroll Animations */
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }

            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            /* Loading Animation */
            .loading {
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .loaded {
                opacity: 1;
            }

            /* Keyframe Animations */
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }

            /* Header smooth transition */
            .header {
                transition: transform 0.3s ease;
            }

            /* Button hover effects */
            .btn {
                transition: all 0.3s ease;
            }

            .btn:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    };

    // ===== INITIALIZE ALL FUNCTIONS =====
    const init = () => {
        addCSSAnimations();
        createMobileMenu();
        smoothScroll();
        scrollAnimations();
        stickyHeader();
        productCardEffects();
        newsletterValidation();
        loadingAnimation();
        lazyLoadImages();
        buttonNavigation();
        cartFunctionality();
    };

    init();

});