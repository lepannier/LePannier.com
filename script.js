document.addEventListener('DOMContentLoaded', () => {
    // Add simple drag functionality to the hero lego blocks
    const blocks = document.querySelectorAll('.lego-block');
    
    blocks.forEach(block => {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        block.addEventListener('mousedown', dragStart);
        
        function dragStart(e) {
            isDragging = true;
            // Stop the CSS animation while dragging
            block.style.animation = 'none';
            block.style.zIndex = 10;
            
            // Calculate initial positions
            const rect = block.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            startX = e.clientX - initialX;
            startY = e.clientY - initialY;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            const currentX = e.clientX - startX;
            const currentY = e.clientY - startY;
            
            // Get parent container position to keep it relative
            const parentRect = block.parentElement.getBoundingClientRect();
            const relativeX = currentX - parentRect.left;
            const relativeY = currentY - parentRect.top;
            
            block.style.left = `${relativeX}px`;
            block.style.top = `${relativeY}px`;
            block.style.bottom = 'auto';
            block.style.right = 'auto';
            block.style.transform = 'rotate(0deg) scale(1.05)';
        }

        function dragEnd(e) {
            initialX = currentX = currentY = 0;
            isDragging = false;
            block.style.zIndex = 1;
            block.style.transform = 'rotate(0deg) scale(1)';
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Burger menu toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            const isActive = burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            burgerMenu.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});
revealElements.forEach(el => revealObserver.observe(el));
