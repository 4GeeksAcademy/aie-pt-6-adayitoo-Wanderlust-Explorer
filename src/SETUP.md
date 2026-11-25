# Wanderlust Explorer — Configuración del proyecto

## Estructura
- **`src/`** es la raíz del proyecto Next.js (NO `app/` en raíz)
- Next.js 14+ detecta automáticamente `src/app/` cuando no existe `app/` en raíz
- No se necesita `next.config.js` ni `srcDir`

## Archivos de configuración creados
- `package.json` — Next.js 14.2.35, React 18.3.1, TypeScript 5.9.3
- `tsconfig.json` — strict: true, jsx: preserve, includes src/**/*.ts(x)
- `.gitignore` — node_modules, .next, out, dist

## Legacy backup
- Los archivos antiguos (app/, components/, hooks/, lib/) están en `legacy-backup/`
- El CSS personalizado (755 líneas) está en `legacy-backup/app/globals.css`

## 5 rutas (src/app/)
| Ruta | Componente | Tipo |
|------|-----------|------|
| `/` | Home (hero + CTA) | Server Component |
| `/experiences` | Explorer (grid 1→4 cols) | Server Component |
| `/experiences/[id]` | Detail (info completa + 404) | Server Component |
| `/favorites` | Favorites (wishlist + empty state) | Client Component |
| `/profile` | Profile (Alex Wanderer + stats) | Client Component |

## Comandos
- `npm run dev` — Inicia dev server
- `npm run build` — Build producción
- `npx tsc --noEmit` — Type check