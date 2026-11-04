# Design system

> Visual direction lives in INSPIRE.md. Where this file and INSPIRE.md disagree on anything visual, INSPIRE.md wins.


## Direction: soft glass editorial

Reference principles were studied; take the principles, never copy any brand, text, photo, or layout 1:1.

- From a lime/mint playful fashion app: a characterful high-contrast display typeface paired with a clean sans; one fresh accent color used only for primary actions; rounded product tiles on softly tinted backgrounds; floating pill navigation; an oversized faint background word as texture on the hero.
- From a grayscale hoodie store app: restraint; charcoal pill buttons; size chips and color dots; segmented tabs on product detail; one dark feature card for contrast; floating cut-out product look.
- From a glass streaming dashboard: frosted translucent panels over blurred backdrops; floating rail/pill controls; text over imagery with a soft scrim.
- From a soft glass mobile UI: very large radii, calm atmosphere, floating bottom bar, big numerals, generous spacing.

### Synthesis

Use a warm off-white canvas, charcoal ink, and one lime accent. Choose the final accent hex only after contrast testing. Use frosted glass **only** for navigation, the cart drawer, overlays, and sheets; do not put glass on every card because of legibility and performance. Product photography is the hero.

## Tokens

CSS variables are required; no hard-coded values anywhere in components.

- **Colors:** `surface`, `surface-raised`, `ink`, `ink-muted`, `line`, `accent`, `accent-ink`, `success`, `warning`, `danger`, plus a neutral scale of at least eight steps.
- Provide light and dark themes with a toggle that respects system preference. All text must meet WCAG AA.
- **Glass recipe:** translucent background, approximately 55–70% in light mode and 40–55% in dark mode; `backdrop-filter: blur(16px–24px) saturate(~140%)`; 1px translucent light border with a subtle inner highlight; soft shadow. Provide a solid fallback when `backdrop-filter` is unsupported.
- **Radii:** 12px, 20px, 28px, and pill.
- **Shadows:** three levels.
- **Spacing:** 4px/8px scale only.
- **Z-index:** a documented scale.
- **Breakpoints:** 360px, 768px, 1024px, 1440px.
- **Typography:** one display face and one text face that both support Arabic well. Choose from Arabic-capable options such as Cairo, Tajawal, IBM Plex Sans Arabic, Readex Pro, or Reem Kufi, but pick a pairing with real character rather than the usual default. Define Display, H1–H4, Body L/M/S, and Caption with sizes, weights, and line heights. Choose either Latin numerals or Arabic-Indic numerals and apply it consistently, including prices.
- **Motion:** durations 120ms, 200ms, 320ms, and 500ms; two or three easing curves; reduced-motion fallbacks. Motion is subtle: button press, card lift, sheet slide, image fade-in, cart fly, badge bounce, toast, and skeleton shimmer for loading images.

## Layout

- Mobile-first.
- Floating glass pill bottom navigation on mobile with Home, Shop, Favorites, and Cart.
- Floating glass header on desktop.
- Two-column product grid on phones and three to four columns on desktop.
- Generous whitespace, strong hierarchy, and one primary action per screen.

## Components

Every component must have default, hover, focus, active, disabled, and loading states where applicable:

- Buttons: primary, secondary, ghost, icon.
- Inputs and search bar.
- Chips: size/category.
- Color dots.
- Tabs/segmented control.
- Badges.
- Product card.
- Image slot.
- Bottom sheet/drawer.
- Modal.
- Toast.
- Tooltip.
- Quantity stepper.
- Empty states.
- Skeletons.

## Product card

- Image slot at the top using the token ratio, default 4:5, with a softly tinted background per card.
- Product name and price; strike through old price when on sale.
- Quick-add button and favorite button.
- Hover lifts slightly.
- Admin sees an add/replace-photo control on the slot, always visible on touch devices.

## Image slot states

- **Empty public:** calm, designed placeholder with a soft tint and subtle hanger or garment outline; no scary dashed box and no text such as “image missing”.
- **Empty admin:** same placeholder plus a clear **أضف صورة** action.
- **Loading:** shimmer.
- **Filled:** fade in.
- **Error:** friendly retry.

Test with landscape, portrait, square, huge, tiny, EXIF-rotated, and transparent PNG images.

## Other rules

- Use icons from one set only, Lucide or similar, with the same stroke weight.
- Include a hidden `/design-system` page or equivalent showing tokens and every component so the owner can review the style in one place.
- The result must read as professional human-made branding, with no generic template feeling.

### T-013 base-component state contract

- Buttons expose primary, secondary, ghost, danger, icon, focus, pressed, disabled, and loading states with 44px minimum touch height.
- Inputs and search controls use the 18px input radius with hover, focus ring, disabled, placeholder, and shimmer loading states.
- Category/size chips, color dots, badges, and status pills provide default, hover, selected, focus, disabled, and loading states; selected color dots use an ink ring.
- Tabs use an underline indicator with active, focus, disabled, and reduced-motion behavior. Toasts use the glass-ink treatment and tooltip content uses the same compact dark surface with a solid fallback.
- Quantity steppers use 40px controls inside a compact shell, with hover, pressed, focus, and disabled states.

