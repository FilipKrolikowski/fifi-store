import "./AddedToCartModal.scss";
import { Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import CartIcon from "../../../images/custom-icons/CartIcon";
import { AppContext } from "../../../app-context";
import { getItemPrice } from "../../utils/getItemPrice";
import { Link } from "react-router-dom";
import { getTotalQuantity } from "../../utils/getTotalQuantity";
import { getTotalPrice } from "../../utils/getTotalPrice";

function AddedToCartModal({ item, display = "button", action = () => {}, size = "xs/s", quantity = 1 }) {
  const [showModal, setShowModal] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { addItemToCart, currentCart } = useContext(AppContext);

  const handleAddItem = () => {
    setShowModal(true);
    addItemToCart(item, size, quantity);
  };

  const handleClose = () => {
    setShowModal(false);
    action();
  };

  const displayMap = {
    button: (
      <button type="button" onClick={handleAddItem} className="add-to-cart-btn mt-2 ms-4">
        DO KOSZYKA
      </button>
    ),
    icon: (
      <span
        title="Do koszyka"
        onClick={handleAddItem}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <CartIcon className="item-icon mx-1" color={isHover ? "#fff" : "#949494"} />
      </span>
    ),
  };

  return (
    <>
      <Modal show={showModal} size="lg" centered onHide={handleClose}>
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="row mx-auto added-to-cart-modal">
            <div className="col-12 col-lg-6">
              <div className="image-container d-flex justify-content-center">
                <img src={item.image} alt="" className="image" />
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column">
              <div className="added mt-4 mt-lg-0">Dodano:</div>
              <div className="name mb-3 mt-2 mt-lg-0">{item.name}</div>
              <div className="price mb-3">Cena: {getItemPrice(item)} zł</div>
              <div className="price mb-3">Rozmiar: {size}</div>
              <div className="price mb-3">Ilość: {quantity}</div>
              <div className="mt-auto">
                <div className="cart-items-count mb-2">
                  Ilość produktów w Twoim koszyku: {getTotalQuantity(currentCart)}
                </div>
                <div className="total">Razem: {getTotalPrice(currentCart)} zł</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <div>
            <button type="button" className="custom-btn mx-2" onClick={handleClose}>
              Kontynuuj Zakupy
            </button>
            <Link to="/cart" className="custom-nav-link">
              <button type="button" className="custom-btn mx-2">
                Przejdz do koszyka
              </button>
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
      {displayMap[display]}
    </>
  );
}

export default AddedToCartModal;
