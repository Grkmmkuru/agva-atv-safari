/**
 * Ağva ATV Safari - Gallery JavaScript
 * Galeri lightbox ve grid fonksiyonları
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeLightbox();
    initializeGalleryFilter();
});

/**
 * Gallery'yi başlat
 */
function initializeGallery() {
    const gallery = document.getElementById('gallery-container');
    if (!gallery) return;
    
    // Gallery items'a click event ekle
    const galleryItems = gallery.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
        
        // Keyboard erişimi
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Galeri resmi ${index + 1}`);
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Hover efekti için image preload
        const img = item.querySelector('.gallery-image');
        if (img) {
            img.loading = 'lazy';
        }
    });
    
    // Lazy loading için Intersection Observer
    initializeGalleryLazyLoading();
    
    // Masonry layout (opsiyonel)
    initializeMasonryLayout();
}

/**
 * Lightbox'ı başlat
 */
function initializeLightbox() {
    // Lightbox HTML'ini oluştur
    createLightboxHTML();
    
    // Lightbox event listeners
    const lightbox = document.getElementById('galleryLightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const overlay = lightbox.querySelector('.lightbox-overlay');
    
    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    
    // Navigation events
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    // Keyboard events
    document.addEventListener('keydown', handleLightboxKeydown);
    
    // Touch/swipe support
    initializeLightboxSwipe();
}

/**
 * Lightbox HTML oluştur
 */
function createLightboxHTML() {
    const lightboxHTML = `
        <div id="galleryLightbox" class="lightbox" style="display: none;">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Kapat">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-prev" aria-label="Önceki">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-next" aria-label="Sonraki">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="lightbox-content">
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-info">
                        <h5 class="lightbox-title"></h5>
                        <p class="lightbox-description"></p>
                        <div class="lightbox-counter">
                            <span class="current-image">1</span> / <span class="total-images">6</span>
                        </div>
                    </div>
                </div>
                <div class="lightbox-loading">
                    <div class="spinner"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Lightbox CSS
    const lightboxCSS = `
        <style id="lightbox-styles">
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
                visibility: visible;
            }
            
            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }
            
            .lightbox-container {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-content {
                position: relative;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                max-width: 1200px;
                max-height: 800px;
                width: auto;
                height: auto;
            }
            
            .lightbox-image {
                display: block;
                max-width: 100%;
                max-height: 70vh;
                width: auto;
                height: auto;
                object-fit: contain;
            }
            
            .lightbox-info {
                padding: 1.5rem;
                text-align: center;
            }
            
            .lightbox-title {
                color: var(--primary-color);
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            
            .lightbox-description {
                color: #666;
                margin-bottom: 1rem;
            }
            
            .lightbox-counter {
                font-size: 0.9rem;
                color: var(--accent-color);
                font-weight: 600;
            }
            
            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary-color);
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .lightbox-close:hover,
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: white;
                color: var(--accent-color);
                transform: scale(1.1);
            }
            
            .lightbox-close {
                top: 20px;
                right: 20px;
            }
            
            .lightbox-prev {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .lightbox-next {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .lightbox-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: none;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: var(--accent-color);
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            @media (max-width: 768px) {
                .lightbox-content {
                    margin: 1rem;
                }
                
                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 1rem;
                }
                
                .lightbox-close {
                    top: 10px;
                    right: 10px;
                }
                
                .lightbox-prev {
                    left: 10px;
                }
                
                .lightbox-next {
                    right: 10px;
                }
                
                .lightbox-info {
                    padding: 1rem;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', lightboxCSS);
}

/**
 * Lightbox'ı aç
 */
function openLightbox(index) {
    const lightbox = document.getElementById('galleryLightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!lightbox || !galleryItems[index]) return;
    
    // Current image index
    window.currentLightboxIndex = index;
    window.totalLightboxImages = galleryItems.length;
    
    // Show lightbox
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Load image
    loadLightboxImage(index);
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Update counter
    updateLightboxCounter();
    
    // Focus management
    lightbox.querySelector('.lightbox-close').focus();
}

/**
 * Lightbox'ı kapat
 */
function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
    
    // Return focus to gallery item
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[window.currentLightboxIndex]) {
        galleryItems[window.currentLightboxIndex].focus();
    }
}

/**
 * Lightbox resim yükle
 */
function loadLightboxImage(index) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxLoading = document.querySelector('.lightbox-loading');
    
    if (!galleryItems[index]) return;
    
    const galleryItem = galleryItems[index];
    const img = galleryItem.querySelector('.gallery-image');
    
    // Show loading
    lightboxLoading.style.display = 'block';
    lightboxImage.style.opacity = '0';
    
    // Create high-res image
    const highResImg = new Image();
    highResImg.onload = function() {
        lightboxImage.src = this.src;
        lightboxImage.alt = this.alt;
        
        // Hide loading
        lightboxLoading.style.display = 'none';
        lightboxImage.style.opacity = '1';
        
        // Update info
        lightboxTitle.textContent = this.alt || `Galeri Resmi ${index + 1}`;
        lightboxDescription.textContent = galleryItem.getAttribute('data-description') || '';
    };
    
    highResImg.onerror = function() {
        lightboxLoading.style.display = 'none';
        lightboxImage.style.opacity = '1';
        console.error('Lightbox resmi yüklenemedi:', img.src);
    };
    
    // Load high-res or fallback to original
    const highResSrc = img.getAttribute('data-lightbox-src') || img.src;
    highResImg.src = highResSrc;
    highResImg.alt = img.alt;
}

/**
 * Lightbox navigasyon
 */
function navigateLightbox(direction) {
    const newIndex = window.currentLightboxIndex + direction;
    const totalImages = window.totalLightboxImages;
    
    let targetIndex;
    if (newIndex < 0) {
        targetIndex = totalImages - 1; // Son resme git
    } else if (newIndex >= totalImages) {
        targetIndex = 0; // İlk resme git
    } else {
        targetIndex = newIndex;
    }
    
    window.currentLightboxIndex = targetIndex;
    loadLightboxImage(targetIndex);
    updateLightboxCounter();
}

/**
 * Lightbox sayacını güncelle
 */
function updateLightboxCounter() {
    const currentSpan = document.querySelector('.current-image');
    const totalSpan = document.querySelector('.total-images');
    
    if (currentSpan && totalSpan) {
        currentSpan.textContent = window.currentLightboxIndex + 1;
        totalSpan.textContent = window.totalLightboxImages;
    }
    
    // Navigation buttons durumu
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (window.totalLightboxImages <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

/**
 * Lightbox keyboard kontrolleri
 */
function handleLightboxKeydown(e) {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateLightbox(1);
            break;
    }
}

/**
 * Lightbox swipe desteği
 */
function initializeLightboxSwipe() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = Math.abs(startY - endY);
        
        // Horizontal swipe algıla
        if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Sol swipe - sonraki resim
                navigateLightbox(1);
            } else {
                // Sağ swipe - önceki resim
                navigateLightbox(-1);
            }
        }
    }, { passive: true });
}

/**
 * Gallery lazy loading
 */
function initializeGalleryLazyLoading() {
    const images = document.querySelectorAll('.gallery-image[data-src]');
    
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
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Masonry layout (opsiyonel)
 */
function initializeMasonryLayout() {
    const gallery = document.getElementById('gallery-container');
    if (!gallery || !gallery.classList.contains('masonry')) return;
    
    function arrangeMasonry() {
        const items = gallery.querySelectorAll('.gallery-item');
        const containerWidth = gallery.offsetWidth;
        const itemWidth = 300; // Min item genişliği
        const columns = Math.floor(containerWidth / itemWidth);
        const columnWidth = containerWidth / columns;
        
        // Column heights dizisi
        const columnHeights = new Array(columns).fill(0);
        
        items.forEach((item, index) => {
            // En kısa sütunu bul
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
            
            // Item pozisyonu
            const x = shortestColumnIndex * columnWidth;
            const y = columnHeights[shortestColumnIndex];
            
            // Position ayarla
            item.style.position = 'absolute';
            item.style.left = x + 'px';
            item.style.top = y + 'px';
            item.style.width = columnWidth + 'px';
            
            // Sütun yüksekliğini güncelle
            columnHeights[shortestColumnIndex] += item.offsetHeight + 10; // 10px gap
        });
        
        // Container yüksekliğini ayarla
        gallery.style.height = Math.max(...columnHeights) + 'px';
        gallery.style.position = 'relative';
    }
    
    // İlk düzenleme
    setTimeout(arrangeMasonry, 100);
    
    // Resize olayında yeniden düzenle
    window.addEventListener('resize', Utils.debounce(arrangeMasonry, 250));
}

/**
 * Gallery filtreleme (opsiyonel)
 */
function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
}

// Utils reference
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
        initializeGallery,
        initializeLightbox,
        openLightbox,
        closeLightbox
    };
}