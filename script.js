document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    // 1. Loading Animation (Focused on Phase 2: Happiness/Faiziness)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        
        const phase2 = preloader.querySelector('.phase-2');

        // Start animation sequence
        setTimeout(() => {
            if (phase2) phase2.classList.add('revealing');
            
            // Trigger morph
            setTimeout(() => {
                preloader.classList.add('do-morph');
            }, 600);
            
            // Final fade out
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.style.overflow = '';
                setTimeout(() => preloader.remove(), 800);
            }, 1800);

        }, 400); // Small initial delay for smooth start
    }

    const navbar = document.querySelector('.navbar');
    
    let lastScrollY = window.scrollY;

    // Hide navbar on scroll down, show on scroll up or mouse at top
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // Show navbar when mouse is near the top of the screen
    window.addEventListener('mousemove', (e) => {
        if (e.clientY < 150) {
            navbar.classList.remove('hidden');
        }
    });

    // --- Mobile Navigation Logic ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinkItems = document.querySelectorAll('.nav-links li a');

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is active
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Smooth scroll for anchor links & Modal trigger
    const modalOverlay = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#contact' || targetId === '#contact-modal') {
                if(modalOverlay) modalOverlay.classList.add('active');
                return;
            }
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    if(modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formView.classList.add('hidden');
            successView.classList.remove('hidden');
        });
    }

    // Initialize Swiper Coverflow for Recent Works
    if (typeof Swiper !== 'undefined') {
        const worksSwiper = new Swiper('.works-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            speed: 700,
            coverflowEffect: {
                rotate: 0,
                stretch: -60,
                depth: 200,
                modifier: 1.5,
                slideShadows: true,
                scale: 0.9,
            },
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    }
});
