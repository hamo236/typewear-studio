# INSPIRE, the visual direction of the store

1. WHAT THIS FILE IS
- This is the visual north star of the site. Four reference designs were studied (described below). They are a mood board, not a template. Take the principles and build something original that fits a clothing store in Egypt.
- Never copy any brand name, logo, text, photo, illustration or exact layout from the references. Never write the names of the reference apps anywhere in the project.
- The current look of the site is NOT sacred. When a task says to apply INSPIRE, replace the old styles. Do not layer new styles on top of old ones; delete dead CSS and unused components. Behavior must keep working while the look changes.
- Agents never edit this file on their own. If an agent believes something here is wrong or impossible, write it in HANDOFF.md and continue with the closest valid option. Only the owner changes INSPIRE.md.

2. THE FOUR REFERENCES (what to learn from each)

Reference A, playful lime/mint fashion app
- Backdrop: a fresh mint-to-pale-green gradient with very large faint words behind the content (ghost typography), slightly darker than the background and cropped by the screen edge.
- Splash/hero: overlapping, slightly rotated rounded cards (one warm orange-pink gradient, one mint-green gradient), each holding a person or product image inside an organic rounded shape, with a small caption.
- Headline: very heavy, high-contrast display type in black, with a second line in a lively script or italic style in lime-green. Big, confident, tight line spacing.
- One primary button: a full-width lime pill with dark text. This is the only place lime is used loudly.
- Catalog screen: a big heading, a search pill with a round filter button beside it, then a 2-column grid of white rounded category cards. Each card shows the product on a light background and a lime-tinted strip at the bottom with the category name and a small count.
- Navigation: a floating dark pill at the bottom with four icons; the active icon sits inside a lime circle.
- Detail screen: the product floats on a light background (cut-out look); a vertical rail of small thumbnails on the right edge; round white icon buttons at the top (back, save, bag); a bottom sheet with small selectable cards showing name and price.

Reference B, monochrome hoodie store
- Restraint: light gray canvas, white cards, charcoal elements, almost no color. Quality comes from spacing and form.
- A search bar with a mic, a row of category circles (active one filled charcoal, others soft gray).
- A dark charcoal feature card with a subtle textured pattern, the product name large in white, the price, and a white pill button.
- Three small info tiles in a row (colors, sizes, styles), one of them dark for rhythm.
- Product detail: the product floats centered on white with a thin elliptical ring under it that suggests a turntable; a row of small thumbnails; underlined text tabs (Closet / About / Reviews); two bottom buttons, one outlined and one solid charcoal pill.
- Size chips (S M L XL XXL) with a clear selected state, small round color dots, a dark bottom area.

Reference C, glass dashboard over a blurred photo
- A large frosted panel floating over a blurred photographic background, rounded corners, thin light border.
- A top pill navigation where the active item is a white pill and the others are plain text; a search pill; round notification and profile buttons.
- A slim floating vertical rail of glass icons on the side.
- Hero card: a large image with a soft dark scrim at the bottom, small tag chips ("Now Trending" style), title, short description, one white pill button, one outlined pill button, one round "more" button.
- Smaller cards in a row with overlaid tag chips and a round action button on the image. Dark translucent cards with white text.

Reference D, soft glass mobile UI at dusk
- Warm, calm atmosphere: a blurred warm-toned background (sand, dusk), nothing harsh.
- Very large translucent white bottom sheets with huge corner radii holding the key info.
- Floating round dark chips used as small controls over the image.
- A floating pill bar at the bottom with a back circle, a title and a small counter.
- Big numerals for the important numbers (the number is the hero of the card), small gray labels, a soft butter-yellow accent.

