# KICKS Store 👟

A modern shoe e-commerce web app built with Next.js 14, TypeScript, and Tailwind CSS — faithful to the Figma design.

## 🚀 Live Demo
> Deploy to Vercel and add your URL here

## 🛠 Tech Stack
| Category | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | React Context API |
| Data Fetching | Axios |
| Icons | Lucide React |

## 📋 Features
- **Landing Page** — Hero section, New Drops (API), Categories (API), Reviews, KicksPlus banner
- **Product Detail Page** — Image gallery, size/color selector, Add to Cart, You May Also Like
- **Cart Page** (Bonus) — Full cart management, order summary, local state persistence
- **Responsive** — Mobile and desktop layouts matching Figma designs
- **API States** — Loading skeletons, error states with retry, empty states
- **Cart Persistence** — localStorage saves cart between sessions

## 🔌 API
Uses [Platzi Fake Store API](https://fakeapi.platzi.com/en/rest/products/):
- `GET /api/v1/products` — Product listing
- `GET /api/v1/products/:id` — Product detail
- `GET /api/v1/categories` — Categories list

## ⚙️ Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kicks-store/
├── app/
│   ├── page.tsx              # Landing page
│   ├── product/[id]/page.tsx # Product detail page
│   ├── cart/page.tsx         # Cart page (Bonus)
│   └── layout.tsx            # Root layout
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── SkeletonCard.tsx
│   └── ErrorState.tsx
├── context/
│   └── CartContext.tsx       # Cart state management
├── lib/
│   └── api.ts                # API utility functions
└── types/
    └── index.ts              # TypeScript types
```

## 📝 Notes
- Cart state is managed with React Context + useReducer + localStorage
- API images from Platzi Fake Store are sanitized (some come as JSON arrays)
- Fallback images used when API images fail to load
- All pages are fully responsive for mobile and desktop
