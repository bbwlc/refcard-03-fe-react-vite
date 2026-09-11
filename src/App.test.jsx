import {render, screen} from "@testing-library/react";
import App from "./App";
import {WishlistProvider} from "./components/wishlistContext.jsx";

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({ok: true, json: () => Promise.resolve([])})
  );
});

test("renders without crashing", () => {
  render(
    <WishlistProvider>
      <App/>
    </WishlistProvider>
  );
  expect(screen.getByText(/Business Trips - Frontend Development/i)).toBeInTheDocument();
});

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
