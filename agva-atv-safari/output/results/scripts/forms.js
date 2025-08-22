/**
 * Ağva ATV Safari - Forms JavaScript
 * Form validasyon ve WhatsApp entegrasyonu
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializeWhatsAppIntegration();
    initializeContactValidation();
});

/**
 * Form sistemini başlat
 */
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
    
    // Contact form özel validasyonları
    initializeContactFormValidation();
    
    // Reservation form özel validasyonları
    initializeReservationFormValidation();
}

/**
 * Form submit handler
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formType = form.getAttribute('data-form-type') || 'contact';
    
    // Validasyon kontrol et
    if (!validateForm(form)) {
        showFormError('Lütfen tüm gerekli alanları doğru şekilde doldurun.');
        return;
    }
    
    // Form tipine göre işlem yap
    switch (formType) {
        case 'contact':
            handleContactForm(form);
            break;
        case 'reservation':
            handleReservationForm(form);
            break;
        case 'newsletter':
            handleNewsletterForm(form);
            break;
        default:
            handleGenericForm(form);
    }
}

/**
 * Contact form işleme
 */
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // WhatsApp mesajı oluştur
    const message = createContactWhatsAppMessage(data);
    
    // Loading state
    const submitBtn = form.querySelector('[type="submit"]');
    toggleLoadingState(submitBtn, true);
    
    // Simulate API call delay
    setTimeout(() => {
        // WhatsApp'a yönlendir
        sendWhatsAppMessage(message);
        
        // Success feedback
        showFormSuccess('Mesajınız WhatsApp üzerinden iletilecek.');
        form.reset();
        
        toggleLoadingState(submitBtn, false);
    }, 1000);
}

/**
 * Reservation form işleme
 */
function handleReservationForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // WhatsApp rezervasyon mesajı
    const message = createReservationWhatsAppMessage(data);
    
    const submitBtn = form.querySelector('[type="submit"]');
    toggleLoadingState(submitBtn, true);
    
    setTimeout(() => {
        sendWhatsAppMessage(message);
        showFormSuccess('Rezervasyon talebiniz WhatsApp üzerinden iletilecek.');
        form.reset();
        toggleLoadingState(submitBtn, false);
    }, 1000);
}

/**
 * Newsletter form işleme
 */
function handleNewsletterForm(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    const submitBtn = form.querySelector('[type="submit"]');
    toggleLoadingState(submitBtn, true);
    
    // Simulate newsletter subscription
    setTimeout(() => {
        showFormSuccess('E-bülten aboneliğiniz başarıyla oluşturuldu!');
        form.reset();
        toggleLoadingState(submitBtn, false);
        
        // Analytics tracking (opsiyonel)
        trackNewsletterSignup(email);
    }, 1500);
}

/**
 * Generic form işleme
 */
function handleGenericForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const message = `Yeni form başvurusu:\n\n${Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}`;
    
    sendWhatsAppMessage(message);
    showFormSuccess('Başvurunuz alındı.');
    form.reset();
}

/**
 * WhatsApp entegrasyonunu başlat
 */
function initializeWhatsAppIntegration() {
    // WhatsApp butonları
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = this.getAttribute('data-whatsapp') || 
                           this.getAttribute('data-message') ||
                           'Merhaba, bilgi almak istiyorum.';
            
            sendWhatsAppMessage(message);
        });
    });
    
    // Quick contact buttons
    initializeQuickContactButtons();
    
    // Tour specific WhatsApp messages
    initializeTourWhatsAppMessages();
}

/**
 * Contact form validasyonu
 */
function initializeContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Telefon formatı
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4');
                }
                this.value = value;
            }
        });
    }
    
    // E-posta validasyonu
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                showFieldError(this, 'Geçerli bir e-posta adresi girin.');
            }
        });
    }
}

/**
 * Reservation form validasyonu
 */
