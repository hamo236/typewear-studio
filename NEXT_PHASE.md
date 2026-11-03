# Typewear — Next phase recommendations

Research checked 2026-11-02. These are future suggestions only; the current project remains a frontend Preview with no deployment, accounts, payment integration, or real order flow.

## Backend and customer accounts

**Suggested default to evaluate: Supabase**, bundling its managed Postgres, Data API, Storage and Auth rather than adding separate products. It documents React/JavaScript integration and owner-scoped access through Row Level Security (RLS). Keep user-created designs and image files private and restrict reads/writes by the authenticated owner. The Free plan is $0 with finite quotas and free projects pause after one week inactive; Pro currently starts at $25/month with quotas and usage/compute caveats. Recheck current pricing before selecting a production plan. Supabase's published project-region list does not include Egypt; data-location, Egypt account/payment eligibility and local compliance suitability remain unconfirmed. Do not infer compliance from a nearby region.

**Authentication suggestion:** start with email magic link/OTP, optionally Google sign-in, and RLS policies on every saved-design table/storage path. The official pricing page lists 50,000 monthly active users on Free and 100,000 on Pro, but production email requires custom SMTP; the built-in sender is documented as test-only/limited. Verify current quotas, external SMTP cost, Egypt eligibility and local privacy obligations before launch.

## Orders and payments

**Order model suggestion:** keep `orders`, immutable `order_items` snapshots and unique provider webhook-event IDs in one relational database. Store money as integer minor units with a currency. Separate payment status from fulfillment status. Only a verified server-side webhook should mark an order paid; make handlers idempotent and do not trust a browser redirect as payment proof. Use a small server/edge function for the provider webhook and an admin-only fulfillment view. These are architecture recommendations, not implemented behavior.

**Payment provider remains unselected.** The dedicated provider-research subtask was cancelled, so this project has no verified Egypt merchant-provider recommendation or fee comparison. Before choosing, confirm onboarding eligibility, local payment methods, settlement, refund/dispute support and fees directly with an Egypt-capable provider; prefer hosted checkout to avoid handling card data. Do not assume Stripe supports an Egypt-based merchant from its public global list. Payments are not part of this phase.

## Hosting

**Do not deploy now.** When explicitly approved later, keep Manus if one-step project publication or Manus-managed runtime features are important. For a purely static Vite frontend, Cloudflare Pages is a portable low-cost candidate: official docs list free static asset requests, with finite build/file limits; dynamic Pages Functions have separate billing. Vercel supports Vite, but its Hobby plan is restricted to personal, non-commercial use and Pro currently starts at $20/month. Hosting alone does not provide commerce data, secure checkout, inventory, or fulfillment. Confirm billing and domain costs at purchase time.

## Official sources

- Supabase pricing: https://supabase.com/pricing
- Supabase project regions: https://supabase.com/docs/guides/platform/regions
- Supabase React quickstart: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase SMTP: https://supabase.com/docs/guides/auth/auth-smtp
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Supabase Stripe webhook example: https://supabase.com/docs/guides/functions/examples/stripe-webhooks
- Stripe webhooks: https://docs.stripe.com/webhooks
- Stripe supported countries/availability: https://stripe.com/global
- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Pages Functions pricing: https://developers.cloudflare.com/pages/functions/pricing/
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Vercel pricing: https://vercel.com/pricing
- Vercel Vite guide: https://vercel.com/docs/frameworks/frontend/vite
- Manus publishing: https://manus.im/docs/website-builder/publishing
- Manus usage/pricing documentation: https://manus.im/docs/website-builder/getting-started/usage-and-pricing
