import { getItemPrice, getPriceFixed } from "./getItemPrice";

export const getTotalPrice = (cartItems) => {
  let total = 0;
  cartItems?.forEach?.((i) => {
    total += Number(getItemPrice(i) * i.quantity);
  });
  return getPriceFixed(total);
};