## INSPIRE final visual values

The following values are authoritative for the visual redesign and supersede conflicting starter values above. They are summarized here so CSS tokens and component work have one explicit bridge to INSPIRE.md.

### Palette and themes

- Light canvas: `#F5F4EF` with a mint-to-canvas wash from `#DDF8E8` to `#F5F4EF`; surface `#FFFFFF`; soft surface `#FAFAF7`.
- Light ink: `#17181A`; secondary ink `#3A3C40`; muted ink `#6C7076`; line `rgba(23,24,26,0.10)`.
- Lime accent: `#C9F13B`; accent ink `#17181A`; accent soft `#EAF9B8`. Lime is a fill, ring, or active indicator, never text on a light background.
- Stage tints: mint `#E3F7EA`, sand `#F1EBDD`, stone `#E9EAEC`, sky `#E4EDF5`, blush `#F6E6E1`, sage `#E3EADB`.
- Status colors: success `#2E9E5B`, warning `#D99A1E`, danger `#D64545`.
- Dark canvas `#0F1011`, surface `#17181A`, raised surface `#1F2124`, ink `#F2F2EE`, muted ink `#A2A6AB`, line `rgba(255,255,255,0.10)`, with deep muted stage tints.

### Glass, shape, depth, and rhythm

- `glass-light`: white at 62% opacity, 20px blur, 150% saturation, translucent 1px white border, inner highlight, and tinted soft shadow.
- `glass-ink`: dark at 72% opacity, 18px blur, 140% saturation, subtle light border, and floating shadow.
- `glass-dark`: dark-theme panel glass at 55% opacity with the same blur and faint light border.
- Every glass surface has a solid fallback; never stack more than two glass layers and never use glass on ordinary cards.
- Card radius 28px, image 24px, input 18px, sheet top corners 32px, pill 999px, small chip 12px. Round icon buttons are at least 44px.
- Three shadows only: soft, lifted, floating. Use long, low-opacity, slightly tinted shadows.
- Use the 4/8px spacing scale; section padding is 40px on phones and 72–96px on desktop.

### Typography, motion, and composition

- **Final T-011 pairing:** Fraunces is the DISPLAY and ACCENT face for expressive Latin headlines and key numbers; Cairo is the Arabic DISPLAY and primary TEXT face; DM Sans is the Latin interface TEXT fallback. All three local variable fonts use `font-display: swap` and are preloaded from `client/index.html`.
- **Type tokens:** Display 44–120px, H1 36–56px, H2 28–40px, H3 22–28px, Body L 18px, Body M 16px, Body S 14px, Caption 12–13px. Arabic headings use a roomier 1.3 line-height; Latin display uses 1.02 with tight tracking.
- **Numerals:** Latin digits remain the consistent choice for prices, counts, editor values, and future cart/WhatsApp output.
- **Motion tokens:** `--motion-fast` 120ms, `--motion-standard` 200ms, `--motion-emphasis` 320ms, and `--motion-slow` 500ms. Continuous float, marquee, and spinner loops use named `--motion-float`, `--motion-marquee`, and `--motion-spinner` tokens rather than inline timings.
- **Easings:** `--ease-out` for entrances and lifts, `--ease-standard` for surface/color changes, `--ease-spring` for sheets and controls, and `--ease-linear` for shimmer/spinner loops. Animate transform and opacity rather than layout.
- **Reduced motion:** `prefers-reduced-motion: reduce` collapses motion tokens to a 1ms linear fade, disables looping after one iteration, and turns off smooth scrolling.
- Use mobile-first 2/3/4-column grids at phone/tablet/desktop, generous whitespace, asymmetric hero overlaps, and one primary action per screen.

### Component and state direction

- Shell: floating dark glass pill bottom navigation on mobile; floating glass-light pill header on desktop; calm ink footer.
- Home: oversized headline with one accent word, ghost word, overlapping rotated hero cards, lime CTA, real counts only, category cards, dark featured card, and WhatsApp ordering steps.
- Shop/product: search/filter controls, category circles, tinted 4:5 product stages, glass favorite and state chips, display-numeral prices, detail thumbnail rail, tabs, chips, dots, stepper, and sticky mobile actions.
- Cart/toasts: glass-light sheet with drag handle and large total, one lime WhatsApp action, glass-ink toast above navigation, and designed empty states.
- Image slots: intentional tinted public empty state, admin `أضف صورة` chip, shimmer loading, fade-in filled state, friendly retry error, and no dashed missing-image boxes.

### T-014 surface contract

- `glass-panel`/`surface-panel` are for raised panels; `glass-light`/`surface-sheet`/`surface-drawer`/`surface-modal` use the light glass recipe; `glass-ink`/`surface-chip` use the dark floating recipe; `glass-dark` is reserved for dark-theme panels.
- Every recipe has a solid `surface-raised` or charcoal fallback before the `backdrop-filter` enhancement. Overlays use a quiet scrim, surfaces never stack more than two glass layers, and close controls keep 44px targets with visible focus rings.
- Sheets and drawers use 28px top corners, modals use 28px all around, drag handles are tokenized pills, and open/close movement uses the motion tokens with reduced-motion overrides.
