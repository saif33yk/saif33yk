// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: false,
    offset: 120
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('theme-switch');
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeSwitch.checked = true;
        document.body.classList.add('light-mode');
    }
    
    // Initialize slideshows
    $('.cars-slideshow').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        lazyLoad: 'ondemand',
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    
    $('.community-slideshow').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        lazyLoad: 'ondemand',
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    
    // GSAP Animations
    
    // Sticky Navigation Animation
    gsap.to('.nav', {
        scrollTrigger: {
            trigger: '.header',
            start: 'bottom top',
            toggleActions: 'play none none reverse'
        },
        padding: '10px 0',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        duration: 0.3
    });
    
    // Header Parallax Effect
    gsap.to('.header::before', {
        scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '0 100%',
        ease: 'none'
    });
    
    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            innerHTML: isDecimal ? target.toFixed(1) : Math.floor(target),
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: isDecimal ? 0.1 : 1 },
            onUpdate: function() {
                if (isDecimal) {
                    stat.innerHTML = parseFloat(stat.innerHTML).toFixed(1);
                } else {
                    stat.innerHTML = parseInt(stat.innerHTML).toLocaleString();
                }
                
                // Add + or % symbol based on the stat
                if (stat.innerHTML.indexOf('.') > -1) {
                    stat.innerHTML += '%';
                } else if (!stat.innerHTML.includes('+') && !stat.innerHTML.includes('%')) {
                    stat.innerHTML += '+';
                }
            }
        });
    });
    
    // Glitch Text Effect Enhancement
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            gsap.to(glitchText, {
                skewX: gsap.utils.random(-5, 5),
                skewY: gsap.utils.random(-3, 3),
                duration: 0.1,
                onComplete: () => {
                    gsap.to(glitchText, {
                        skewX: 0,
                        skewY: 0,
                        duration: 0.1
                    });
                }
            });
        }, gsap.utils.random(3000, 5000));
    }
    
    // Service Cards Stagger Animation
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Parallax Effect for Background Elements
    gsap.to('.city-skyline', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        y: '20%',
        ease: 'none'
    });
    
    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('.slide-image');
    
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('src');
                
                // Only process if src exists and doesn't contain 'data:image'
                if (src && !src.includes('data:image')) {
                    // Create a new image to preload
                    const preloadImg = new Image();
                    preloadImg.src = src;
                    
                    // When the image is loaded, add a class to fade it in
                    preloadImg.onload = () => {
                        img.classList.add('loaded');
                    };
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all lazy images
    lazyImages.forEach(image => {
        lazyLoadObserver.observe(image);
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });
    
    // Button Hover Effects Enhancement
    const buttons = document.querySelectorAll('.btn, .learn-more');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('i'), {
                rotation: 15,
                scale: 1.2,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('i'), {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Add Parallax Effect to Palm Tree
    gsap.to('.palm-tree', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        y: '100px',
        rotation: 5,
        ease: 'none'
    });
    
    // Performance Optimization
    // Debounce function to limit the rate at which a function can fire
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Debounced scroll event handler
    const debouncedScroll = debounce(function() {
        // Any heavy scroll operations can go here
    }, 100);
    
    // Add the debounced event listener
    window.addEventListener('scroll', debouncedScroll);
    
    // Optimize animations on mobile
    function optimizeForMobile() {
        if (window.innerWidth < 768) {
            // Reduce animation complexity on mobile
            AOS.init({
                disable: false,
                duration: 600,
                once: true
            });
            
            // Reduce the number of particles or other heavy animations
            document.querySelectorAll('.background-effects').forEach(el => {
                el.style.opacity = '0.5';
            });
        }
    }
    
    // Run optimization on load and resize
    optimizeForMobile();
    window.addEventListener('resize', debounce(optimizeForMobile, 250));
});

// Add page transition effects
window.addEventListener('beforeunload', function() {
    // Add a class to the body to trigger the exit animation
    document.body.classList.add('page-exit');
});

// Preload critical resources
function preloadResources() {
    // Preload important images
    const criticalImages = [
        'img/rp-banner.jpg',
        'img/palm-tree.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Run preload as soon as possible
preloadResources();

// Handle visibility change to pause/resume animations when tab is not active
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations to save resources
        $('.cars-slideshow, .community-slideshow').slick('slickPause');
    } else {
        // Resume animations when tab is visible again
        $('.cars-slideshow, .community-slideshow').slick('slickPlay');
    }
});
