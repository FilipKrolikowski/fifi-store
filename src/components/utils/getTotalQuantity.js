export const getTotalQuantity = (cartItems) => {
  let total = 0;
  cartItems?.forEach?.((i) => {
    total += i.quantity;
  });
  return total;
};
