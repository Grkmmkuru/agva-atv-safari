# 🏔️ Ağva ATV Safari - One Page Website

Bu dizin Context Engineering metodolojisi ile oluşturulmuş, tam fonksiyonel Ağva ATV Safari website'ini içerir.

## 📁 Dosya Yapısı

```
output/results/
├── index.html           # Ana HTML dosyası
├── style.css           # Özel CSS stilleri  
├── assets/             # Medya dosyaları
│   ├── images/        # Resimler (hero, tours, gallery)
│   └── videos/        # Video dosyaları
├── scripts/           # JavaScript modülleri
│   ├── main.js       # Ana fonksiyonlar
│   ├── slider.js     # Hero carousel
│   ├── gallery.js    # Galeri lightbox
│   └── forms.js      # Form validasyon
└── README.md         # Bu dosya
```

## 🚀 Hızlı Başlatma

### 1. Local Server Başlatma

```bash
# Python ile basit server (önerilen)
cd output/results
python3 -m http.server 8000

# Ya da Node.js ile
cd output/results  
npx serve

# Ya da PHP ile
cd output/results
php -S localhost:8000
```

### 2. Tarayıcıda Açma

```
http://localhost:8000
```

## ✨ Özellikler

### 🎨 Tasarım
- **Minimal Adventure** konsepti
- Doğa tonları renk paleti (yeşil, turuncu, siyah)
- Mobile-first responsive tasarım
- Modern UI bileşenleri
- Smooth scroll navigation

### 🖥️ Bölümler
- **Hero Slider**: 3 otomatik geçişli slide
- **Navigation**: Fixed şeffaf navbar
- **Tours**: İnteraktif tur kartları
- **Gallery**: Lightbox galeri sistemi
- **FAQ**: Accordion SSS bölümü
- **Footer**: İletişim ve sosyal medya

### 📱 Fonksiyonellik
- Otomatik hero carousel (5sn interval)
- WhatsApp entegrasyonu
- Lightbox galeri
- Form validasyonu
- Responsive hamburger menu
- Smooth scroll efektleri
- Touch/swipe desteği

### 🔧 Teknolojiler
- **HTML5**: Semantic elements
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript**: Vanilla ES2021+
- **Bootstrap 5.3+**: Framework
- **Font Awesome 6**: İkonlar

## 📋 Kontrol Listesi

### ✅ Tamamlanan
- [x] HTML5 semantic yapısı
- [x] Bootstrap 5.3+ entegrasyonu
- [x] Font Awesome 6 ikonları
- [x] SEO meta tags
- [x] CSS custom properties
- [x] Fixed navigation menüsü
- [x] Hero slider (3 slide)
- [x] Tour kartları (hover efektleri)
- [x] Gallery grid sistemi
- [x] FAQ accordion
- [x] Footer bölümü
- [x] JavaScript fonksiyonellikleri
- [x] WhatsApp entegrasyonu
- [x] Mobile responsive tasarım

### ⏳ Eksikler (Resimler)
- [ ] Hero slider resimleri
- [ ] Tur kartları resimleri  
- [ ] Galeri fotoğrafları
- [ ] Favicon
- [ ] Video dosyaları

## 📸 Resim Gereksinimleri

### Hero Slider (3 resim gerekli)
1. **atv-hero.jpg** - ATV safari sahnesi (1920x1080)
2. **jetski-hero.jpg** - Deniz bisikleti (1920x1080)  
3. **bike-hero.jpg** - Kara bisikleti turu (1920x1080)

### Tour Kartları (3 resim gerekli)
1. **atv-safari.jpg** - ATV tur kartı (600x400)
2. **jet-ski.jpg** - Deniz bisikleti kartı (600x400)
3. **mountain-bike.jpg** - Kara bisikleti kartı (600x400)

### Galeri (6 resim gerekli)
1. **atv-1.jpg** - ATV aksiyon
2. **jetski-1.jpg** - Deniz bisikleti
3. **bike-1.jpg** - Kara bisikleti
4. **nature-1.jpg** - Ağva doğası
5. **group-1.jpg** - Grup aktivitesi
6. **sunset-1.jpg** - Gün batımı

## 🛠️ Geliştirme Notları

### CSS Değişkenleri
Renk paletini `style.css` dosyasındaki `:root` selector'ında bulabilirsiniz:
- `--primary-color`: #2c5530 (Koyu yeşil)
- `--secondary-color`: #4a7c59 (Orta yeşil)
- `--accent-color`: #ff6b35 (Turuncu)

### JavaScript Modülleri
- **main.js**: Ana uygulama ve veri yükleme
- **slider.js**: Hero carousel fonksiyonları  
- **gallery.js**: Lightbox ve galeri sistemi
- **forms.js**: Form validasyon ve WhatsApp entegrasyonu

### Özelleştirme
- İletişim bilgileri: `content/` klasöründeki JSON dosyalarında
- Renk paleti: CSS custom properties ile kolayca değiştirilebilir
- İçerik: JSON dosyaları ile dinamik yükleme

## 📞 İletişim Bilgileri

- **Telefon**: +90 (555) 123 45 67
- **WhatsApp**: +90 (555) 123 45 67  
- **Email**: info@agvaatvsafari.com
- **Adres**: Ağva Merkez, Şile/İstanbul

---

> 🌟 **Not**: Resimler eklendikten sonra website tamamen kullanıma hazır olacaktır. Placeholder resimler için assets/README.md dosyasına bakınız.