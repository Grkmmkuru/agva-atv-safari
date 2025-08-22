/**
 * Ağva ATV Safari - Main JavaScript
 * Ana JavaScript dosyası - Tüm temel fonksiyonları içerir
 */

// DOM yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function() {
    // Ana fonksiyonları başlat
    initializeApp();
    loadToursData();
    loadFAQData();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeNavbarEffects();
    initializeAnimations();
});

/**
 * Ana uygulama başlatma fonksiyonu
 */
function initializeApp() {
    console.log('Ağva ATV Safari - Website başlatıldı');
    
    // Performance monitoring
    window.addEventListener('load', function() {
        console.log('Sayfa yükleme süresi:', performance.now(), 'ms');
    });
}

/**
 * Tours verilerini yükle ve göster
 */
async function loadToursData() {
    try {
        // JSON verilerini simüle et (gerçek uygulamada fetch ile yüklenecek)
        const toursData = {
            "tours": [
                {
                    "id": "atv-safari",
                    "title": "ATV Safari Turu",
                    "description": "Ağva'nın doğal güzelliklerinde ATV ile keyifli macera deneyimi. Profesyonel rehberlik ve güvenlik ekipmanı dahil.",
                    "duration": "1 Saat",
                    "price": 450,
                    "currency": "₺",
                    "badge": "EN POPÜLER",
                    "features": [
                        "1 saatlik macera rotası",
                        "Uzman rehber eşliği", 
                        "Grup veya bireysel seçenekler"
                    ],
                    "image": "assets/images/tours/atv-mountain.jpg",
                    "category": "main"
                },
                {
                    "id": "jet-ski",
                    "title": "Deniz Bisikleti",
                    "description": "Karadeniz'in serinliğinde hızın ve özgürlüğün tadını çıkarın. Güvenli ve eğlenceli deniz macerası.",
                    "duration": "1 Saat",
                    "price": 350,
                    "currency": "₺",
                    "badge": "YENİ",
                    "features": [
                        "1 saatlik deniz keyfi",
                        "Muhteşem deniz manzarası",
                        "Can yeleği ve eğitim dahil"
                    ],
                    "image": "assets/images/tours/agva-river-jetski.jpg",
                    "category": "side"
                },
                {
                    "id": "mountain-bike",
                    "title": "Kara Bisikleti Turu",
                    "description": "Doğa dostu bisiklet turlarıyla Ağva'nın gizli köşelerini keşfedin. Sessiz ve huzurlu macera.",
                    "duration": "Saatlik/Günlük",
                    "price": 250,
                    "currency": "₺",
                    "badge": "EKO DOSTU",
                    "features": [
                        "Saatlik veya günlük kiralama",
                        "Çevre dostu aktivite",
                        "Kaliteli dağ bisikletleri"
                    ],
                    "image": "assets/images/tours/mountain-bike-new.jpg",
                    "category": "side"
                }
            ]
        };
        
        renderTours(toursData.tours);
    } catch (error) {
        console.error('Tours data yüklenirken hata:', error);
    }
}

/**
 * Tour kartlarını render et
 */
function renderTours(tours) {
    const container = document.getElementById('tours-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    tours.forEach(tour => {
        const tourCard = createTourCard(tour);
        container.appendChild(tourCard);
    });
}

/**
 * Tek bir tour kartı oluştur
 */
