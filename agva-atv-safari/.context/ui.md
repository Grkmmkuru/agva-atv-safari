# 🎨 UI - Ağva ATV Safari

Bu belge, uygulamanın kullanıcı arayüzüne (UI) dair görsel beklentileri açıklar.

---

## 🎯 Tasarım Prensipleri

### Ana Konsept: "Minimal Adventure"
- Sade ama etkileyici tasarım
- Doğa tonları dominant  
- Adrenalin hissi yaratan görsel elements
- Temiz, modern layout
- Boşluk kullanımında denge

### Renk Paleti
```css
:root {
    --primary-color: #2c5530;      /* Koyu Yeşil - Doğa */
    --secondary-color: #4a7c59;    /* Orta Yeşil - Huzur */
    --accent-color: #ff6b35;       /* Turuncu - Adrenalin */
    --dark-color: #1a1a1a;         /* Siyah - Güç */
    --light-color: #f8f9fa;        /* Açık Gri - Temizlik */
}
```

---

## 🧱 UI Bileşenleri

### Navigation
- Fixed top navbar
- Transparent background with blur effect
- Smooth scroll to sections
- Mobile hamburger menu

### Hero Slider
- 3 slide automatic carousel
- Full viewport height
- Overlay text with CTA buttons
- Auto-play with 5 second intervals

### Tour Cards
- Bootstrap card components
- Hover effects (transform translateY)
- Rounded corners (15px)
- Shadow effects
- Price display prominent

### Gallery
- Grid layout (CSS Grid)
- Lightbox functionality
- Video play overlay icons
- Hover scale effects

### FAQ
- Bootstrap accordion
- Smooth expand/collapse
- Consistent styling

### Buttons
```css
.btn-adventure {
    background: var(--accent-color);
    padding: 15px 40px;
    border-radius: 50px;
    font-weight: bold;
    transition: all 0.3s ease;
}
```

---

## 📱 Mobil Uyumluluk

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Simplified navigation (hamburger menu)
- Stacked card layouts
- Compressed hero content
- Optimized images

---

## 🎬 Animasyonlar

### Hover Effects
- Cards: translateY(-10px)
- Buttons: scale and shadow
- Images: scale(1.05)

### Scroll Animations
- Smooth scroll between sections
- Navbar background opacity change

---

> Amaç: Az sayıda öğeyle sade ama etkileyici bir arayüz sunmak.