3. THE SYNTHESIS: "SOFT GLASS EDITORIAL WITH A LIME PULSE"
- A warm off-white canvas with a soft mint wash and blurred color blobs; charcoal ink; ONE lime accent used for actions and active states; frosted glass only on navigation, sheets, drawers, overlays and chips (never on every card); product photography is the hero; large, calm, rounded shapes; confident oversized typography; real depth (layers, overlaps, soft shadows) but quiet.
- Personality in three words: fresh, confident, tactile. Not corporate, not childish, not template-like.
- IMPORTANT: product photos are uploaded later by the owner and may be missing. The design must look finished and intentional even with ZERO photos (typography, shapes, tinted stages, ghost word), and must look even better once photos arrive.

4. DESIGN TOKENS (starting values; tune for WCAG AA, then freeze them in DESIGN_SYSTEM.md)
Light theme colors
- canvas #F5F4EF. canvas-wash: gradient from #DDF8E8 at the top fading to #F5F4EF.
- surface #FFFFFF. surface-soft #FAFAF7.
- ink #17181A. ink-2 #3A3C40. ink-muted #6C7076. line rgba(23,24,26,0.10).
- accent (lime) #C9F13B. accent-ink (text on lime) #17181A. accent-soft #EAF9B8.
- Product stage tints (card backgrounds, assigned per category, calm and desaturated): mint #E3F7EA, sand #F1EBDD, stone #E9EAEC, sky #E4EDF5, blush #F6E6E1, sage #E3EADB.
- success #2E9E5B, warning #D99A1E, danger #D64545.
- RULE: lime is never used as text color on light backgrounds (fails contrast). Lime is a fill, a ring, an active indicator. Text on lime is ink.
Dark theme colors
- canvas #0F1011, surface #17181A, surface-raised #1F2124, ink #F2F2EE, ink-muted #A2A6AB, line rgba(255,255,255,0.10). Accent stays lime. Stage tints become deep muted versions of the same hues.
Glass recipes (reusable classes/tokens)
- glass-light: background rgba(255,255,255,0.62); backdrop-filter blur(20px) saturate(150%); border 1px solid rgba(255,255,255,0.55); inset highlight 0 1px 0 rgba(255,255,255,0.7); shadow 0 10px 30px rgba(20,30,25,0.10).
- glass-ink (dark pill, bottom nav, chips on images): background rgba(20,21,23,0.72); blur(18px) saturate(140%); border 1px solid rgba(255,255,255,0.08); shadow 0 12px 32px rgba(0,0,0,0.25).
- glass-dark (panels in dark theme): rgba(28,29,31,0.55) with the same blur and a faint light border.
- Always provide a solid fallback color when backdrop-filter is unsupported. Never stack more than two glass layers. Use glass only where there is something behind it worth blurring. Keep text contrast AA on top of glass.
Shape
- Radii: card 28px, image 24px, input 18px, sheet 32px on top corners, pill 999px, small chip 12px. Round icon buttons 44px minimum, 48px preferred.
- Shadows: three levels only: soft (cards at rest), lifted (hover/raised), floating (nav, sheets). Long, low opacity, slightly tinted, never harsh black.
- Spacing: 4/8px scale. Generous: section padding 40px on phone, 72 to 96px on desktop. Content never touches the edges.
Ambient background layer
- A fixed background with soft blurred gradient blobs (mint, lime tint, warm sand) at low opacity, plus a very subtle grain texture (3 to 5% opacity, a tiny inline SVG noise under 2KB, pointer-events none). It gives the glass something to blur and removes the flat digital look. It must not hurt scrolling performance: no animated filters, no huge blurred images.

