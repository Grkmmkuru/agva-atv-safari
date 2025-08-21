# 🏔️ Ağva ATV Safari - Context Engineering Projesi

Bu proje, Ağva ATV Safari turlarını tanıtmak için oluşturulacak kullanıcı dostu, mobil uyumlu, tek sayfalık web sitesidir. Context Engineering metodolojisi kullanılarak yapay zeka destekli geliştirme sürecine optimize edilmiştir.

## 📁 Proje Klasör Yapısı

```
agva-atv-safari/
├── .context/             # Context Engineering kuralları
│   ├── rules.md         # Teknik ve tasarım kuralları
│   ├── structure.md     # Dosya yapısı ve teknolojiler
│   ├── ui.md           # UI tasarım prensipleri
│   └── brand.md        # Marka rehberi
├── prompts/             # Gemini CLI şablonları
│   ├── generate_tasklist.tpl
│   └── execute_tasks.tpl
├── commands/            # Komut dosyaları
│   ├── generate_tasks.txt
│   └── execute_tasks.txt
├── output/              # Üretilen dosyalar
│   ├── task_list.md    # Otomatik üretilen görev listesi
│   └── results/        # Oluşturulan website dosyaları
│       ├── index.html
│       ├── style.css
│       └── assets/
├── content/             # İçerik dosyaları
│   ├── tours-data.json
│   ├── faq-data.json
│   └── content.md
└── README.md           # Bu dosya
```

## 💻 Kullanılan Teknolojiler

| Alan     | Teknoloji                    |
|----------|------------------------------|
| HTML     | HTML5 Semantic Elements      |
| CSS      | CSS3 + Bootstrap 5.3+ (CDN) |
| JS       | Vanilla JavaScript (ES2021+) |
| Icons    | Font Awesome 6               |
| Images   | WebP format (optimize)       |

## 🎯 Context Engineering Workflow

### 1. Görev Listesi Oluşturma
```bash
# Bağlam dosyalarından görev listesi üret
gemini -t prompts/generate_tasklist.tpl < commands/generate_tasks.txt > output/task_list.md
```

### 2. Görevleri Uygulama
```bash
# Görev listesini uygula ve website oluştur
gemini -t prompts/execute_tasks.tpl < commands/execute_tasks.txt
```

## 📋 Önemli Bileşenler

### Context Kuralları
- **rules.md**: Teknik kurallar ve yasaklar
- **structure.md**: Dosya yapısı rehberi
- **ui.md**: Tasarım prensipleri
- **brand.md**: Marka kimliği

### İçerik Verileri
- **tours-data.json**: ATV, deniz bisikleti, kara bisikleti turları
- **faq-data.json**: Sık sorulan sorular
- **content.md**: Metin içerikleri rehberi

### Çıktı Dosyaları
- **task_list.md**: Otomatik üretilen görev listesi
- **results/**: Nihai website dosyaları

## 🚀 Hızlı Başlangıç

1. Proje dosyalarını klonlayın
2. Context dosyalarını inceleyin (`.context/`)
3. İçerik dosyalarını gözden geçirin (`content/`)
4. Görev listesini kontrol edin (`output/task_list.md`)
5. Geliştirme sürecini başlatın

## 🎨 Tasarım Konsepti: "Minimal Adventure"

- Sade ama etkileyici tasarım
- Doğa tonları (yeşil, turuncu, siyah)
- Mobile-first responsive approach
- Smooth scroll navigation
- Hero slider ve interactive components

## 📞 İletişim
- **Telefon**: +90 (555) 123 45 67
- **WhatsApp**: +90 (555) 123 45 67
- **Email**: info@agvaatvsafari.com

---

> Bu proje yapay zeka destekli geliştirme süreçleri için optimize edilmiştir. Context Engineering metodolojisi ile sade, anlaşılır ve uygulanabilir bir yapı sağlar.