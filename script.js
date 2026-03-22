document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        
        const phase1 = preloader.querySelector('.phase-1');
        const phase2 = preloader.querySelector('.phase-2');
        const tiles = preloader.querySelectorAll('.logo-tile');

        const tools = [
            { icon: 'https://cdn.simpleicons.org/adobeaftereffects/cf96fd', class: 'tile-ae' },
            { icon: 'https://cdn.simpleicons.org/adobepremierepro/ea77ff', class: 'tile-pr' },
            { icon: 'https://cdn.simpleicons.org/blender/e87d0d', class: 'tile-bl' },
            { icon: 'https://cdn.simpleicons.org/figma/ff7262', class: 'tile-fg' },
            { icon: 'https://cdn.simpleicons.org/openai/74aa9c', class: 'tile-chat' },
            { icon: 'https://cdn.simpleicons.org/visualstudiocode/007acc', class: 'tile-vs' },
            { icon: 'https://cdn.simpleicons.org/google/ffffff', class: 'tile-ag' }
        ];

        // Shuffle Animation
        let intervalCount = 0;
        const shuffler = setInterval(() => {
            tiles.forEach(tile => {
                const tool = tools[Math.floor(Math.random() * tools.length)];
                const iconImg = tile.querySelector('.tile-icon');
                if(iconImg) iconImg.src = tool.icon;
                
                tile.className = 'logo-tile has-icon ' + tool.class;
            });
            
            intervalCount++;
            if(intervalCount > 10) { // Shorter shuffle (~1.2s)
                clearInterval(shuffler);
                
                // Settling on (De Si Gn Er)
                const combination = ['De', 'Si', 'Gn', 'Er'];
                tiles.forEach((tile, index) => {
                    const textSpan = tile.querySelector('.tile-text');
                    if(textSpan) textSpan.textContent = combination[index];
                    tile.className = 'logo-tile settled'; 
                });

                // Phase 1 ends around 1.7s
                setTimeout(() => {
                    phase1.classList.remove('active');
                    setTimeout(() => {
                        phase2.classList.add('active');
                        // Split timing: trigger revealing faster
                        setTimeout(() => {
                            phase2.classList.add('revealing');
                            setTimeout(() => {
                                preloader.classList.add('do-morph');
                            }, 500); // Morph starts at ~2.8s
                        }, 400); // Reveals at ~2.3s
                    }, 200);
                }, 500);
            }
        }, 120);

        // Final Dissolve at 3.5s
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            setTimeout(() => preloader.remove(), 800);
        }, 3500);
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