5. TYPOGRAPHY
- Three roles: DISPLAY (heavy, high contrast or strongly characterful; headlines and big numerals), ACCENT (a lively italic or calligraphic style used for ONE word in a headline, never for paragraphs), TEXT (clean humanist or geometric sans, highly readable).
- The site is Arabic-first and RTL, so every role needs an Arabic solution that looks equally designed, not like a fallback. Candidates to test (Google Fonts). Arabic display: Lalezar, Reem Kufi, Changa, Readex Pro heavy weights. Arabic accent: Aref Ruqaa, Harmattan, El Messiri. Text: IBM Plex Sans Arabic, Tajawal, Cairo, Readex Pro, Plus Jakarta Sans, Manrope. Latin display: Fraunces, DM Serif Display, Bricolage Grotesque. Pick ONE pairing that works in both scripts, test it with real Arabic product names and prices, record the decision in DESIGN_SYSTEM.md. Preload fonts and use font-display: swap so there is no layout jump.
- Scale (fluid with clamp): Display 44px on phone to 120px on desktop, line-height about 0.95 to 1.05 for Latin and 1.25 to 1.4 for Arabic (Arabic needs more room); H1 36 to 56; H2 28 to 40; H3 22 to 28; Body L 18; Body M 16; Body S 14; Caption 12 to 13. Tight tracking only on Latin display. Never tiny text. Prices and key numbers use the display face and are large.
- Numerals: choose Latin digits or Arabic-Indic digits once and apply everywhere (prices, counts, cart, WhatsApp message).
- Ghost word: an oversized word (brand name or a category word) in the display face, slightly darker than the background (mint on the home wash), 6 to 12% contrast, cropped by the edge, behind the hero. It may move a few pixels on scroll (transform only). Decoration only: aria-hidden.

6. LAYOUT AND COMPOSITION
- Mobile-first. Large calm shapes, an asymmetric hero, overlaps (elements overlap by 12 to 24px), rotated cards (4 to 7 degrees) used only in the hero, alternation between dense grids and big breathing sections. One primary action per screen.
- Grid: 2 columns on phone, 3 on tablet, 4 on desktop; 24px gutters on desktop, 12 to 16px on phone.
- Product imagery lives on soft tinted "stages" (the card background) with a gentle elliptical shadow/ring under cut-out products (the turntable hint). Photos with backgrounds are cropped to the slot ratio; transparent PNG cut-outs sit on the stage with padding.
- Masks: hero images may use arch or soft organic shapes. Product grid images use the normal rounded rectangle (4:5) for consistency.

7. SCREEN SPECIFICATIONS

Global shell
- Mobile: a floating dark glass pill at the bottom (glass-ink) with 4 items: Home, Shop, Favorites, Cart. The active item sits inside a lime circle with a dark icon; the circle slides between items. Cart shows a counter badge. Add bottom safe-area padding and extra page padding so content is never hidden behind it.
- Desktop: a floating glass-light pill header, centered: logo, main links (active link as a raised white pill), a search pill, favorites, cart, theme toggle. It shrinks slightly on scroll.
- Footer: calm, ink background, large brand word, contact/social links and delivery/return text from config.

Home
- Hero: oversized headline in the display face where ONE word uses the accent style in lime-green (on light backgrounds use a darker readable treatment or place it on a dark/lime shape so contrast stays AA); a ghost word behind; two or three overlapping, slightly rotated rounded cards showing real product images in arch/organic masks (if there are no images yet, show designed empty cards with tinted stages and a garment outline, never broken boxes); one short line of copy; a full-width lime pill CTA on phone (in the thumb zone) and an inline pill on desktop.
- A caption like "X styles available" is allowed ONLY if X is computed from the real product count. No invented numbers anywhere.
- "Build your style" section: big heading, search pill with a round filter button, then the category grid: white rounded cards, the product on its tinted stage, a bottom strip tinted with accent-soft holding the category name and the real item count.
- Featured section: one dark charcoal feature card with a subtle pattern, product name large in white, price in big display numerals, a white pill button; next to it (desktop) or below it (phone) two or three small info tiles (one dark for rhythm) with real data only (sizes available, colors available, category).
- "You may also like": a horizontal snap-scrolling rail of product cards.
- How to order: three simple steps (choose, add to cart, send on WhatsApp) with clean line icons. Honest, short copy.
- Delivery and returns block from config.

Shop (catalog)
- Heading, search pill, filter/sort button opening a glass bottom sheet on phone and a floating glass rail on desktop. A row of category circles (active circle filled charcoal, others soft). Product grid as specified.

