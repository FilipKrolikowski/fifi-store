import "./ItemStars.scss";
import GoldStarIcon from "../images/icons/gold-star.svg";
import GrayStarIcon from "../images/icons/gray-star.svg";
import { range } from "lodash";

function ItemStars({ stars = 0 }) {
  const goldenStars = stars;
  const grayStars = 5 - stars;
  return (
    <div className="item-stars d-flex">
      {range(goldenStars).map((index) => (
        <img key={`gold-star-${index}`} src={GoldStarIcon} alt="" className="star-icon mx-1" />
      ))}
      {range(grayStars).map((index) => (
        <img key={`gray-star-${index}`} src={GrayStarIcon} alt="" className="star-icon mx-1" />
      ))}
    </div>
  );
}

export default ItemStars;
