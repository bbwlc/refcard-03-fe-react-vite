export default function tripsReducer(wishlist, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add": {
      const { id, title, description, startTrip, endTrip } = action.trip;
      const itemInWishlist = wishlist.find((i) => i.id === id);
      if (itemInWishlist) {
        return wishlist.map((i) =>
          i.id === id
            ? {
                ...i,
                title,
                description,
                startTrip,
                endTrip,
              }
            : i
        );
      }
      return [...wishlist, { id, title, description, startTrip, endTrip }];
    }

    case "deleteItem": {
      const { id } = action;

      let newArray = wishlist.slice(0);
      let indexToRemove;
      newArray.some((it, index) => {
        if (it.id === id) {
          indexToRemove = index;
          return true;
        }
        return false;
      });
      newArray.splice(indexToRemove, 1);
      return newArray;
    }
    default:
      throw new Error("Unhandled action: " + action.type);
  }
}
