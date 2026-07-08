Smt T.K.R. Polytechnic Website

A fully responsive, static, front-end college website for **Smt T.K.R. Polytechnic, Pamarru** built with semantic HTML5, pure CSS3, and vanilla JavaScript.

## 🎨 Design Philosophy

**"Clean Slate"** – Minimalist, high-contrast, and airy. The design uses whitespace as a primary element to convey elegance, clarity, and academic sophistication.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | Page background |
| `--bg-secondary` | `#F8F9FA` | Alternating sections, cards |
| `--text-primary` | `#212529` | Headings, body text |
| `--text-secondary` | `#6C757D` | Subtitles, descriptions |
| `--accent-navy` | `#2C3E50` | Hero overlay, footer |
| `--accent-gold` | `#E0A800` | CTAs, highlights, accents |

### Typography

- **Display**: Montserrat (700–900) for headings
- **Body**: Inter (300–600) for readable body text
- **Line-height**: 1.8 for optimal readability

---

## 📁 Architecture

```
College-Management-Website/
├── index.html          # Single-page website (all sections)
├── styles.css          # CSS with custom properties
├── script.js           # Vanilla JavaScript interactions
├── README.md           # This file
├── smt.md              # Source data (college information)
└── image/
    ├── campus/         # Campus photos + logo + banner
    ├── person/         # Principal & TPO photos
    ├── gallery/        # Event & campus gallery photos
    ├── cme/            # Computer Engineering faculty photos
    ├── ece/            # ECE faculty photos
    ├── eee/            # EEE faculty photos
    └── general/        # General department faculty photos
```

---

## 📊 Data Mapping (smt.md → Website)

| smt.md Section | Website Section | Key Data Points |
|---|---|---|
| College intro (lines 1–5) | Hero + About | Name, tagline, est. year, courses |
| Trust info (lines 7–23) | About | Society name, address, founding history |
| Principal (lines 29–87) | About (Principal Card) | Name, message, credentials, contact |
| Placement Cell (lines 93–169) | Placements | Objectives, recruiter list, TPO profile |
| Hostel (lines 175–189) | Campus Life | Boys/girls capacity, fees, facilities |
| Contact (lines 193–203) | Contact + Footer | Address, phone, email, website |
| Library (line 207) | Campus Life | Library card with enriched content |
| Faculty (lines 211–263) | Academics | Department-wise faculty with photos |

### Faculty Photo Mapping

| Faculty Member | Image File | Mapping Logic |
|---|---|---|
| T. Bhaskara Reddy | `ece/TBR.jpg` | Initials: TBR |
| K. Sridhar Reddy | `ece/KSR.jpg` | Initials: KSR |
| T. Vijaya Raju | `ece/TVR.jpg` | Initials: TVR |
| Ch. Sravanthi | `ece/CHS.jpg` | Initials: CHS |
| K. Chanbi | `ece/KCB.jpg` | Initials: KCB |
| Ch.K.T.L. Prasanna | `ece/CHKTLP.jpg` | Initials: CHKTLP |
| M. Butchi Babu | `cme/mbb.jpg` | Initials: MBB |
| P. Padmaja | `cme/ppj.jpg` | Initials: PPJ |
| A. Eswari | `cme/AES.jpg` | Initials: AES |
| Md. Dilshad | `cme/MDS.jpg` | Initials: MDS |
| Ch.N. Sravani | `cme/CHNS.jpg` | Initials: CHNS |
| S. Chandrasekhar Raju | `eee/SCSR.jpg` | Initials: SCSR |
| V. Ramesh | `eee/VR.jpg` | Initials: VR |
| T. Anusha | `eee/TA.jpg` | Initials: TA |
| M.D. Priyadarsini | `eee/MDP.jpg` | Initials: MDP |
| S. Giridhar Reddy | `eee/SGR.jpg` | Initials: SGR |
| S. Durga Bhavani | `general/SDB.jpg` | Initials: SDB |
| K. Navya | `general/KNV.jpg` | Initials: KNV |
| K. Ramu | `general/kr.jpg` | Initials: KR |
| K. Rajeswari | `general/KRS.jpg` | Initials: KRS |
| Ch. Rama Kumari | `general/crk.jpg` | Initials: CRK |

---

## 🚀 Features

- **Preloader**: Minimal gold-accented spinner
- **Sticky Navigation**: Transparent → glassmorphism on scroll
- **Hero**: Full-viewport with counter animations
- **Scroll Animations**: Fade-up on intersection (Intersection Observer)
- **Active Nav Highlighting**: Based on scroll position
- **Gallery Lightbox**: Click-to-expand image viewer
- **Mobile Responsive**: Hamburger menu, stacked layouts
- **Contact Form**: Mockup with submission feedback
- **Newsletter**: Mockup subscription in footer

---

## 💻 How to Run

1. Open `index.html` directly in a web browser
2. No build tools, npm, or bundlers required
3. Internet connection needed for Google Fonts, Font Awesome, and Google Maps embed

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| > 1024px | Desktop |
| 768px – 1024px | Tablet |
| 480px – 768px | Mobile |
| < 480px | Small Mobile |

---

## 🛠 Technical Details

- **Markup**: Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- **Styling**: Pure CSS3 with CSS Custom Properties for theming
- **JS**: Vanilla JavaScript (no frameworks/libraries)
- **Icons**: Font Awesome 6.5
- **Fonts**: Google Fonts (Inter + Montserrat)
- **Maps**: Google Maps embed iframe
