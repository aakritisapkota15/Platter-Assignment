# Best Sellers

A small **“best sellers”** product strip: **responsive grid on mobile**, **horizontal carousel on desktop**, with a **custom scroll track** (no arrow buttons, no native horizontal scrollbar). Product cards are **built from JavaScript data** and rendered into the page.

## What’s in the folder

| File | Role |
|------|------|
| `index.html` | Page shell: header, empty `#product-grid`, “Show more” (mobile), scroll track (desktop), loads Tailwind + `styles.css` + `main.js`. |
| `main.js` | Product **data** (`products` array), **HTML templates** (`renderProductCard`), layout switching (mobile vs desktop), **Show more** animation (`#show-more-wrapper` + `max-height`), **custom scrollbar** logic (thumb position, click/drag, `ResizeObserver`). |
| `styles.css` | Things Tailwind doesn’t cover well: **line clamp**, **page max-width**, **carousel flex widths** (~5 cards + scroll snap), **hiding** the real scrollbar on the slider, **custom track** hover height, small typography helpers. |

Open `index.html` in a browser (double‑click or any static server). No build step.

## Stack

- **HTML** + **Tailwind** (CDN) for layout and utilities  
- **Plain CSS** for slider/clamp/scrollbar details  
- **Vanilla JavaScript** (no framework) for data → DOM  

## Why this project is “broken apart” this way

This structure is intentional. It matches how many people **learn** and how **maintainable** small front‑ends stay:

1. **`index.html` = structure and hooks**  
   The DOM is the contract: ids like `product-grid`, `show-more-btn`, `carousel-scroll-track` are stable targets for JS. The grid starts empty so you never duplicate product markup in two places.

2. **`main.js` = data + behavior**  
   Products live in **one array**. One function **renders** a card; the rest is “when to show how many” (mobile slice vs desktop full row) and “how to scroll” (custom track). That’s easier to change than editing ten copy‑pasted cards in HTML.

3. **`styles.css` = quirks Tailwind doesn’t own**  
   Scrollbar hiding, snap, line clamp, and the **flex basis** for “about five cards visible” are easier to read and tweak in a small CSS file than in long inline utilities.


In short: **HTML for skeleton, CSS for layout quirks, JS for data and interaction**—three layers with clear jobs. That’s why it feels “split up”: so each file has one main responsibility as you learn and as the feature grows.

## Features (behavioral summary)

- **Mobile:** 2-column grid, first N products visible, **Show more / Show less** with a height transition on a wrapper.  
- **Desktop (`md+`):** Horizontal **flex** row with **scroll snap**, **no** native bar, **no** prev/next arrows; the **gray track + dark thumb** under the section drives (and reflects) scroll.  
- **Cards:** Images `img1` / `img2` with hover swap, badges (Best Seller / Save, including both), uppercase title styling, star row + formatted review count.