Product card
- Tinted stage holding the image slot (4:5); a floating round glass favorite button in one top corner; a sale or out-of-stock chip (glass-ink) in the other; below: name, then price in display numerals (old price struck through when on sale), and a small round "add" button at the end of the row. Hover/focus: the card lifts 4px, the image scales to about 1.03, the shadow moves from soft to lifted.

Product detail
- Large image on a tinted stage with the elliptical ring under it; a vertical thumbnail rail on one edge (horizontal on phone); round glass buttons floating at the top (back, favorite, share); a sheet-like info area with name, large price, underlined tabs (Details / Size guide / Delivery), size chips with a clear selected state, color dots with a ring on the selected one, quantity stepper. Two actions: outlined "add to cart" and a solid pill "order on WhatsApp". On phone these sit in a sticky glass action bar.

Cart drawer
- glass-light sheet with huge radii and a drag handle; items with thumbnail, name, size/color, stepper, remove; the total in large display numerals; one clear lime pill for ordering on WhatsApp. Friendly empty state built from simple shapes plus a "browse products" button.

Image slots (restyle)
- Public empty state: a calm tinted stage with a subtle garment outline (line icon, low contrast). No dashed boxes, no "image missing" text.
- Admin empty state: the same plus a glass chip "أضف صورة" that opens the file picker with one tap. On touch devices the control is always visible; on desktop it appears on hover and on focus.
- Loading: a soft shimmer on the stage. Filled: fade-in. Error: a friendly retry chip.

Toasts
- glass-ink toast that slides up above the nav, auto-hides, short clear message.

8. MOTION
- Durations 120 / 200 / 320 / 500ms. Easings: a soft ease-out for entrances, a gentle spring for sheets and the nav indicator, linear only for shimmer.
- Page load: staggered fade-up of sections and cards (40ms steps, max 8 steps).
- Hover/press: card lift, button press scale 0.97, chip selection with a quick scale-in.
- Nav: the active circle slides to the new item. Sheets slide with a spring. Add to cart: the fly-to-cart arc from the project brief, then a small ring pulse on the cart icon and a badge bounce.
- Ghost word: tiny parallax with transform only.
- Respect prefers-reduced-motion: no movement, only quick fades. Animate only transform and opacity. Nothing that causes layout shift.

9. RESPONSIVE, RTL, DARK MODE
- Test mentally and in code at 360 / 768 / 1024 / 1440. Phone is the main experience.
- RTL is the default: mirror the nav order, thumbnail rails, rotation direction of the hero cards, arrows and chevrons, slider/stepper direction. Keep icons that do not imply direction unchanged. Numbers and prices must display correctly inside RTL text.
- Dark mode is a first-class theme using the dark tokens, deep charcoal and muted lime, never a plain color inversion.

10. ACCESSIBILITY AND PERFORMANCE GUARDRAILS FOR THE LOOK
- Text contrast AA everywhere, including text over glass and over images (use scrims). Touch targets at least 44px. Visible focus rings (use a 2px ink or lime-with-ink ring). Decorative elements aria-hidden.
- Blur is expensive: use glass only on the elements listed here; avoid backdrop-filter on large scrolling lists; do not animate blur. Keep the grain and blobs static. No layout shift from image slots (reserve the ratio). Lazy-load images below the fold.

11. IMAGERY GUIDANCE FOR THE OWNER (goes into the owner README later)
- Best photos: a single garment on a plain light or neutral background, natural soft light, centered with space around it, portrait 4:5, similar framing across products. Cut-out PNGs with transparent backgrounds look best on the tinted stages. Avoid cluttered backgrounds and heavy filters. A consistent photo style matters more than perfect photos.

12. COPY TONE INSIDE THE DESIGN
- Short, human, Egyptian-friendly Arabic, the way a real shop writes. Follow QUALITY_CHECKLIST.md. No marketing filler, no emojis in the interface, no invented numbers, reviews or testimonials.
