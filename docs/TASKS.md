# Tasks

Statuses: `[ ]` todo, `[~]` in progress, `[x]` done, `[!]` blocked. Never delete or renumber tasks; only add new tasks at the end with the next ID. Every task below starts as `[ ]` for the next agent to claim and verify.

## Phase 0: Foundation

- [ ] **T-001 Audit repo** — Dependencies: none. Acceptance: record the verified stack, commands, deployment, and folder map in `AGENTS.md`.
- [ ] **T-002 Confirm install, build, and local run** — Dependencies: none. Acceptance: a fresh clone installs, builds, and runs locally with exact commands recorded.
- [ ] **T-003 Create central site config** — Dependencies: T-001. Acceptance: central config contains brand name, WhatsApp number placeholder, currency, locale, PIN, delivery/return text, social links, and WhatsApp message template; no component hardcodes these values.

## Phase 1: Design system (needs T-002)

- [ ] **T-010 Design tokens** — Dependencies: T-002. Acceptance: colors with light/dark themes, radii, shadows, spacing, z-index, and glass recipe with fallback are tokenized.
- [ ] **T-011 Typography** — Dependencies: T-002. Acceptance: an Arabic-capable pairing is selected and loaded, the type scale is defined, and RTL typography is checked.
- [ ] **T-012 Motion tokens** — Dependencies: T-002. Acceptance: motion durations/easings are tokenized and reduced-motion handling is implemented.
- [ ] **T-013 Base components** — Dependencies: T-010, T-011, T-012. Acceptance: buttons, inputs, chips, color dots, badges, tabs, toast, tooltip, and stepper have all required states.
- [ ] **T-014 Surfaces** — Dependencies: T-010, T-012. Acceptance: glass panel, bottom sheet/drawer, and modal follow the recipe, fallback, accessibility, and motion rules.
- [ ] **T-015 App shell** — Dependencies: T-010, T-011, T-014. Acceptance: desktop floating glass header, mobile pill bottom nav, footer, and theme toggle exist and respect system preference.
- [ ] **T-016 Design-system review page** — Dependencies: T-013, T-014, T-015. Acceptance: hidden `/design-system` page shows tokens and every component with its states.

## Phase 2: Catalog (needs Phase 1)

- [ ] **T-020 Product data model and products.json** — Dependencies: T-003, T-016. Acceptance: `products.json` contains a few clearly marked sample products with `isSample: true`, empty images, and example prices.
- [ ] **T-021 Image slot component** — Dependencies: T-010, T-011, T-016. Acceptance: empty, loading, filled, and error states exist; empty admin state has **أضف صورة**; slot ratio defaults to tokenized 4:5.
- [ ] **T-022 Product card and responsive grid** — Dependencies: T-020, T-021, T-015. Acceptance: product name, price, old sale price, quick add, favorite, admin photo control, and two-column mobile/three-to-four-column desktop grid work.
- [ ] **T-023 Categories, search, sort, and filters** — Dependencies: T-020, T-022. Acceptance: editable category rail/filter, search, and price sort work with empty states.
- [ ] **T-024 Product detail view** — Dependencies: T-020, T-021, T-013. Acceptance: gallery, size chips, color dots, price/sale, stock state, size guide, share link, and **اسأل عن المنتج** work.
- [ ] **T-025 Home page** — Dependencies: T-020, T-022, T-023, T-024. Acceptance: hero with faint oversized background word, categories, featured products, how-to-order via WhatsApp, and delivery/return block exist with no fake numbers or reviews.

## Phase 3: Admin and images (needs T-021, T-020)

