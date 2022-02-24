import "./Cart.scss";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { useContext } from "react";
import { AppContext } from "../../../app-context";
import { getTotalQuantity } from "../../utils/getTotalQuantity";
import CartItem from "../../CartItem";

function Cart() {
  const { currentCart } = useContext(AppContext);
  return (
    <div className="cart py-5">
      <div className="row mx-auto mt-5">
        <div className="col-12 col-lg-8">
          <div className="cart-title">Koszyk</div>
          <div>
            {currentCart?.map?.((item) => (
              <CartItem item={item} key={`cart-item-${item.size}-${item.id}`} />
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
          <div className="cart-total">
            <div className="d-flex justify-content-center justify-content-lg-start">
              <div className="cart-quantity">{getTotalQuantity(currentCart)} sztuk</div>
              <div className="cart-total-price ms-3">{getTotalPrice(currentCart)} zł</div>
            </div>
            <div className="d-flex mt-2 justify-content-center justify-content-lg-start">
              <div className="cart-quantity">Wysyłka</div>
              <div className="cart-total-price ms-3">Za darmo!</div>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <button type="button" className="custom-btn">
                Przejdź do realizacji zamówienia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
