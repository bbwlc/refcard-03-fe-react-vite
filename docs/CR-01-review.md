# CR-01: WishlistContext error

## Problem

The app failed to start correctly because of two bugs involving
`src/components/wishlistContext.jsx`.

### 1. Invalid import of a non-exported context

`src/components/Wishlist.jsx` imported `WishlistContext` directly:

```js
import {useWishlist, WishlistContext} from "./wishlistContext.jsx";
```

`wishlistContext.jsx` deliberately no longer exports the raw context object
(only `WishlistProvider` and the `useWishlist` custom hook are exported —
see the comment `// dont export the Context anymore`). Under Vite's strict
ESM handling this import throws:

```
The requested module '/src/components/wishlistContext.jsx' does not provide an export named 'WishlistContext'
```

The `WishlistContext` import was unused in `Wishlist.jsx` — the direct
`useContext(WishlistContext)` calls had already been replaced by the
`useWishlist()` custom hook and were left commented out.

### 2. `null` initial state from localStorage

```js
let initialWishlist;
try {
    initialWishlist = JSON.parse(localStorage.getItem("wishlist"))
} catch {
    console.error("The wishlist could not be parsed into JSON.")
}
```

On first run (nothing in `localStorage` yet), `localStorage.getItem("wishlist")`
returns `null`. `JSON.parse(null)` returns `null` without throwing, so
`initialWishlist` became `null` and was passed as the initial state to
`useReducer(tripsReducer, initialWishlist)`. `Wishlist.jsx` then called
`wishlist.map(...)`, throwing:

```
Cannot read properties of null (reading 'map')
```

## Fix

**`src/components/Wishlist.jsx`**
- Removed the unused/invalid `WishlistContext` import, keeping only
  `useWishlist`.
- Removed the unused `wishlist` destructure in the `Wish` sub-component
  (only `dispatch` is used there), clearing an `eslint no-unused-vars`
  warning at the same time.

**`src/components/wishlistContext.jsx`**
- `initialWishlist` now defaults to `[]` both when `localStorage` has no
  entry (`?? []`) and when parsing fails (set in the `catch` block), so the
  reducer's initial state is always an array.

## Verification

- Started the Vite dev server and loaded the app in a headless browser.
- Result: HTTP 200, page title `"Vite + React"`, wishlist table rendered,
  **0 console errors/warnings**, **0 failed network requests**.
