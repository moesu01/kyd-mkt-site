# KYD Marketing Site

React + Vite marketing one-pager for KYD Labs. Ported from the static HTML prototype with an OKLCH grayscale design system and Inter typography.

## Stack

- React 19 + TypeScript
- Vite
- Chakra UI v3 (`@chakra-ui/react`, `@emotion/react`, `next-themes`)

## Development

```bash
npm install
npm run dev
```

After changing theme tokens, regenerate Chakra types:

```bash
npm run typegen
```

## Build

```bash
npm run build
npm run preview
```

## Design

- **Fonts:** Inter (sans), IBM Plex Mono (labels/meta) — loaded via Google Fonts in `index.html`
- **Theme:** Grayscale OKLCH tokens in `src/theme/tokens.ts`, composed in `src/theme/index.ts`
- **Provider:** `src/components/ui/provider.tsx` wraps the app with `ChakraProvider` (preflight enabled) and a forced dark theme
- **Breakpoint:** Custom `lg901` (901px) for desktop layouts
- **Hero:** Split hero (`HeroSplit`) with centered overlay copy

## Project structure

```
src/
├── components/       # Page sections + UI primitives
├── content/          # Static copy and links
├── theme/            # Chakra system, tokens, button recipe
└── index.css         # Minimal globals (font smoothing)
```
