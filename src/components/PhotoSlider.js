import "./PhotoSlider.scss";
import { Slide } from "react-slideshow-image";
import { useState, useEffect, useRef } from "react";
import { homePageItems } from "../storeItems";

function PhotoSlider() {
  const timeout = useRef(null);
  const [itemsToSlide, setItemsToSlide] = useState(
    homePageItems.map((item) => {
      return { ...item, animate: false };
    })
  );
  const handleAnimation = (id) => {
    timeout.current = setTimeout(() => {
      setItemsToSlide(
        homePageItems.map((item, index) => {
          return { ...item, animate: index === id };
        })
      );
    }, 2000);
  };

  const properties = {
    duration: 6000,
    transitionDuration: 500,
    infinite: true,
    arrows: false,
    onChange: (prev, next) => {
      handleAnimation(next);
    },
  };

  const showAnimation = (animate, direction) => {
    return animate ? `show-item` : `hide-item-${direction}`;
  };

  useEffect(() => {
    handleAnimation(0);
  }, []);

  return (
    <Slide {...properties} easing="ease">
      {itemsToSlide.map((item, index) => (
        <div
          key={`key-photo-slider-${index}`}
          className="photo-slider d-flex flex-column justify-content-center px-4"
          style={{ backgroundImage: `url('${item.image}')` }}
        >
          <div className={`fifi mb-1 mb-sm-3 ${showAnimation(item.animate, "right")}`}>FIFI</div>
          <div className={`item-name mb-1 mb-sm-3 ${showAnimation(item.animate, "left")}`}>{item.name}</div>
          <div className={`item-desc mb-2 mb-sm-5 ${showAnimation(item.animate, "right")}`}>{item.description}</div>
          <div>
            <button className={`item-btn ${showAnimation(item.animate, "left")}`} type="button">
              ZOBACZ WIĘCEJ!
            </button>
          </div>
        </div>
      ))}
    </Slide>
  );
}

export default PhotoSlider;
