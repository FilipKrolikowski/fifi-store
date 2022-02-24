import React, { createContext, useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  currentCart: [],
  setCurrentCart: () => {},
  addItemToCart: () => {},
  deleteCartItem: () => {},
  handleItemQuantity: () => {},
};

export const AppContext = createContext(initialState);

const StoreAppContext = ({ children }) => {
  const [currentCart, setCurrentCart] = useState({});

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("fifiStoreCart")) || [];
    setCurrentCart(cart);
  };

  const addItemToCart = (item, size, quantity) => {
    const copyCurrentCart = cloneDeep(currentCart);
    const alreadyAddedItem = copyCurrentCart?.find((currentItem) => currentItem.id === item.id) || {};
    if (alreadyAddedItem && alreadyAddedItem.size === size) {
      alreadyAddedItem.quantity = alreadyAddedItem.quantity + quantity;
    } else {
      copyCurrentCart.push({ ...item, size, quantity });
    }
    setCurrentCart(copyCurrentCart);
    localStorage.setItem("fifiStoreCart", JSON.stringify(copyCurrentCart));
  };

  const deleteCartItem = (item) => {
    const copyCurrentCart = cloneDeep(currentCart);
    const filteredCart = copyCurrentCart.filter((currentItem) => {
      if (currentItem.id === item.id) {
        if (currentItem.size === item.size) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });
    setCurrentCart(filteredCart);
    localStorage.setItem("fifiStoreCart", JSON.stringify(filteredCart));
  };

  const handleItemQuantity = (item, quantity) => {
    const copyCurrentCart = cloneDeep(currentCart);
    const alreadyAddedItem = copyCurrentCart?.find((currentItem) => currentItem.id === item.id);
    alreadyAddedItem.quantity = alreadyAddedItem.quantity + quantity;
    setCurrentCart(copyCurrentCart);
    localStorage.setItem("fifiStoreCart", JSON.stringify(copyCurrentCart));
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentCart,
        addItemToCart,
        deleteCartItem,
        handleItemQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default StoreAppContext;
