# GitHub Pages deployment

This repository deploys the Typewear frontend prototype to GitHub Pages using `.github/workflows/deploy-pages.yml`. The workflow rebuilds `dist/public` from source whenever `main` changes and publishes it as a static site. It also provides a fallback for the client-side routes.

The site supports sample product browsing, garment customization, and browser-local draft/cart state. Prices and products are examples. There is no live inventory, account service, backend API, remote persistence, payment checkout, order processing, or contact-message delivery. Do not use the demo cart for real purchases. Those features require separately provisioned services and should not be considered operational on GitHub Pages.
