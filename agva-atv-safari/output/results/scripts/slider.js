/**
 * Ağva ATV Safari - Hero Slider JavaScript
 * Hero carousel fonksiyonları
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSlider();
});

/**
 * Hero slider'ı başlat
 */
function initializeHeroSlider() {
    const heroCarousel = document.getElementById('heroCarousel');
    if (!heroCarousel) return;
    
    // Bootstrap carousel instance
    const carousel = new bootstrap.Carousel(heroCarousel, {
        interval: 5000,  // 5 saniye
        ride: 'carousel',
        pause: 'hover',
        wrap: true,
        keyboard: true,
        touch: true
    });
    
    // Carousel olayları
    heroCarousel.addEventListener('slide.bs.carousel', function(e) {
        console.log(`Slider geçiş: ${e.from} -> ${e.to}`);
        
        // Slide geçiş animasyonu
        const activeSlide = e.relatedTarget;
        const heroContent = activeSlide.querySelector('.hero-content');
        
        if (heroContent) {
            // Giriş animasyonu sıfırla
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            // Animasyonu tetikle
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 200);
        }
    });
    
    // Slide değiştiğinde
    heroCarousel.addEventListener('slid.bs.carousel', function(e) {
        updateSlideIndicators(e.to);
    });
    
    // Touch/swipe desteği
    initializeTouchSupport(heroCarousel, carousel);
    
    // Auto-play kontrolü
    initializeAutoPlayControls(heroCarousel, carousel);
    
    // Keyboard kontrolü
    initializeKeyboardControls(carousel);
    
    // İlk slide için animasyon
    setTimeout(() => {
        const firstSlideContent = heroCarousel.querySelector('.carousel-item.active .hero-content');
        if (firstSlideContent) {
            firstSlideContent.style.opacity = '1';
            firstSlideContent.style.transform = 'translateY(0)';
        }
    }, 100);
}

/**
 * Slide gösterge güncelle
 */
function updateSlideIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.carousel-indicators button');
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

/**
 * Touch/swipe desteği
 */
function initializeTouchSupport(carousel, carouselInstance) {
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', function(e) {
        // Dikey scroll'u engelle
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        
        if (deltaX > deltaY && deltaX > 50) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = Math.abs(startY - endY);
        
        // Sadece horizontal swipe'ı algıla
        if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Sol swipe - sonraki slide
                carouselInstance.next();
            } else {
                // Sağ swipe - önceki slide
                carouselInstance.prev();
            }
        }
    }, { passive: true });
}

/**
 * Auto-play kontrolları
 */
function initializeAutoPlayControls(carousel, carouselInstance) {
    let isPlaying = true;
    
    // Hover durumunda durdur
    carousel.addEventListener('mouseenter', function() {
        if (isPlaying) {
            carouselInstance.pause();
        }
    });
    
    carousel.addEventListener('mouseleave', function() {
        if (isPlaying) {
            carouselInstance.cycle();
        }
    });
    
    // Sayfa görünürlük değiştiğinde
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            carouselInstance.pause();
        } else if (isPlaying) {
            carouselInstance.cycle();
        }
    });
    
    // Play/Pause toggle (opsiyonel)
    const playPauseBtn = document.getElementById('carouselPlayPause');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                carouselInstance.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                carouselInstance.cycle();
                this.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        });
    }
}

/**
 * Keyboard kontrolları
 */
function initializeKeyboardControls(carouselInstance) {
    document.addEventListener('keydown', function(e) {
        // Sadece carousel görünür ve fokusta olduğunda
        const heroSection = document.getElementById('home');
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    carouselInstance.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    carouselInstance.next();
                    break;
                case ' ': // Space bar
                    e.preventDefault();
                    // Play/pause toggle
                    break;
            }
        }
    });
}

/**
 * Slide progress bar (opsiyonel)
 */
function initializeProgressBar() {
    const progressBar = document.getElementById('slideProgressBar');
    if (!progressBar) return;
    
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    let currentSlide = 0;
    const interval = 5000; // 5 saniye
    
    function updateProgress() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // Carousel olaylarını dinle
    const carousel = document.getElementById('heroCarousel');
    carousel.addEventListener('slid.bs.carousel', function(e) {
        currentSlide = e.to;
        updateProgress();
    });
    
    // İlk progress
    updateProgress();
    
    // Auto progress animation
    let progressAnimation;
    
    function startProgressAnimation() {
        progressAnimation = setInterval(() => {
            const currentProgress = parseFloat(progressBar.style.width) || 0;
            if (currentProgress < 100) {
                progressBar.style.width = (currentProgress + 0.5) + '%';
            }
        }, interval / 200);
    }
    
    function stopProgressAnimation() {
        clearInterval(progressAnimation);
    }
    
    carousel.addEventListener('slide.bs.carousel', function() {
        stopProgressAnimation();
        progressBar.style.width = '0%';
    });
    
    carousel.addEventListener('slid.bs.carousel', function() {
        startProgressAnimation();
    });
    
    // İlk animasyonu başlat
    startProgressAnimation();
}

/**
 * Lazy loading für carousel images
 */
function initializeLazyLoading() {
    const carouselImages = document.querySelectorAll('.carousel-item [data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        carouselImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback für ältere Browser
        carouselImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Carousel performance optimization
 */
function optimizeCarouselPerformance() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    // Preload nächste/vorherige Bilder
    const slides = carousel.querySelectorAll('.carousel-item');
    const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    function preloadAdjacentImages(index) {
        const nextIndex = (index + 1) % slides.length;
        const prevIndex = (index - 1 + slides.length) % slides.length;
        
        [nextIndex, prevIndex].forEach(idx => {
            const slide = slides[idx];
            const img = slide.querySelector('img[data-src]');
            if (img && !img.src) {
                img.src = img.dataset.src;
            }
        });
    }
    
    // İlk preload
    preloadAdjacentImages(currentIndex);
    
    // Slide değiştiğinde preload
    carousel.addEventListener('slid.bs.carousel', function(e) {
        preloadAdjacentImages(e.to);
    });
}

/**
 * Responsive carousel height
 */
function initializeResponsiveHeight() {
    function adjustCarouselHeight() {
        const carousel = document.getElementById('heroCarousel');
        if (!carousel) return;
        
        const windowHeight = window.innerHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
        const minHeight = Math.max(500, windowHeight - navbarHeight);
        
        carousel.style.height = minHeight + 'px';
        
        const slides = carousel.querySelectorAll('.hero-slide');
        slides.forEach(slide => {
            slide.style.height = minHeight + 'px';
        });
    }
    
    // İlk ayarlama
    adjustCarouselHeight();
    
    // Resize olayında ayarla
    window.addEventListener('resize', Utils.debounce(adjustCarouselHeight, 250));
}

/**
 * Accessibility improvements
 */
function initializeAccessibility() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    // ARIA labels
    const slides = carousel.querySelectorAll('.carousel-item');
    slides.forEach((slide, index) => {
        slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        carousel.setAttribute('data-bs-interval', 'false');
    }
    
    // Focus management
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeSlide = e.relatedTarget;
        const focusableElement = activeSlide.querySelector('a, button');
        if (focusableElement) {
            focusableElement.focus();
        }
    });
}

// Utils reference (main.js'den)
if (typeof Utils === 'undefined') {
    window.Utils = {
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeHeroSlider,
        updateSlideIndicators,
        initializeTouchSupport,
        initializeAutoPlayControls
    };
}