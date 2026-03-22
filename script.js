document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        
        const phase1 = preloader.querySelector('.phase-1');
        const phase2 = preloader.querySelector('.phase-2');
        const typingEl = preloader.querySelector('.typing-text');
        const typeText = "the best in..";

        // Phase 1: Typing
        let i = 0;
        const typer = setInterval(() => {
            if(typingEl) typingEl.textContent += typeText[i];
            i++;
            if(i >= typeText.length) {
                clearInterval(typer);
                
                // Dissolve Phase 1 after typing finish
                setTimeout(() => {
                    phase1.classList.remove('active');
                    
                    // Show Phase 2
                    setTimeout(() => {
                        phase2.classList.add('active');
                        
                        // Pic moves left + Text reveals (Snappier)
                        setTimeout(() => {
                            phase2.classList.add('revealing');
                            
                            // Morph Text (Snappier)
                            setTimeout(() => {
                                preloader.classList.add('do-morph');
                            }, 500);
                        }, 350);
                    }, 350);
                }, 350);
            }
        }, 50); // Snappier typing too
        // Final Dissolve
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            setTimeout(() => preloader.remove(), 800);
        }, 3000);
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
