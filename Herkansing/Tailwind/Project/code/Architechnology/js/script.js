// Architechnology - Main JavaScript

// Mobile Menu Toggle Functionality
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Budget Range Slider Functionality
const budgetRange = document.getElementById('budgetRange');
const budgetValue = document.getElementById('budgetValue');

if (budgetRange && budgetValue) {
    budgetRange.addEventListener('input', function() {
        const value = parseInt(this.value);
        budgetValue.textContent = new Intl.NumberFormat('nl-NL').format(Math.round(value / 1000) * 1000);
    });
    
    // Initialize display value
    const initialValue = parseInt(budgetRange.value);
    budgetValue.textContent = new Intl.NumberFormat('nl-NL').format(Math.round(initialValue / 1000) * 1000);
}

// Smooth scroll for internal links
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


// Contact/Project Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Check if this is the contact form with the budget range
        if (form.querySelector('#budgetRange')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const voornaam = this.querySelector('input[placeholder=""]');
                const email = this.querySelector('input[type="email"]').value;
                const phone = this.querySelector('input[type="tel"]').value;
                const adres = this.querySelector('input[placeholder="Straatnaam, huisnummer"]').value;
                const budget = this.querySelector('#budgetRange').value;
                const startDate = this.querySelector('input[type="date"]').value;
                const privacy = this.querySelector('input[type="checkbox"]:last-of-type').checked;
                
                // Get selected wishes
                const wishes = [];
                this.querySelectorAll('input[type="checkbox"]:not(:last-of-type):not(:nth-last-of-type(2))').forEach(checkbox => {
                    if (checkbox.checked) {
                        wishes.push(checkbox.parentElement.textContent.trim());
                    }
                });
                
                // Validate required fields
                const emailInput = this.querySelector('input[type="email"]');
                const required = this.querySelectorAll('[required]');
                let isValid = true;
                
                required.forEach(field => {
                    if (field.type === 'checkbox') {
                        if (!field.checked) isValid = false;
                    } else if (!field.value) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    alert('Vul alstublieft alle verplichte velden in');
                    return;
                }
                
                // Show success message
                alert('Bedankt voor uw vragenlijst! We zullen deze snel doornemen en contact met u opnemen.');
                this.reset();
            });
            return;
        }
        
        // Original contact form handler for other forms
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]');
            const hasTextarea = this.querySelector('textarea');
            
            if (email && hasTextarea) {
                // Old contact form
                const message = hasTextarea.value;
                if (!email.value || !message) {
                    alert('Vul alstublieft alle verplichte velden in');
                    return;
                }
                alert('Bedankt voor uw bericht! We nemen snel contact met u op.');
            } else if (this.querySelector('input[type="file"]')) {
                // Application form
                const fields = this.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                fields.forEach(field => {
                    if (!field.value) isValid = false;
                });
                if (!isValid) {
                    alert('Vul alstublieft alle verplichte velden in');
                    return;
                }
                alert('Dank u wel voor uw sollicitatie! We zullen uw gegevens bekijken en u snel contacteren.');
            }
            
            this.reset();
        });
    });
});


// Button Click Effects
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = ripple.style.height = '500px';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Navigation Active State
window.addEventListener('load', function() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            currentLocation.includes(link.getAttribute('href').replace('/', ''))) {
            link.classList.add('text-purple-400');
        }
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

if (navbar) {
    window.addEventListener('scroll', function() {
        lastScroll = window.scrollY;
        
        if (lastScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// More Details Button Handler
const moreDetailsButtons = document.querySelectorAll('button:contains("Meer Details")');
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Meer Details')) {
        btn.addEventListener('click', function() {
            alert('Meer informatie over dit product is binnenkort beschikbaar!');
        });
    }
});

// Solliciteer Button Handler
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Solliciteer Nu')) {
        btn.addEventListener('click', function() {
            // Scroll to application form
            const form = document.querySelector('form');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('section, .bg-gray-800').forEach(el => {
    observer.observe(el);
});

// Responsive Menu Toggle (if implemented)
function toggleMobileMenu() {
    const menu = document.querySelector('ul');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus here
    }
});

// Console message
console.log('Architechnology - Futuristische architectuur voor morgen');