function initializeReservationFormValidation() {
    const reservationForm = document.getElementById('reservationForm');
    if (!reservationForm) return;
    
    // Tarih validasyonu
    const dateInput = reservationForm.querySelector('input[type="date"]');
    if (dateInput) {
        // Minimum bugün
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            
            if (selectedDate < today) {
                showFieldError(this, 'Geçmiş bir tarih seçemezsiniz.');
            }
        });
    }
    
    // Kişi sayısı validasyonu
    const participantInput = reservationForm.querySelector('input[name="participants"]');
    if (participantInput) {
        participantInput.addEventListener('change', function() {
            const count = parseInt(this.value);
            
            if (count < 1) {
                showFieldError(this, 'En az 1 kişi olmalıdır.');
            } else if (count > 20) {
                showFieldError(this, 'Maksimum 20 kişi için rezervasyon yapabilirsiniz.');
            }
        });
    }
}

/**
 * Field validasyon
 */
function validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.hasAttribute('required');
    
    // Clear previous errors
    clearFieldError(input);
    
    // Required check
    if (required && !value) {
        showFieldError(input, 'Bu alan zorunludur.');
        return false;
    }
    
    if (!value) return true; // Optional field, empty is OK
    
    // Type specific validation
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(input, 'Geçerli bir e-posta adresi girin.');
                return false;
            }
            break;
            
        case 'tel':
            const phoneRegex = /^\(\d{3}\) \d{3} \d{2} \d{2}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(input, 'Geçerli bir telefon numarası girin. Örnek: (555) 123 45 67');
                return false;
            }
            break;
            
        case 'number':
            const num = parseFloat(value);
            const min = parseFloat(input.min);
            const max = parseFloat(input.max);
            
            if (isNaN(num)) {
                showFieldError(input, 'Geçerli bir sayı girin.');
                return false;
            }
            
            if (!isNaN(min) && num < min) {
                showFieldError(input, `Minimum değer: ${min}`);
                return false;
            }
            
            if (!isNaN(max) && num > max) {
                showFieldError(input, `Maksimum değer: ${max}`);
                return false;
            }
            break;
            
        case 'date':
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFieldError(input, 'Geçmiş bir tarih seçemezsiniz.');
                return false;
            }
            break;
    }
    
    // Length validation
    const minLength = input.getAttribute('minlength');
    const maxLength = input.getAttribute('maxlength');
    
    if (minLength && value.length < parseInt(minLength)) {
        showFieldError(input, `En az ${minLength} karakter olmalıdır.`);
        return false;
    }
    
    if (maxLength && value.length > parseInt(maxLength)) {
        showFieldError(input, `En fazla ${maxLength} karakter olmalıdır.`);
        return false;
    }
    
    return true;
}

/**
 * Form validasyonu
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Field error göster
 */
