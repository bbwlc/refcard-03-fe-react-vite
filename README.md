# React + Vite

## Getting the starting point

**Option A — fresh clone at the starting point**

```bash
git clone --branch v1-start https://github.com/bbwlc/refcard-03-fe-react-vite.git
cd refcard-03-fe-react-vite
npm install
npm run dev
```

**Option B — you already have the repo cloned**

```bash
git fetch --tags
git checkout v1-start
npm install
npm run dev
```

This puts you in a "detached HEAD" state at the tag — fine for exploring, but if you'll commit your own work, branch off it first:

```bash
git checkout -b my-work v1-start
```

> The app calls a backend at `http://localhost:8080/v1/trips` (see the `RefCard-03-be-SpringBootBusinessTrips` project), so make sure that's running too for the trip list / wishlist to show real data.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
