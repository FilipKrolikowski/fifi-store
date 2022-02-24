import "./CartItem.scss";
import { AppContext } from "../app-context";
import { useContext } from "react";
import { getItemPriceWithQuantity, getItemPrice, getPriceFixed } from "./utils/getItemPrice";
import DeleteIcon from "../images/icons/delete-icon.svg";

function CartItem({ item }) {
  const { deleteCartItem, handleItemQuantity } = useContext(AppContext);

  const handleSelectedQuantity = (quantity) => {
    handleItemQuantity(item, quantity);
  };

  return (
    <div className="cart-item my-4 d-flex align-items-center row mx-auto justify-content-center">
      <div className="cart-image-container col-md-3 col-12">
        <img src={item.image} alt="" className="cart-image" />
      </div>
      <div className="text-container col-md-4 col-12">
        <div className="cart-item-name text-center text-md-start mt-3 mt-md-0">{item.name}</div>
        <div className="cart-item-price-container d-flex justify-content-center justify-content-md-start mt-2 mt-md-0">
          {item.discount && <div className="cart-item-old-price me-2">{getPriceFixed(item.price)} zł</div>}
          <div className="cart-item-price ms-1"> {getItemPrice(item)} zł</div>
        </div>
        <div className="cart-item-price-size text-center text-md-start mt-2 mt-md-0">
          Rozmiar: <span className="ms-2">{item.size}</span>
        </div>
      </div>
      <div className="quantity-container col-md col-12 d-flex justify-content-center justify-content-md-start mt-2 mt-md-0">
        <span className="mt-2 cart-item-quantity-change d-flex">
          <span className="pointer" onClick={() => handleSelectedQuantity(-1)}>
            -
          </span>
          <span className="mx-4">{item.quantity}</span>
          <span className="pointer" onClick={() => handleSelectedQuantity(1)}>
            +
          </span>
        </span>
      </div>
      <div className="cart-item-total-price col-md col-12 text-center text-md-start mt-3 mt-md-0">
        {getItemPriceWithQuantity(item)} zł
      </div>
      <div className="cart-item-delete-container col-md-auto col-12 d-flex justify-content-center justify-content-md-start mt-2 mt-md-0">
        <span onClick={() => deleteCartItem(item)}>
          <img src={DeleteIcon} alt="" className="delete-cart-item pointer" />
        </span>
      </div>
    </div>
  );
}

export default CartItem;
