import "./StoreItem.scss";
import AddedToCartModal from "./views/modals/AddedToCartModal";
import PreviewItemModal from "./views/modals/PreviewItemModal";
import { getItemPrice, getPriceFixed } from "./utils/getItemPrice";
import { useState } from "react";
import MoreIcon from "../images/custom-icons/MoreIcon";
import { Link, useNavigate } from "react-router-dom";
import ItemStars from "./ItemStars";

function StoreItem({ item, maxInLine = "4" }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    if (typeof e.target.className === "string") {
      if (e.target.className.includes("navigate")) {
        navigate(`/product/${item.id}`);
      }
    }
  };
  return (
    <div
      className={`navigate store-item-container d-flex justify-content-center align-items-center py-2 ${
        maxInLine === "4" ? "col-12 col-sm-6 col-md-4 col-lg-3" : "col-12 col-sm-6 col-md-4"
      }`}
    >
      <div
        onClick={(e) => handleNavigate(e)}
        className="store-item navigate h-100 w-100 pt-5 pb-4 d-flex flex-column align-items-center"
      >
        <div className="icons-container d-flex justify-content-center">
          <AddedToCartModal item={item} display="icon" />
          <PreviewItemModal item={item} />
          <Link to={{ pathname: `/product/${item.id}` }}>
            <span
              title="Więcej informacji"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <MoreIcon className="item-icon mx-1" color={isHover ? "#fff" : "#949494"} />
            </span>
          </Link>
        </div>
        {item.discount && <div className="discount">- {item.discount}%</div>}
        <div className="image-container navigate">
          {item.images.length && <img src={item.images[0]} alt="" className="item-second-image navigate" />}
          <img src={item.image} alt="" className="item-image navigate" />
        </div>
        <div className="mt-3">
          <ItemStars stars={item.stars} />
        </div>
        <div className="item-name text-center navigate mt-3">{item.name}</div>
        <div className="item-price-container navigate d-flex align-items-center">
          {item.discount && <div className="old-price navigate me-2">{getPriceFixed(item.price)} zł</div>}
          <div className="item-price d-flex navigate">
            {getItemPrice(item)} zł
            <div className="brutto ms-2 navigate"> Brutto</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreItem;