- [ ] **T-030 Admin mode** — Dependencies: T-003, T-016. Acceptance: PIN opens admin mode and clearly says it is a convenience lock, not real security.
- [ ] **T-031 One-click image upload** — Dependencies: T-021, T-030. Acceptance: clicking any slot opens a file picker and one selected photo is placed immediately for any clothing item type.
- [ ] **T-032 Image normalization** — Dependencies: T-031. Acceptance: EXIF orientation is respected; fixed ratio and object-cover focal positioning support drag and zoom saved per image; extreme ratios/transparent PNG use contain on tinted or softly blurred backdrop; images resize to about 1600px long side and compress to WebP when supported; type/size validation gives friendly errors including unsupported HEIC.
- [ ] **T-033 IndexedDB local storage** — Dependencies: T-030, T-031. Acceptance: images and admin data use IndexedDB, not localStorage, with graceful failure messages.
- [ ] **T-034 Product and category editing** — Dependencies: T-030, T-033. Acceptance: add/edit/delete product fields name, category, price, old price, sizes, colors, stock, badge, description, images; categories are editable; admin can delete all sample products.
- [ ] **T-035 Export/import publishing package** — Dependencies: T-020, T-033, T-034. Acceptance: Export downloads a ZIP containing `products.json` and `images/`; Import works; repository products load first and local admin data merges/overrides only in admin mode; README explains how to publish and the local-only limitation.
- [ ] **T-036 Multiple images per product** — Dependencies: T-034, T-035. Acceptance: several images per product can be added and reordered.

## Phase 4: Cart and WhatsApp (needs Phase 2)

- [ ] **T-040 Cart state** — Dependencies: T-022, T-024. Acceptance: localStorage persistence works and size/color are required when the product has them.
- [ ] **T-041 Fly-to-cart animation** — Dependencies: T-040, T-012. Acceptance: thumbnail flies in an arc, cart icon bounces, badge updates, and reduced motion uses only a fade.
- [ ] **T-042 Cart drawer** — Dependencies: T-014, T-040. Acceptance: drawer shows thumbnails, name, size/color, stepper, remove, subtotal, total, and empty state.
- [ ] **T-043 WhatsApp order builder** — Dependencies: T-003, T-040, T-042. Acceptance: natural Arabic template includes greeting, each item's name/size/color/quantity/price, total, optional customer name/area, and opens a `wa.me` link from config with placeholder handling.
- [ ] **T-044 WhatsApp edge cases** — Dependencies: T-043. Acceptance: empty cart, missing size, long orders under safe URL length, special characters, and per-product inquiry link are handled.

## Phase 5: Polish and release (needs Phases 2–4)

- [ ] **T-050 Favorites** — Dependencies: T-022, T-023. Acceptance: favorites persist in localStorage and have a view.
- [ ] **T-051 Universal states** — Dependencies: T-020, T-021, T-022, T-024, T-042. Acceptance: empty, loading, error, and 404 states exist everywhere applicable.
- [ ] **T-052 Responsive and RTL pass** — Dependencies: T-025, T-036, T-044. Acceptance: full responsive and RTL pass is checked at 360, 768, 1024, and 1440px.
- [ ] **T-053 Dark mode pass** — Dependencies: T-010, T-015, T-025, T-042. Acceptance: every screen is checked in dark mode.
- [ ] **T-054 Accessibility** — Dependencies: T-013, T-014, T-015, T-051. Acceptance: keyboard access, focus rings, labels, alt text, contrast, and 44px touch targets are present.
- [ ] **T-055 Performance** — Dependencies: T-021, T-022, T-036. Acceptance: lazy loading, WebP, bundle check, and no image-slot layout shift are verified.
- [ ] **T-056 SEO and metadata** — Dependencies: T-025, T-051. Acceptance: titles, descriptions, Open Graph, favicon, and sitemap when relevant exist.
- [ ] **T-057 De-AI audit** — Dependencies: T-050, T-051, T-052, T-053, T-054, T-055, T-056. Acceptance: every UI string, product text, comment, commit message, and the design is audited against `docs/QUALITY_CHECKLIST.md` and every finding is fixed.
- [ ] **T-058 Final QA** — Dependencies: T-057. Acceptance: screenshots for phone/desktop, light/dark, RTL are saved in `docs/qa/`; the full flow is really tested: add product, upload photos of different shapes, add to cart, and create the WhatsApp message.
- [ ] **T-059 Owner README** — Dependencies: T-035, T-058. Acceptance: simple-language README explains adding products, uploading photos, changing prices, setting WhatsApp number, export and publish, and PIN/local-storage limits.
