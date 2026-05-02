# Design Brief

## Direction

Vibrant African marketplace energy — Jumia-inspired bold orange primary with clean editorial craftsmanship. Energetic, trustworthy, commerce-forward.

## Tone

Modern African marketplace: vibrant orange excitement tempered by crisp, neutral hierarchy. Approachable but premium. Professional seller/buyer trust signals throughout.

## Differentiation

Orange primary brand color (Jumia recognition) paired with emerald accents; product cards as trust narratives (image > rating > price > seller badge); bold search prominence; role-based nav hierarchy.

## Color Palette

| Token      | OKLCH         | Role                        |
|------------|---------------|--------------------------|
| primary    | 0.58 0.18 35  | Vibrant orange, Jumia brand |
| background | 0.99 0.004 240| Pristine white              |
| foreground | 0.18 0.012 240| Deep charcoal, readability  |
| accent     | 0.58 0.14 140 | Emerald, trust/success      |
| secondary  | 0.45 0.008 240| Slate gray, neutral         |

## Typography

- Display: Space Grotesk — geometric boldness for headers, role labels, hero
- Body: General Sans — modern, warm for UI text, product descriptions
- Scale: hero `text-5xl font-bold tracking-tight`, h2 `text-3xl font-bold`, label `text-xs uppercase`, body `text-sm`

## Elevation & Depth

Three-tier shadow: `shadow-subtle` (cards), `shadow-card` (product tiles), `shadow-elevated` (modals, popovers). Warm charcoal shadows, never neon.

## Structural Zones

| Zone    | Background | Border       | Notes                               |
|---------|------------|------------|------------------------------------|
| Header  | card       | border-b   | Orange logo, search, cart, user     |
| Content | background | —          | White, alternating card sections    |
| Footer  | secondary  | border-t   | Dark slate, links, legal            |
| Cards   | card       | border     | 8px radii, 1px border               |

## Spacing & Rhythm

Section gaps 24–32px (6–8 units), card grid gaps 16px (4 units), micro 8px (2 units). Spacious breathing room.

## Component Patterns

- Buttons: Orange fill primary, white text; outline secondary; emerald success/verify actions. 8px radii, `font-semibold`.
- Cards: White, subtle shadow, seller badge with green accent; 3-col grid (lg), 2-col (md), 1-col (sm).
- Badges: Green (`accent`) for verified, red (`destructive`) for flagged, slate (`muted`) for neutral.

## Motion

- Entrance: `fade-in` on load (200ms), `slide-up` on card expand (300ms)
- Interaction: `shadow-elevated` on card hover, primary darker on button press
- Principle: Clarity over decoration

## Constraints

- Orange is primary, never diluted; use sparingly for action buttons and hero accents
- Emerald accents: verified badges, success states, positive actions
- No purple, no gradients, no blurs
- Shadows from `boxShadow` tokens only

## Signature Detail

Product card: image → star rating → price (orange bold) → seller name (small, slate gray) → "✓ Verified" badge (emerald). Creates immediate marketplace trust and Jumia familiarity.
