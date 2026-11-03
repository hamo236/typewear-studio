# Design system

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
