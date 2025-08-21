# 🗂️ Structure - Ağva ATV Safari

Bu belge, projenin klasör ve dosya yapısını ve kullanılan teknolojileri özetler.

---

## 📁 Klasör Yapısı

```
agva-atv-safari/
├── index.html              # Ana one-page website
├── style.css              # Ana stil dosyası
├── assets/                # Tüm medya dosyaları
│   ├── images/
│   │   ├── hero/         # Hero slider görselleri
│   │   ├── tours/        # Tur kartları görselleri
│   │   └── gallery/      # Galeri fotoğrafları
│   └── videos/           # Video dosyaları
├── scripts/              # JavaScript modülleri
│   ├── main.js          # Ana initialization
│   ├── slider.js        # Hero slider functionality
│   ├── gallery.js       # Galeri lightbox
│   └── forms.js         # Form validasyonları
└── README.md            # Proje açıklaması
```

---

## 🔁 Sayfa Bölümleri

| Bölüm            | ID        | Açıklama                                        |
|------------------|-----------|------------------------------------------------|
| Header           | #header   | Navigation menüsü (fixed)                     |
| Hero Slider      | #home     | 3 slide otomatik carousel                      |
| Turlar           | #tours    | ATV, Deniz Bisikleti, Kara Bisikleti kartları |
| Galeri           | #gallery  | Fotoğraf ve video showcase                     |
| SSS              | #faq      | Accordion FAQ section                          |
| Footer           | #contact  | İletişim bilgileri ve sosyal medya            |

## 💻 Kullanılan Teknolojiler

| Alan     | Teknoloji                    |
|----------|------------------------------|
| HTML     | HTML5 Semantic Elements      |
| CSS      | CSS3 + Bootstrap 5.3+ (CDN) |
| JS       | Vanilla JavaScript (ES2021+) |
| Icons    | Font Awesome 6               |
| Images   | WebP format (optimize)       |

---

## 📦 Dosya Notları

- **`index.html`**: One-page structure, tüm bölümler tek dosyada
- **`style.css`**: Bootstrap dışında kalan özel stiller
- **`scripts/`**: Her işlev ayrı modül dosyasında
- **`assets/`**: Tüm medya dosyaları optimize edilmiş

---

> Bu yapı sadeliği korur ve yapay zekanın dosyaları doğru yere yerleştirmesini kolaylaştırır.