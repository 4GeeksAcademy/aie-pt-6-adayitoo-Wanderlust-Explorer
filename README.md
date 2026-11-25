# ✈ Wanderlust Explorer

Wanderlust Labs — plataforma travel-tech para descubrir y guardar experiencias.

## Stack
- **Next.js 14** (App Router) + **TypeScript Strict** + **Tailwind CSS 3** (CDN)
- **React Context API** para estado global de favoritos
- **localStorage** para persistencia

## Arranque rápido
```bash
npm install
npm run dev
```

## Rutas (5 páginas)
| Ruta | Página |
|------|--------|
| `/` | Home — Hero + CTA + estadísticas |
| `/experiences` | Explorer — Grid 1→4 columnas, 100 cards |
| `/experiences/[id]` | Detail — Info completa, 404 si no existe |
| `/favorites` | Favorites — Wishlist con empty state |
| `/profile` | Profile — Alex Wanderer + favoritos guardados |

## Estructura
```
src/
├── app/               ← 5 page.tsx + layout.tsx
├── components/        ← ExperienceCard, FavoriteButton, FavoritesProvider
├── data/              ← 100 experiencias dataset
├── hooks/             ← useFavorites (localStorage CRUD)
└── types/             ← Category, Difficulty, Experience, FavoriteItem
```

> Nota: `src/` es la raíz del proyecto. Los archivos legacy (`app/`, `components/`, etc.)
> están respaldados en `legacy-backup/`.
