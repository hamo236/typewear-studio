# Project brief

## What the project is

- A clothing store website that **displays clothes**. It is already uploaded to GitHub and working. This must be a real, working site, not just a design mockup. Presentation quality must be very high; see `docs/DESIGN_SYSTEM.md`.
- No payments at all. Ordering happens through WhatsApp.
- The business is in Egypt: Arabic-first with correct RTL. Keep the language setup the repository already has; support Arabic and English only if the repository already does or it costs little.

## Visual direction

Visual direction: see INSPIRE.md. Functional requirements in this file are never changed by design work.

## Image slots (core requirement)

- Product images are **not supplied by agents**. Every product has an image slot that is empty by default and looks designed, not broken.
- In admin mode, the owner clicks one slot, a file picker opens, chooses a photo from their device, and the photo is placed in that slot immediately. One click to open, one choice to place. It works for any clothing item type: hoodies, T-shirts, shirts, pants, caps, shoes, jackets, anything.
- Photos may be landscape, portrait, square, huge, tiny, or rotated by phone EXIF. Normalize them so the site stays visually consistent:
  - respect EXIF orientation;
  - use a fixed slot ratio, default 4:5, defined as a design token;
  - crop with `object-fit: cover` using an owner-adjustable focal point (drag to reposition, zoom slider), saved per image;
  - for extreme ratios or transparent PNG cutouts, fall back to `contain` on a tinted or softly blurred backdrop so nothing is distorted or cut badly;
  - resize to a maximum of approximately 1600px on the long side and compress, using WebP when supported;
  - validate type and size and show clear error messages, for example unsupported HEIC.
- Admin can replace, remove, reposition an image and, in a later task, add several images per product.

## Admin / owner control

- The owner can add a product, delete it, edit name, category, price, old price (sale), sizes, colors, stock status, badge, description, and its images. Categories are editable too.
- Admin mode is opened by a simple PIN stored in config. It is a convenience lock only. The site is static, so this is **not real security**. Write that clearly in the README and in the admin UI.
- Browser edits live in that browser only. Use IndexedDB for images, not localStorage. An **Export for publishing** button downloads a ZIP containing `products.json` plus an `images/` folder, and the README explains how to drop them into the repo so all visitors see them. Also provide Import. Be honest about this limitation in UI text and README. A real backend is a possible future phase; do not build it now.
- The site loads products from the repository's `products.json` by default and merges/overrides local admin data only in admin mode, so visitors never depend on the owner's browser.
- Seed data consists of a few clearly marked sample products (`isSample: true`) with empty images and example prices, plus an admin button **delete all sample products**. No fake reviews, fake sales counters, fake testimonials, or invented numbers.

## Cart (smooth and well animated)

- When a customer taps **add to cart** (size/color required when the product has them), the product thumbnail flies in an arc to the cart icon, the icon does a small bounce, the counter badge updates, and it looks like the item really dropped into a basket.
- The cart is a small, simple, beautiful glass drawer/sheet with item thumbnail, name, size/color, quantity plus/minus, remove, subtotal, total, and an empty state. It persists across reloads using localStorage.
- Respect `prefers-reduced-motion`: no flying, only a fade.

## Ordering through WhatsApp (no payment)

- A single button **اطلب على واتساب** opens `wa.me/<number>?text=<encoded message>`. The WhatsApp number is one value in the site config file, placeholder until the owner sets it. While it is a placeholder, admin sees a clear warning and customers see a graceful message.
- Build the message in natural Arabic: greeting, each item (name, size, color, quantity, price), total, and optional customer name and area. The owner can edit the message template in config.
- Handle empty cart, missing size, very long orders (keep URL under safe length and shorten if needed), and special characters.
- Each product has a simple **اسأل عن المنتج** link that opens WhatsApp with the product name and link.

## Practical business features

Keep these simple and useful: search, category filter, sort by price, favorites saved in localStorage, sale and out-of-stock badges, size guide, product detail view, share product link, delivery and return info block with text editable in config, social/contact links in config, 404 page, SEO basics (title, description, Open Graph, favicon), and fast loading with lazy images and WebP.

## Must not look AI-made

Not in the design, copy, code, product descriptions, button wording, comments, or commit messages. Follow `docs/QUALITY_CHECKLIST.md`.
