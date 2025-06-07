// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
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
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Animated Counter for Stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (target === 1.5) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        if (current >= target) {
            if (target === 1.5) {
                element.textContent = '1.5';
            } else {
                element.textContent = target;
            }
            clearInterval(timer);
        }
    }, 20);
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

// Separate observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseFloat(entry.target.getAttribute('data-count'));
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Separate observer for skill bars - FIXED
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        skillProgress.style.width = width;
                    }, 200);
                }
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// General animation observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.1
});

// Testimonials Slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    testimonialItems.forEach((item, i) => {
        if (item) {
            item.classList.toggle('active', i === index);
        }
    });
};

const nextTestimonial = () => {
    if (testimonialItems.length > 0) {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }
};

// Auto-rotate testimonials
if (testimonialItems.length > 1) {
    setInterval(nextTestimonial, 5000);
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#28a745';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
                alert('Thank you for your message! I will get back to you within 24 hours.');
            }, 2000);
        }, 1500);
    });
}

// Floating Animation for Hero Shapes
const shapes = document.querySelectorAll('.shape');
if (shapes.length > 0) {
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    parallaxElements.forEach(element => {
        if (element) {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// Add hover effects to interactive elements
const interactiveElements = document.querySelectorAll('.btn, .service-card, .portfolio-item, .package-card');
if (cursor && cursorFollower && interactiveElements.length > 0) {
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Typing Effect for Hero Title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleLines = heroTitle.querySelectorAll('.title-line');
    if (titleLines.length > 0) {
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 300 + 500);
        });
    }
}

// Portfolio Filter Function
const portfolioItems = document.querySelectorAll('.portfolio-item');
const filterPortfolio = (category) => {
    portfolioItems.forEach(item => {
        if (item) {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        }
    });
};

// Lazy Loading for Images
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Performance Optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Hide/show cursor based on screen size
    if (cursor && cursorFollower) {
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        } else {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
        }
    }
}, 250));

// Add ripple effect to buttons
const addRippleEffect = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
};

// Add ripple effect to buttons
document.querySelectorAll('.btn, .package-btn, .submit-btn').forEach(btn => {
    if (btn) {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.addEventListener('click', addRippleEffect);
    }
});

// CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00ff88, #0066ff);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Set counter values - CORRECTED VALUES
    const counters = document.querySelectorAll('.stat-number');
    const counterValues = [24, 11, 1.5]; // 24 Projects, 11 Clients, 1.5 Years Experience
    
    counters.forEach((counter, index) => {
        if (counter && counterValues[index] !== undefined) {
            counter.setAttribute('data-count', counterValues[index]);
        }
    });
    
        // Observe stat numbers for counter animation
    document.querySelectorAll('.stat-number').forEach(el => {
        if (el) {
            counterObserver.observe(el);
        }
    });

    // Initialize skill bars with percentages - FIXED
    const skillItems = document.querySelectorAll('.skill-item');
    const skillData = [
        { name: 'React & Next.js', percentage: 95 },
        { name: 'Node.js & Express', percentage: 90 },
        { name: 'MongoDB & PostgreSQL', percentage: 85 },
        { name: 'UI/UX Design', percentage: 80 }
    ];
    
    skillItems.forEach((skillItem, index) => {
        const skillProgress = skillItem.querySelector('.skill-progress');
        if (skillProgress && skillData[index]) {
            skillProgress.setAttribute('data-width', `${skillData[index].percentage}%`);
        }
    });

    // Observe skill items for skill bar animation
    document.querySelectorAll('.skill-item').forEach(el => {
        if (el) {
            skillObserver.observe(el);
        }
    });

    // Observe other elements for general animations
    document.querySelectorAll('.service-card, .portfolio-item, .package-card').forEach(el => {
        if (el) {
            el.classList.add('animate-on-scroll');
            animationObserver.observe(el);
        }
    });
});

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    if (section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        fadeInObserver.observe(section);
    }
});

// Magnetic effect for buttons
const magneticElements = document.querySelectorAll('.btn, .portfolio-link, .social-links a');

magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// Text reveal animation
const revealText = (element) => {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${index * 0.02}s`;
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 100);
    });
};

// Apply text reveal to headings when they come into view
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            revealText(entry.target);
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    if (title) {
        textRevealObserver.observe(title);
    }
});

// Particle system for hero section
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00ff88;
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
};

createParticles();

// Enhanced form validation
const enhanceFormValidation = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #ff4757;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        input.parentNode.appendChild(errorElement);
        
        input.addEventListener('blur', () => {
            validateField(input, errorElement);
        });
        
        input.addEventListener('input', () => {
            if (errorElement.style.opacity === '1') {
                validateField(input, errorElement);
            }
        });
    });
    
    const validateField = (field, errorElement) => {
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        
        if (isValid) {
            field.style.borderColor = '#00ff88';
            errorElement.style.opacity = '0';
        } else {
            field.style.borderColor = '#ff4757';
            errorElement.textContent = message;
            errorElement.style.opacity = '1';
        }
        
        return isValid;
    };
};

enhanceFormValidation();

// Preload critical resources
const preloadResources = () => {
    const criticalImages = [
        'tinywow_profile_photo_66777821.png',
        'Project1.avif',
        'project2.avif',
        'project3.avif'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

preloadResources();

// Performance monitoring
const performanceMonitor = {
    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Performance:', {
                        'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                        'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
                    });
                }, 0);
            });
        }
    }
};

performanceMonitor.init();

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling for missing elements
const safeQuerySelector = (selector) => {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
};

// Final initialization
console.log('🚀 Portfolio fully loaded and optimized!');

// Export functions for potential external use
window.PortfolioApp = {
    addRippleEffect,
    revealText,
    debounce,
    filterPortfolio
};

// Add this to your existing script.js file

// Portfolio View All Functionality
document.addEventListener('DOMContentLoaded', () => {
    const viewAllBtn = document.getElementById('viewAllBtn');
    const allProjects = document.getElementById('allProjects');
    const portfolioFilter = document.querySelector('.portfolio-filter');
    
    if (viewAllBtn && allProjects) {
        viewAllBtn.addEventListener('click', () => {
            const isExpanded = allProjects.style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                allProjects.style.display = 'none';
                portfolioFilter.style.display = 'none';
                viewAllBtn.innerHTML = '<span>View All Projects</span><i class="fas fa-arrow-down"></i>';
                viewAllBtn.classList.remove('expanded');
                
                // Scroll to portfolio section
                document.getElementById('portfolio').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Expand
                allProjects.style.display = 'grid';
                portfolioFilter.style.display = 'flex';
                viewAllBtn.innerHTML = '<span>Show Less</span><i class="fas fa-arrow-up"></i>';
                viewAllBtn.classList.add('expanded');
                
                // Animate new items
                setTimeout(() => {
                    const newItems = allProjects.querySelectorAll('.portfolio-item');
                    newItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }, 100);
            }
        });
    }
    
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allPortfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            allPortfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
    
    // Updated portfolioData array (make sure this matches your current data)
    const portfolioData = [
        {
            title: 'IAB Bagroda',
            description: 'A comprehensive industry membership platform for admin to control all the members. The latest project which caused me a hand injury also. Built with modern React architecture and secure authentication system.',
            image: 'logo.jpeg',
            tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Payment Gateway'],
            liveUrl: 'https://iabbhopal.org/',
            category: 'membership'
        },
        {
            title: 'Narrative Video Editing Portfolio',
            description: 'A stunning video portfolio website for a creative agency with smooth animations and video integration. Features dynamic video backgrounds and interactive gallery.',
            image: 'project2.avif',
            tech: ['Next.js', 'GSAP', 'Framer Motion', 'Video API'],
            liveUrl: 'https://www.narativemedia.com/',
            category: 'creative'
        },
        {
            title: 'Social Media Management',
            description: 'Gained 0 to 10K followers for a DJ team with expert social media management services and strategic content planning. Implemented growth hacking techniques and analytics tracking.',
            image: 'hands-holding-smartphone-social-media-concept.jpg',
            tech: ['Social Strategy', 'Content Creation', 'Analytics', 'Growth Hacking'],
            liveUrl: 'https://www.instagram.com/dvjmohit?igsh=ZzB6MmVxbG0wZ3cz',
            category: 'social-media'
        },
        {
            title: 'Your Project Could Be Here',
            description: 'Let\'s collaborate to bring your vision to life with cutting-edge technology and exceptional design. I specialize in creating custom solutions tailored to your specific needs.',
            image: 'project3.avif',
            tech: ['Your Choice', 'Modern Stack', 'Best Practices', 'Custom Solution'],
            liveUrl: '#contact',
            category: 'future'
        },
        {
            title: 'Yoddha Group - Cement Company',
            description: 'Corporate website for cement manufacturing company featuring product catalog, business solutions, company profile, and contact management. Team collaboration project with advanced CMS.',
            image: 'cement.jpg',
            tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Team Project'],
            liveUrl: 'https://yoddhagroup.com/',
            category: 'industrial'
        },
        {
            title: 'Sox Empower - Taxation Services',
            description: 'Professional taxation and financial services website with client portal, service management, document upload, and consultation booking system. Features secure file handling and automated workflows.',
            image: 'tax.jpg',
            tech: ['WordPress', 'Custom PHP', 'MySQL', 'Bootstrap'],
            liveUrl: 'https://www.soxempower.com/',
            category: 'finance'
        },
        {
            title: 'Fresh Juice Blender - E-commerce',
            description: 'Complete e-commerce platform for kitchen appliances featuring shopping cart, payment gateway, inventory management, product reviews, and order tracking. Integrated with multiple payment providers.',
            image: 'ec0mmerce.jpg',
            tech: ['Shopify', 'Liquid', 'JavaScript', 'Payment Gateway'],
            liveUrl: 'https://freshjuiceblender.com/',
            category: 'ecommerce'
        },
        {
            title: 'Tech Blog Platform',
            description: 'Professional blogging platform with writer dashboard, content management, SEO optimization, and analytics integration for tech reviews and articles. Features advanced content scheduling and social sharing.',
            image: 'blog.jpg',
            tech: ['WordPress', 'Custom Theme', 'SEO', 'Analytics'],
            liveUrl: 'https://www.pcmag.com/picks/best-online-learning-services',
            category: 'blog'
        },
        {
            title: 'QG Agency Collaboration',
            description: 'Multiple projects delivered in collaboration with QG Agency, including corporate websites, digital solutions, and client-focused applications. Maintained high agency standards and client satisfaction.',
            image: 'agency.jpg',
            tech: ['Team Work', 'Multiple Tech', 'Agency Standards', 'Client Focus'],
            liveUrl: '#contact',
            category: 'agency'
        }
    ];

    // Updated portfolio modal functionality
    const initializePortfolioModals = () => {
        // Get all portfolio items (both featured and expanded)
        const allPortfolioItems = document.querySelectorAll('.portfolio-item');
        
        allPortfolioItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Find the correct data based on the item's title
                const itemTitle = item.querySelector('h3').textContent.trim();
                const projectData = portfolioData.find(project => 
                    project.title === itemTitle || 
                    project.title.includes(itemTitle.split(' ')[0])
                );
                
                if (projectData) {
                    openProjectModal(projectData);
                } else {
                    console.warn('Project data not found for:', itemTitle);
                }
            });
        });
    };

    // Enhanced modal opening function
    const openProjectModal = (data) => {
        let modal = document.querySelector('.project-modal');
        
        if (!modal) {
            modal = createProjectModal();
        }
        
        // Update modal content
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-description').textContent = data.description;
        modal.querySelector('.modal-image img').src = data.image;
        modal.querySelector('.modal-image img').alt = data.title;
        
        // Update tech stack
        const techContainer = modal.querySelector('.modal-tech');
        techContainer.innerHTML = data.tech.map(tech => `<span>${tech}</span>`).join('');
        
        // Update links
        const liveLink = modal.querySelector('.modal-live-link');
        const contactLink = modal.querySelector('.modal-contact-link');
        
        if (data.liveUrl === '#contact') {
            liveLink.style.display = 'none';
            contactLink.style.display = 'flex';
            contactLink.href = '#contact';
        } else {
            liveLink.style.display = 'flex';
            liveLink.href = data.liveUrl;
            contactLink.style.display = 'none';
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Create project modal function
    const createProjectModal = () => {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <div class="modal-image">
                            <img src="" alt="">
                        </div>
                        <div class="modal-info">
                            <h3 class="modal-title"></h3>
                            <p class="modal-description"></p>
                            <div class="modal-tech"></div>
                            <div class="modal-links">
                                <a href="#" class="modal-live-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i> 
                                    <span>View Live Project</span>
                                </a>
                                <a href="#contact" class="modal-contact-link">
                                    <i class="fas fa-envelope"></i> 
                                    <span>Get In Touch</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                closeModal();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        return modal;
    };

    // View All Projects functionality
    const initializeViewAllButton = () => {
        const viewAllBtn = document.getElementById('viewAllBtn');
        const allProjects = document.getElementById('allProjects');
        const portfolioFilter = document.getElementById('portfolioFilter');
        
        if (viewAllBtn && allProjects) {
            let isExpanded = false;
            
            viewAllBtn.addEventListener('click', () => {
                isExpanded = !isExpanded;
                
                if (isExpanded) {
                    allProjects.style.display = 'grid';
                    portfolioFilter.style.display = 'flex';
                    viewAllBtn.querySelector('span').textContent = 'Show Less';
                    viewAllBtn.querySelector('i').classList.replace('fa-arrow-down', 'fa-arrow-up');
                    
                    // Animate in
                    setTimeout(() => {
                        allProjects.style.opacity = '1';
                        allProjects.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // Re-initialize modals for new items
                    setTimeout(() => {
                        initializePortfolioModals();
                    }, 100);
                    
                } else {
                    allProjects.style.opacity = '0';
                    allProjects.style.transform = 'translateY(20px)';
                    portfolioFilter.style.display = 'none';
                    viewAllBtn.querySelector('span').textContent = 'View All Projects';
                    viewAllBtn.querySelector('i').classList.replace('fa-arrow-up', 'fa-arrow-down');
                    
                    setTimeout(() => {
                        allProjects.style.display = 'none';
                    }, 300);
                }
            });
        }
    };

    // Portfolio filter functionality
    const initializePortfolioFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const allItems = document.querySelectorAll('.portfolio-item');
                allItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            if (item.style.opacity === '0') {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    };

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializePortfolioModals();
        initializeViewAllButton();
        initializePortfolioFilter();
    });

    // Also initialize after dynamic content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            initializePortfolioModals();
        }, 500);
    });
});

// Enhanced Portfolio Animations
const enhancePortfolioAnimations = () => {
    // Stagger animation for portfolio items
    const observePortfolioItems = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observePortfolioItems.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Apply to all portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.6s ease';
        observePortfolioItems.observe(item);
    });
};

// Initialize enhanced animations
enhancePortfolioAnimations();

// Portfolio Hover Effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
        item.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Add CSS for Project Modal
const projectModalCSS = `
.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.project-modal.active {
    opacity: 1;
    visibility: visible;
}

.project-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.project-modal .modal-content {
    background: var(--bg-secondary);
    border-radius: 20px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    transform: scale(0.8);
    transition: transform 0.3s ease;
    border: 1px solid var(--border-color);
}

.project-modal.active .modal-content {
    transform: scale(1);
}

.project-modal .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    font-size: 1.5rem;
    color: var(--text-primary);
    cursor: pointer;
    z-index: 1;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.project-modal .modal-close:hover {
    background: var(--primary-color);
    color: var(--bg-primary);
    transform: scale(1.1);
}

.project-modal .modal-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
}

