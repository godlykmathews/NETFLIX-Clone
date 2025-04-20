document.addEventListener('DOMContentLoaded', function() {
    // Handle accordion functionality for FAQ section
    var accordions = document.getElementsByClassName("accordion");
    
    for (var i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function() {
            // Toggle active class
            this.classList.toggle("active");
            
            // Toggle panel visibility
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
    
    // Email validation for the forms
    const emailForms = document.querySelectorAll('.email-form');
    
    emailForms.forEach(form => {
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        
        button.addEventListener('click', function() {
            const email = input.value.trim();
            if (validateEmail(email)) {
                alert('Thank you for your interest! This is a demo site.');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Language selector functionality
    const languageSelectors = document.querySelectorAll('select');
    
    languageSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            // In a real app, this would change the language
            alert(`Language changed to: ${this.value}`);
        });
    });
    
    // NEW FEATURE: Sticky Navigation
    const navbar = document.querySelector('.navbar-container');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // NEW FEATURE: Show Card Preview on Hover
    const showCards = document.querySelectorAll('.show-card');
    
    showCards.forEach(card => {
        // Add a small delay before showing the preview info
        let hoverTimer;
        
        card.addEventListener('mouseenter', function() {
            hoverTimer = setTimeout(() => {
                // Add a subtle animation/transition
                this.style.transform = 'scale(1.1)';
                
                // On a real Netflix, this would trigger video preview
                // For our demo, we'll just ensure the info card shows up
                const infoCard = this.querySelector('.show-info');
                infoCard.style.opacity = '1';
                infoCard.style.transform = 'translateY(0)';
            }, 300);
        });
        
        card.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer);
            this.style.transform = 'scale(1)';
            
            const infoCard = this.querySelector('.show-info');
            infoCard.style.opacity = '0';
            infoCard.style.transform = 'translateY(20px)';
        });
        
        // Add click functionality (in a real app, this would play the content)
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Now playing: ${title}`);
        });
    });

    // NEW FEATURE: Theme Toggle
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme preference
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
    } else if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        themeToggle.checked = false;
    } else if (systemPrefersDark) {
        body.classList.remove('light-mode');
        themeToggle.checked = false;
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    body.classList.remove('light-mode');
                    themeToggle.checked = false;
                } else {
                    body.classList.add('light-mode');
                    themeToggle.checked = true;
                }
            }
        });
    }
});
