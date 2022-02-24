export const getItemPrice = (item) => {
  let price;
  if (item.discount) {
    const discount = item.price * (item.discount / 100);
    price = item.price - discount;
  } else {
    price = item.price;
  }
  return (Math.round(price * 100) / 100).toFixed(2);
};

export const getPriceFixed = (price) => {
  return (Math.round(price * 100) / 100).toFixed(2);
};

export const getItemPriceWithQuantity = (item) => {
  return (item.quantity * getItemPrice(item)).toFixed(2);
};
