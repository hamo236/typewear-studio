# Typewear Clothing Studio — Design Brief and Implementation Plan

## Design brief

**Brand:** Typewear — confident, crafted, clear. **Target user:** young Egyptian shoppers who want to personalize everyday apparel quickly on phone or desktop. **Visual style:** premium editorial fashion, restrained and tactile; realistic garment silhouettes stay visually dominant while a calm interface supports them.

## System decisions

**Stack:** continue the existing React 19 + Vite 7 + Tailwind CSS v4 application and Wouter routes. Use the installed Lucide React icon set. Build the garment mockups and editor interactions with accessible React controls and SVG, avoiding a new canvas dependency in this frontend-only phase.

**Color tokens:** brand ink `#1D2221`; accent coral `#E66B4E`; 10-step neutral ramp: `#FFFEFA`, `#F7F5F0`, `#ECE9E2`, `#D8D4CB`, `#B8B4AA`, `#918D85`, `#6B6963`, `#484946`, `#2E3230`, `#1D2221`; semantic success `#187A5A`, warning `#9A5C12`, error `#B43F36`. Map tokens to separate light and dark themes. Use these token values throughout rather than one-off colors.

**Typography:** locally hosted Google Fonts Cairo for Arabic/body text and DM Sans for Latin display, English UI, and numeric labels. Define Display, H1–H4, Body L/M/S, and Caption with explicit sizes, weights, and line heights. Both font families are open source under the SIL Open Font License.

**Spacing and surfaces:** use only 4/8px rhythm values; radii 8/16/24px; border levels 1/1.5/2px; three restrained shadow tokens. Components include primary/secondary/ghost/icon buttons, fields, slider, theme/language toggles, tabs, color swatches, dropdowns, modals, toast feedback, tooltips, cards, badges, upload dropzone, editor selection handles, and layer controls. Provide visible hover, focus, pressed, disabled, and loading states where applicable.

## Pages and behavior

- `/`: sticky bilingual header, animated garment mockup, primary Start Designing action, 3-step explanation, featured products, hand-made example designs, placeholder trust statements, and footer.
- `/products`: product mockup cards, name, demo starting price, working color swatches, Customize action, explicit front/back toggle, and mobile-friendly filter/sort.
- `/editor`: desktop tool rail, central SVG garment canvas, dynamic properties panel and top bar; on phones put the canvas first and open tools in a bottom sheet. Support T-shirt, hoodie and cap; garment color; front/back; text and local image upload; selection, movement, resize, rotation, snapping guides, print-area boundary, text formatting, visibility/locking/reordering/deletion of layers, undo/redo, zoom, local save, SVG download, and a demo price estimate based on size, quantity and printed sides. Validate image type and size, show a resolution warning, and provide empty/success/error feedback. Curved text is not supported and will be labeled as such.
- `/cart`: local demo design summary with design thumbnail, size, quantity, price, and a clear no-payments / next-phase notice.
- `/about`: brand information and a contact form clearly labeled Demo only because it does not send messages.
- `/404`: branded not-found screen.
- `/design-system`: hidden from navigation, showing tokens and component states for review.

All product/design examples and displayed prices are sample data and will be labeled. There will be no real orders, payment, backend, or domain connection. Do not publish or deploy; the user reviews the app in Manus Preview.

## Project structure

Keep the existing Vite app entry and routes in `client/src/App.tsx`, global Tailwind/CSS tokens in `client/src/index.css`, and static metadata in `client/index.html` plus `client/public/manus-routes.json`. Add pages in `client/src/pages/`; shared app shell, garment SVG, design canvas, tool panels, product cards and reusable controls in `client/src/components/`; typed editor data, translations, persistence and SVG export helpers in `client/src/lib/`. Continue using the existing project package setup and port 3000.

## Delivery and verification

After implementation, run TypeScript checks and a clean static build; verify every route and key editor flows in browser at 360, 768, 1024 and 1440px. Review requested desktop/mobile screenshots for Home, Products, and Editor in English and Arabic, fix visible defects, and provide screenshots, the Design System summary, repository/license list, Next Phase recommendations, a Reality Report, and any caveat. Restart the development service on port 3000 to load the changed project environment. Do not run a public deployment.
