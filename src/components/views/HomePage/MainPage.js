import "./MainPage.scss";
import React from "react";
import StoreItem from "../../StoreItem";
import { upcomingItems } from "../../../storeItems";
import UpcomingItem from "../../UpcomingItem";
import AboutUsImage from "../../../images/about-us.jpg";
import PhotoSlider from "../../PhotoSlider";
import { getRecommendedItems } from "../../utils/getRecommendedItems";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="main-page">
      <PhotoSlider />
      <div className="main-page-container">
        <div className="our-products my-5 text-center">POLECANE PRODUKTY</div>
        <div className="items-container row mx-auto">
          {getRecommendedItems().map((item) => (
            <StoreItem item={item} key={`recommended-item-${item.id}`} />
          ))}
        </div>
        <div className="d-flex justify-content-center my-5">
          <Link to="/category/blouse">
            <button type="button" className="custom-btn">
              WSZYSTKIE PRODUKTY
            </button>
          </Link>
        </div>
        <div className="row mt-5 mx-auto">
          {upcomingItems.map((item) => (
            <UpcomingItem item={item} key={`upcoming-item-${item.id}`} />
          ))}
        </div>
        <div className="about-us row mx-auto mt-5 pt-3 pb-5">
          <div className="text-center about-us-title mb-4">O nas</div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-start">
            <img src={AboutUsImage} alt="" className="about-us-image mb-4" />
          </div>
          <div className="col-12 col-md-6">
            <div className="about-text mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac odio malesuada, cursus risus cursus,
              molestie arcu. Quisque sed ullamcorper leo. Etiam dignissim ac lectus sed ultrices. Ut eu ullamcorper
              quam, sed lacinia mi. Quisque ornare, metus a pellentesque lacinia, sapien ligula posuere turpis, ac
              convallis nibh nunc vel neque. Nullam rutrum accumsan imperdiet. Praesent eleifend urna eu massa porta,
              sed dictum odio vulputate. Proin in dapibus tortor. Integer luctus cursus ante, at euismod mauris semper
              nec. Vivamus augue quam, volutpat at magna ac, convallis tempor purus. Etiam mollis aliquet consectetur.
              Aliquam quis ultricies ante.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
