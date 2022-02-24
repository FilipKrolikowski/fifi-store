import "./Navbar.scss";
import Logo from "../../images/Logo.png";
import BagIcon from "../../images/icons/bag-icon.svg";
import BagCircleIcon from "../../images/icons/bag-circle.svg";
import UserCircleIcon from "../../images/icons/user-circle.svg";
import ToggleIcon from "../../images/icons/burger.svg";
import { categories } from "../../storeItems";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { AppContext } from "../../app-context";
import { getItemPriceWithQuantity } from "../utils/getItemPrice";
import { getTotalPrice } from "../utils/getTotalPrice";

function Navbar() {
  const [hideHeader, setHideHeader] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const { currentCart, deleteCartItem } = useContext(AppContext);

  const handleHideHeader = () => {
    if (window.innerWidth > 991) {
      setHideHeader(window.pageYOffset > 60);
    }
  };

  useEffect(() => {
    document.title = "FIFI Store";
    window.addEventListener("scroll", handleHideHeader);
    return () => {
      window.removeEventListener("scroll", handleHideHeader);
    };
  }, []);

  return (
    <>
      <div className={`header-container ${hideHeader ? "hide-header" : ""}`}>
        <div className="header d-flex justify-content-between">
          <div className="d-flex d-lg-none align-items-center">
            <div>
              <img src={ToggleIcon} alt="" onClick={() => setShowSideMenu(true)} className="mobile-icon mx-2" />
            </div>
          </div>
          <Link to="/" className="link">
            <div className="logo-container d-flex align-items-center justify-content-end">
              <div>
                <img src={Logo} alt="logo" className="logo" />
              </div>
              <div className="header-text ms-4">FIFI</div>
            </div>
          </Link>
          <div className="login-container align-items-center d-none d-lg-flex">
            <Link to="/login" className="custom-nav-link">
              <div className="login-btn mx-1 text-nowrap me-2">ZALOGUJ SIĘ</div>
            </Link>
            <div className="login-btn mx-1 text-nowrap">ZAREJESTRUJ SIĘ</div>
            <div className="cart-icon-container ms-2">
              <span className="cart-length-container">{currentCart.length}</span>
              <Link to="/cart" className="custom-nav-link">
                <img src={BagIcon} alt="bag" className="cart-icon mx-2 pointer" />
              </Link>
              <div className="cart-preview-modal">
                {currentCart.length ? (
                  <div>
                    {currentCart?.map?.((i) => (
                      <div
                        key={`cart-preview-${i.size}-${i.id}`}
                        className="cart-preview-item-container row mx-auto py-3"
                      >
                        <div className="col-3 cart-preview-modal-image-container">
                          <img src={i.image} alt="" className="cart-preview-modal-image" />
                        </div>
                        <div className="col-8 d-flex flex-column justify-content-between">
                          <div className="d-flex justify-content-between">
                            <span className="cart-preview-name">{i.name}</span>
                            <span className="cart-preview-quantity ms-2 mt-1">x{i.quantity}</span>
                          </div>
                          <div className="cart-preview-size">{i.size}</div>
                          <div className="cart-preview-price">{getItemPriceWithQuantity(i)} zł</div>
                        </div>
                        <div className="col-1">
                          <span onClick={() => deleteCartItem(i)} className="preview-delete-item pointer">
                            &#x2715;
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="total d-flex my-3 px-3 align-items-center justify-content-between">
                      <div className="total-text">RAZEM: {getTotalPrice(currentCart)} zł</div>
                      <div>
                        <Link to="/cart" className="custom-nav-link">
                          <button className="custom-btn" type="button">
                            Finalizacja zamównienia
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="text-center">Dodaj produkty do swojego koszyka</div>
                    <div className="d-flex justify-content-center mt-4">
                      <Link to="/category/blouse" className="custom-nav-link">
                        <button className="custom-btn" type="button">
                          Zobacz produkty
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex d-lg-none align-items-center">
            <div className="position-relative">
              <span className="cart-length-container">{currentCart.length}</span>
              <Link to="/cart" className="custom-nav-link">
                <img src={BagCircleIcon} alt="" className="mobile-icon mx-2" />
              </Link>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="none" className={`d-flex align-items-center login-toggle`}>
                  <div>
                    <img src={UserCircleIcon} alt="" className="mobile-icon mx-2" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="left">
                  <Dropdown.Item className="custom-dropdown-item">
                    <Link to="/login" className="custom-nav-link">
                      <div>ZALOGUJ SIĘ</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="custom-dropdown-item">
                    <div>ZAREJESTRUJ SIĘ</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="store-nav justify-content-center d-none d-lg-flex">
          {categories.map((item) => (
            <Link key={item.name} to={`/category/${item.id}`} className="custom-nav-link">
              <div className="nav-item">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="header-margin"></div>
      <div
        className={`d-flex mobile-side-menu d-lg-none flex-column ${
          showSideMenu ? "show-side-menu" : "hide-side-menu"
        }`}
      >
        <div onClick={() => setShowSideMenu(false)} className="close-btn mt-1 align-self-end me-3">
          &#x2715;
        </div>
        <div className="mt-4">
          {categories.map((item) => (
            <Link key={`nav-${item.name}`} to={`/category/${item.id}`} className="custom-nav-link">
              <div className="mobile-nav-item">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
