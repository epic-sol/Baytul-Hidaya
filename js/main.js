// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-item h3').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Smooth scroll for anchor links
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

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message
        alert('Thank you for subscribing! You will receive our newsletter at: ' + email);
        
        // Reset form
        newsletterForm.reset();
    });
}

// Function to initialize scroll animations
function initializeScrollAnimations() {
    // Add fade-in-up animation to hero content
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.classList.add('fade-in-up');
    }
    
    if (heroImage) {
        heroImage.classList.add('fade-in-up');
        heroImage.style.animationDelay = '0.3s';
    }
    
    // Add animation classes to cards only for elements below the fold
    document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .blog-card').forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isBelowFold = rect.top > window.innerHeight;
        
        if (isBelowFold) {
            card.classList.add('animate-on-scroll');
            card.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    // Add animation classes to stats only for elements below the fold
    document.querySelectorAll('.stat-item').forEach((stat, index) => {
        const rect = stat.getBoundingClientRect();
        const isBelowFold = rect.top > window.innerHeight;
        
        if (isBelowFold) {
            stat.classList.add('animate-on-scroll');
            stat.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    // Add animation classes to process steps only for elements below the fold
    document.querySelectorAll('.process-step').forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const isBelowFold = rect.top > window.innerHeight;
        
        if (isBelowFold) {
            step.classList.add('animate-on-scroll');
            step.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    // Don't add animate-on-scroll to why-family-card since they have CSS animations
    // The CSS animations will handle their visibility
    
    // Now set up the observer after elements have been marked with animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
        // Check if element is already in viewport on page load
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            element.classList.add('visible');
        }
    });
}

// Add animation classes to elements on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollAnimations);
} else {
    // DOM is already loaded, initialize immediately
    initializeScrollAnimations();
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stats section for counter animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when they come into view
                document.querySelectorAll('.stat-item h3').forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Video modal (if needed)
function openVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add hover effects to cards
document.querySelectorAll('.course-card, .testimonial-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation for contact form (if exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ccc';
            }
        });
        
        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Mobile-specific improvements
// Prevent horizontal scroll on mobile
function preventHorizontalScroll() {
    const body = document.body;
    const html = document.documentElement;
    
    // Add touch-action styles for better mobile experience
    if ('ontouchstart' in window) {
        body.style.touchAction = 'pan-y';
        body.style.overscrollBehavior = 'contain';
    }
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768);
}

// Add mobile-specific optimizations
if (isMobileDevice()) {
    // Reduce animations on mobile for better performance
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    
    // Disable hover effects on touch devices
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) and (pointer: coarse) {
            .course-card:hover,
            .testimonial-card:hover,
            .blog-card:hover,
            .feature-card:hover,
            .stat-item:hover,
            .process-step:hover,
            .why-item:hover,
            .value-card:hover,
            .team-card:hover,
            .contact-card:hover,
            .why-family-card:hover,
            .why-feature-item:hover,
            .faq-item:hover {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Improve tap targets on mobile
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp, .btn-course, .social-icons a').forEach(btn => {
        btn.style.minHeight = '44px';
        btn.style.minWidth = '44px';
    });
}

// Handle viewport meta tag for mobile
function setViewportMeta() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport && isMobileDevice()) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add smooth scroll offset for fixed header
function adjustScrollPosition() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle mobile menu visibility on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Show hamburger on mobile, hide on desktop
        if (window.innerWidth <= 768) {
            hamburger.style.opacity = '1';
        } else {
            hamburger.style.opacity = '0';
        }
    }, 250);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Initialize mobile optimizations
preventHorizontalScroll();
setViewportMeta();
adjustScrollPosition();

console.log('BAYTUL HIDAYA website loaded successfully!');