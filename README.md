# PT Mega Jaya Mekanikal

A premium industrial company profile website built with HTML5, CSS3, and vanilla JavaScript.

## Project structure

```text
project/
├── index.html
├── pages/
│   ├── produk/
│   │   ├── index.html
│   │   ├── panel-maker-detail.html
│   │   ├── steel-walkway-detail.html
│   │   └── guardrail-detail.html
│   ├── kontak/
│   │   └── index.html
│   └── artikel/
│       ├── index.html
│       ├── memilih-panel-listrik-industri.html
│       ├── steel-walkway-aman.html
│       └── guardrail-perlindungan-area-kerja.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
├── README.md
└── .gitignore
```

## Run locally

From the project root, serve the folder with a local web server:

```bash
python -m http.server 8000
```

Then open this in your browser:

```text
http://localhost:8000
```

## Notes

- The design uses a premium industrial aesthetic with a dark palette, metallic accents, and strong corporate typography.
- Navigation links to dedicated Beranda, Produk, Kontak, and Artikel pages and includes responsive mobile behavior.
- The Beranda page contains the company profile and advantages, while the Produk page links each catalog item to its own detail page.
- The Kontak page contains company contact information, a location map, and direct WhatsApp links.
- The Artikel page lists three articles as cards, each opening a separate article page.
- Each product detail page includes a photo gallery with a full-size viewer, arrow-key navigation, and swipe support.
- Menu pages are grouped under `pages/produk`, `pages/kontak`, and `pages/artikel`; shared assets, styles, and scripts stay in their root folders.
- Images use trusted remote photo sources suitable for a professional steel and industrial company presentation.
