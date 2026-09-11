import React, {useReducer, useEffect, useContext} from 'react'
import tripsReducer from "./tripsReducer";
// initialize the wishlist from local storage
let initialWishlist;
try {
    initialWishlist = JSON.parse(localStorage.getItem("wishlist")) ?? []
} catch {
    console.error("The wishlist could not be parsed into JSON.")
    initialWishlist = []
}
// dont export the Context anymore
const WishlistContext = React.createContext(null)
// we define a centralized Context Provider Component!!
export function WishlistProvider(props) {

    // useReducer to manage the wishlist state and dispatch actions to the reducer
    const [wishlist, dispatch] = useReducer(tripsReducer, initialWishlist)

    // useEffect to store the wishlist in local storage
    useEffect(()=> localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist])
    // contextValue an object with the wishlist and the dispatch function as properties
    const contextValue = {wishlist, dispatch}

    return(
        // return the Provider with the value prop
        <WishlistContext.Provider value ={contextValue}>
            {props.children}
        </WishlistContext.Provider>
    )
}

// make our own customHook yuhui to easily consume and protect the context,
// displays error messages
export function useWishlist() {
    // useContext
    const context = useContext(WishlistContext)
    // Error Handling can be done here
        if (!context) {
            throw new Error(
                "useWishlist custom Hook must be used within a WishlistProvider." +
                "Wrap a parent in <WishlistProvider> to fix this error"
            )
        }
    // return the context value if no error is thrown above
    return context
}