function showFieldError(input, message) {
    clearFieldError(input);
    
    input.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

/**
 * Field error temizle
 */
function clearFieldError(input) {
    input.classList.remove('is-invalid');
    
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Form error göster
 */
function showFormError(message) {
    showToast(message, 'danger');
}

/**
 * Form success göster
 */
function showFormSuccess(message) {
    showToast(message, 'success');
}

/**
 * Loading state toggle
 */
function toggleLoadingState(button, loading) {
    if (loading) {
        button.disabled = true;
        button.setAttribute('data-original-text', button.innerHTML);
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Gönderiliyor...';
    } else {
        button.disabled = false;
        button.innerHTML = button.getAttribute('data-original-text') || 'Gönder';
    }
}

/**
 * Contact WhatsApp mesajı oluştur
 */
function createContactWhatsAppMessage(data) {
    let message = '🌟 *Yeni İletişim Formu*\n\n';
    
    if (data.name) message += `👤 *Ad Soyad:* ${data.name}\n`;
    if (data.email) message += `📧 *E-posta:* ${data.email}\n`;
    if (data.phone) message += `📱 *Telefon:* ${data.phone}\n`;
    if (data.subject) message += `📝 *Konu:* ${data.subject}\n`;
    if (data.message) message += `💬 *Mesaj:*\n${data.message}\n`;
    
    message += `\n⏰ *Tarih:* ${new Date().toLocaleDateString('tr-TR')}`;
    
    return message;
}

/**
 * Reservation WhatsApp mesajı oluştur
 */
function createReservationWhatsAppMessage(data) {
    let message = '🎯 *Yeni Rezervasyon Talebi*\n\n';
    
    if (data.tour) message += `🚗 *Tur:* ${data.tour}\n`;
    if (data.name) message += `👤 *Ad Soyad:* ${data.name}\n`;
    if (data.phone) message += `📱 *Telefon:* ${data.phone}\n`;
    if (data.email) message += `📧 *E-posta:* ${data.email}\n`;
    if (data.date) message += `📅 *Tarih:* ${new Date(data.date).toLocaleDateString('tr-TR')}\n`;
    if (data.time) message += `🕐 *Saat:* ${data.time}\n`;
    if (data.participants) message += `👥 *Kişi Sayısı:* ${data.participants}\n`;
    if (data.notes) message += `📝 *Notlar:* ${data.notes}\n`;
    
    message += `\n⏰ *Talep Tarihi:* ${new Date().toLocaleDateString('tr-TR')}`;
    
    return message;
}

/**
 * Quick contact buttons
 */
function initializeQuickContactButtons() {
    // Floating WhatsApp button
    const floatingWhatsApp = document.querySelector('.whatsapp-float .whatsapp-btn');
    if (floatingWhatsApp) {
        floatingWhatsApp.addEventListener('click', function(e) {
            e.preventDefault();
            const message = 'Merhaba Ağva ATV Safari!\n\n🏔️ Bilgi almak istiyorum.\n\n📅 Tarih: \n👥 Kişi Sayısı: \n📞 İletişim: \n\nDetaylı bilgi alabilir miyim?';
            sendWhatsAppMessage(message);
        });
    }
    
    // Header WhatsApp button
    const headerWhatsApp = document.querySelector('.navbar .btn-adventure');
    if (headerWhatsApp && headerWhatsApp.href.includes('wa.me')) {
        headerWhatsApp.addEventListener('click', function(e) {
            e.preventDefault();
            const message = 'Merhaba Ağva ATV Safari!\n\n🏔️ Turlarınız hakkında bilgi almak istiyorum.\n\n📅 Tarih: \n👥 Kişi Sayısı: \n📞 İletişim: \n\nDetaylı bilgi alabilir miyim?';
            sendWhatsAppMessage(message);
        });
    }
}

/**
 * Tour specific WhatsApp messages
 */
function initializeTourWhatsAppMessages() {
    const tourButtons = document.querySelectorAll('.tour-card .btn-adventure');
    
    tourButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tourCard = this.closest('.tour-card');
            const tourTitle = tourCard.querySelector('.tour-title')?.textContent || 'Tur';
            const tourPrice = tourCard.querySelector('.tour-price-amount')?.textContent || '';
            
            const message = `Merhaba Ağva ATV Safari!\n\n🏔️ ${tourTitle} için rezervasyon yapmak istiyorum.\n\n📅 Tarih: \n👥 Kişi Sayısı: \n📞 İletişim: \n\nDetaylı bilgi alabilir miyim?`;
            
            sendWhatsAppMessage(message);
        });
    });
}

/**
 * WhatsApp mesaj gönder
 */
function sendWhatsAppMessage(message) {
    const phoneNumber = '905313533555';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Analytics tracking (opsiyonel)
    trackWhatsAppClick(message);
    
    window.open(whatsappUrl, '_blank');
}

/**
 * Analytics tracking functions
 */
function trackNewsletterSignup(email) {
    // Google Analytics, Facebook Pixel vb. entegrasyonları
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            email: email
        });
    }
    
    console.log('Newsletter signup tracked:', email);
}

function trackWhatsAppClick(message) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            message_type: getMessageType(message)
        });
    }
    
    console.log('WhatsApp click tracked:', message.substring(0, 50));
}

function getMessageType(message) {
    if (message.includes('rezervasyon')) return 'reservation';
    if (message.includes('iletişim')) return 'contact';
    if (message.includes('bilgi')) return 'info';
    return 'general';
}

/**
 * Toast notification (main.js'den import)
 */
function showToast(message, type = 'success') {
    if (typeof window.showToast === 'function') {
        return window.showToast(message, type);
    }
    
    // Fallback
    alert(message);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeForms,
        initializeWhatsAppIntegration,
        validateForm,
        sendWhatsAppMessage
    };
}