function createTourCard(tour) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    
    col.innerHTML = `
        <div class="card tour-card h-100">
            <div class="tour-card-image">
                <img src="${tour.image}" class="card-img-top" alt="${tour.title}" loading="lazy">
                <div class="tour-badge">${tour.badge}</div>
            </div>
            <div class="card-body tour-card-body">
                <h5 class="tour-title">${tour.title}</h5>
                <p class="tour-description">${tour.description}</p>
                <ul class="tour-features">
                    ${tour.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="tour-duration">
                    <div class="tour-duration-text">
                        <i class="fas fa-clock me-2 text-success"></i>
                        <strong>Süre:</strong> ${tour.duration}
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <a href="https://wa.me/905313533555?text=${encodeURIComponent(`Merhaba Ağva ATV Safari!\n\n🏔️ ${tour.title} için rezervasyon yapmak istiyorum.\n\n📅 Tarih: \n👥 Kişi Sayısı: \n📞 İletişim: \n\nDetaylı bilgi alabilir miyim?`)}" 
                       class="btn btn-adventure" target="_blank">
                        <i class="fab fa-whatsapp me-2"></i>Rezervasyon Yap
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

/**
 * FAQ verilerini yükle ve göster
 */
async function loadFAQData() {
    try {
        // JSON verilerini simüle et
        const faqData = {
            "faq": [
                {
                    "id": "license",
                    "question": "ATV kullanmak için ehliyet gerekli mi?",
                    "answer": "Evet, ATV kullanabilmek için geçerli bir sürücü belgesine sahip olmanız gerekmektedir. Güvenlik önceliğimiz olduğu için bu zorunluluk bulunmaktadır."
                },
                {
                    "id": "capacity",
                    "question": "ATV'ye kaç kişi binebilir?",
                    "answer": "ATV'lerimize isterseniz tek kişi, isterseniz iki kişi binebilirsiniz. İki kişi binildiğinde bir kişi sürücü, diğeri yolcu olarak yer alır. Güvenlik açısından maksimum 2 kişi sınırı vardır."
                },
                {
                    "id": "reservation",
                    "question": "Rezervasyon nasıl yapılır?",
                    "answer": "Rezervasyon için bizi arayabilir (+90 531 353 35 55) veya WhatsApp'tan mesaj atabilirsiniz. Randevunuzu telefon görüşmesi sırasında netleştiriyoruz."
                },
                {
                    "id": "group-discount",
                    "question": "Grup indirimleri var mı?",
                    "answer": "Evet, grup rezervasyonları için indirimlerimiz mevcuttur. Grup büyüklüğüne göre indirim oranları değişmektedir. Detaylı bilgi için lütfen bizi arayın, koşulları görüşerek belirleyelim."
                },
                {
                    "id": "age-limit",
                    "question": "Yaş sınırı var mı?",
                    "answer": "ATV kullanabilmek için 18 yaş ve üzeri olmanız ve geçerli sürücü belgenizin bulunması gerekmektedir. 18 yaş altındaki kişiler yolcu olarak katılabilirler."
                },
                {
                    "id": "duration",
                    "question": "Tur ne kadar sürer?",
                    "answer": "ATV safari turumuz yaklaşık 1 saat sürmektedir. Bu süre değişiklik gösterebilir."
                },
                {
                    "id": "experience",
                    "question": "Daha önce ATV kullanmadım, sorun olur mu?",
                    "answer": "Hiç problem olmaz! Tur öncesi detaylı eğitim ve güvenlik brifingi veriyoruz. Profesyonel rehberlerimiz deneyimsiz kullanıcılara özel yardım sağlar. Herkes güvenle katılabilir."
                }
            ]
        };
        
        renderFAQ(faqData.faq);
    } catch (error) {
        console.error('FAQ data yüklenirken hata:', error);
    }
}

/**
 * FAQ accordion render et
 */
function renderFAQ(faqItems) {
    const container = document.getElementById('faqAccordion');
    if (!container) return;
    
    container.innerHTML = '';
    
    faqItems.forEach((item, index) => {
        const faqItem = createFAQItem(item, index);
        container.appendChild(faqItem);
    });
}

/**
 * Tek bir FAQ item oluştur
 */
function createFAQItem(item, index) {
    const div = document.createElement('div');
    div.className = 'accordion-item';
    
    div.innerHTML = `
        <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" 
                    data-bs-toggle="collapse" data-bs-target="#collapse${index}" 
                    aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
                ${item.question}
            </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
             aria-labelledby="heading${index}" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
                ${item.answer}
            </div>
        </div>
    `;
    
    return div;
}

/**
 * Navbar scroll efektleri
 */
function initializeNavbarEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar scroll efekti
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link güncelle
        updateActiveNavLink();
    });
    
    // Nav link click olayları
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Mobile menüyü kapat
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

/**
 * Active nav link güncelle
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Smooth scrolling initialize
 */
function initializeSmoothScrolling() {
    // Tüm internal linkler için smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll efektleri initialize
 */
function initializeScrollEffects() {
    // Intersection Observer ile scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Animate edilecek elementleri gözlemle
    document.querySelectorAll('.tour-card, .gallery-item, .accordion-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * Animasyonları initialize et
 */
function initializeAnimations() {
    // Hero içeriği animasyonu
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // WhatsApp button pulse animasyonu
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

/**
 * WhatsApp mesaj gönderme fonksiyonu
 */
function sendWhatsAppMessage(message = 'Merhaba, bilgi almak istiyorum.') {
    const phoneNumber = '905551234567';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Form validasyon fonksiyonu
 */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

/**
 * Loading state göster/gizle
 */
function toggleLoading(element, show = true) {
    if (show) {
        element.disabled = true;
        element.innerHTML = '<span class="loading"></span> Yükleniyor...';
    } else {
        element.disabled = false;
        element.innerHTML = element.getAttribute('data-original-text') || 'Gönder';
    }
}

/**
 * Toast notification göster
 */
function showToast(message, type = 'success') {
    // Bootstrap toast kullanarak bildirim göster
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // Toast container oluştur (yoksa)
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Toast ekle
    toastContainer.innerHTML = toastHtml;
    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Toast otomatik temizlik
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

/**
 * Utility fonksiyonları
 */
const Utils = {
    // Debounce fonksiyonu
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
    },
    
    // Throttle fonksiyonu
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    
    // Format telefon numarası
    formatPhone: function(phone) {
        return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4');
    },
    
    // Format fiyat
    formatPrice: function(price, currency = '₺') {
        return `${currency}${price.toLocaleString('tr-TR')}`;
    }
};

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Hatası:', e.error);
});

// Export fonksiyonları (eğer modül sistemi kullanılırsa)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendWhatsAppMessage,
        validateForm,
        toggleLoading,
        showToast,
        Utils
    };
}