.project-modal .modal-image img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.project-modal .modal-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.project-modal .modal-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.project-modal .modal-tech {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.project-modal .modal-tech span {
    background: var(--primary-color);
    color: var(--bg-primary);
    padding: 0.4rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.project-modal .modal-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.project-modal .modal-live-link,
.project-modal .modal-contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.project-modal .modal-live-link {
    background: var(--gradient-primary);
    color: var(--bg-primary);
}

.project-modal .modal-contact-link {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.project-modal .modal-live-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
}

.project-modal .modal-contact-link:hover {
    background: var(--primary-color);
    color: var(--bg-primary);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .project-modal .modal-body {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
    
    .project-modal .modal-title {
        font-size: 1.5rem;
    }
    
    .project-modal .modal-links {
        flex-direction: column;
    }
    
    .project-modal .modal-live-link,
    .project-modal .modal-contact-link {
        justify-content: center;
        text-align: center;
    }
}

/* Portfolio Loading Animation */
.portfolio-item.loading {
    opacity: 0.5;
    pointer-events: none;
}

.portfolio-item.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Enhanced Portfolio Grid */
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

@media (max-width: 768px) {
    .portfolio-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}

/* Portfolio Category Badges */
.portfolio-item::before {
    content: attr(data-category);
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--primary-color);
    color: var(--bg-primary);
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    z-index: 2;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.portfolio-item:hover::before {
    opacity: 1;
    transform: translateY(0);
}

/* Different colors for different categories */
.portfolio-item[data-category="healthcare"]::before {
    background: #28a745;
}

.portfolio-item[data-category="ecommerce"]::before {
    background: #ffc107;
    color: #000;
}

.portfolio-item[data-category="finance"]::before {
    background: #007bff;
}

.portfolio-item[data-category="industrial"]::before {
    background: #6c757d;
}

.portfolio-item[data-category="creative"]::before {
    background: #dc3545;
}

.portfolio-item[data-category="blog"]::before {
    background: #6610f2;
}

.portfolio-item[data-category="agency"]::before {
    background: #fd7e14;
}

.portfolio-item[data-category="wedding"]::before {
    background: #e83e8c;
}

.portfolio-item[data-category="future"]::before {
    background: var(--gradient-primary);
}
`;

// Add the CSS to the document
const portfolioModalStyle = document.createElement('style');
portfolioModalStyle.textContent = projectModalCSS;
document.head.appendChild(portfolioModalStyle);

// Portfolio Search Functionality (Optional Enhancement)
const addPortfolioSearch = () => {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'portfolio-search';
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" placeholder="Search projects..." class="search-input">
            <i class="fas fa-search search-icon"></i>
        </div>
    `;
    
    const portfolioHeader = document.querySelector('#portfolio .section-header');
    portfolioHeader.appendChild(searchContainer);
    
    const searchInput = searchContainer.querySelector('.search-input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const tech = Array.from(item.querySelectorAll('.portfolio-tech span'))
                .map(span => span.textContent.toLowerCase()).join(' ');
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tech.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
};

// Portfolio Search CSS
const searchCSS = `
.portfolio-search {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}

.search-wrapper {
    position: relative;
    max-width: 400px;
    width: 100%;
}

.search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 25px;
    color: var(--text-primary);
    font-size: 1rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    pointer-events: none;
}

@media (max-width: 768px) {
    .search-wrapper {
        max-width: 300px;
    }
    
    .search-input {
        padding: 0.8rem 0.8rem 0.8rem 2.5rem;
        font-size: 0.9rem;
    }
}
`;

const searchStyle = document.createElement('style');
searchStyle.textContent = searchCSS;
document.head.appendChild(searchStyle);

// Initialize search functionality
addPortfolioSearch();

// Portfolio Analytics (Optional)
const trackPortfolioInteractions = () => {
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Portfolio item clicked: ${index + 1}`);
            // You can add Google Analytics or other tracking here
        });
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(`Filter applied: ${btn.getAttribute('data-filter')}`);
        });
    });
};

trackPortfolioInteractions();

// Lazy loading for portfolio images
const lazyLoadPortfolioImages = () => {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    portfolioImages.forEach(img => {
        if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';
        }
        imageObserver.observe(img);
    });
};

lazyLoadPortfolioImages();

console.log('✅ Enhanced Portfolio with 8+ projects loaded successfully!');
