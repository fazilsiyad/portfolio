document.addEventListener('DOMContentLoaded', () => {
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

    // 3. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
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
});
