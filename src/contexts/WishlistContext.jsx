"use client";

import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const wishlistCount = planetsWishlist.length;

  const addPlanetToWishlist = (item) => {
    setPlanetsWishlist((prev) => [...prev, item]);
  };

  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist((prev) => prev.filter((p) => p.name !== name));
  };

  const isPlanetInWishlist = (name) => {
    return planetsWishlist.some((p) => p.name === name);
  };

  return (
    <WishlistContext.Provider
      value={{
        planetsWishlist,
        wishlistCount,
        addPlanetToWishlist,
        removePlanetFromWishlist,
        isPlanetInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
