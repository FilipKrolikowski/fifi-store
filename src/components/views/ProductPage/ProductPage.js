import "./ProductPage.scss";
import { useParams } from "react-router-dom";
import { allStoreItems } from "../../../storeItems";
import { Slide } from "react-slideshow-image";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { getPriceFixed, getItemPrice } from "../../utils/getItemPrice";
import AddedToCartModal from "../modals/AddedToCartModal";
import StoreItem from "../../StoreItem";
import { CustomDropdown } from "../../CustomDropdown";

const productTabs = [
  {
    value: "desc",
    name: "Opis",
  },
  {
    value: "linkedItems",
    name: "Produkty powiązane",
  },
  {
    value: "comments",
    name: "Komentarze",
  },
];

function ProductPage() {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(allStoreItems.find((item) => item.id === id));
  const [mainImage, setMainImage] = useState(currentItem.image);
  const [selectedSize, setSelectedSize] = useState("xs/s");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  const [productSliderCount, setProductSliderCount] = useState(3);
  const linkedItems = currentItem.linkedItems.map((linkedItem) => allStoreItems.find((item) => item.id === linkedItem));
  const itemsFromThisCategory = allStoreItems
    .filter((i) => i.category === currentItem.category)
    .filter((i) => i.id !== currentItem.id);

  const properties = {
    slidesToShow: productSliderCount,
    slidesToScroll: 1,
    autoplay: false,
    cssClass: "custom-slider",
  };

  const handleSelectedQuantity = (val) => {
    if (val < 0) {
      if (selectedQuantity > 1) {
        setSelectedQuantity((prev) => prev + val);
      }
    } else {
      setSelectedQuantity((prev) => prev + val);
    }
  };

  const resetSettings = () => {
    setSelectedSize("xs/s");
    setSelectedQuantity(1);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const newItem = allStoreItems.find((item) => item.id === id);
    setCurrentItem(newItem);
    setMainImage(newItem.image);
    window.scrollTo(0, 0);
  }, [id]);

  const handleResize = () => {
    setProductSliderCount(window.innerWidth > 575 ? 3 : 2);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="product-page pt-4 pb-5">
      <div className="row mx-3">
        <div className="col-12 col-lg-6">
          <div className="main-image-container mb-4 mb-lg-0">
            <img src={mainImage} alt="" className="main-image pointer" onClick={() => setShowModal(true)} />
          </div>
          <div className="slider-container mt-4">
            <Slide {...properties}>
              {currentItem.images.map((image, index) => (
                <div key={`product-page-image-${index}`} className="product-page-image-container">
                  <img src={image} alt="" className="product-page-image pointer" onClick={() => setMainImage(image)} />
                </div>
              ))}
            </Slide>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="info-container">
            {currentItem.discount && <div className="discount">- {currentItem.discount}%</div>}
            <div className="name mt-4 pb-4">{currentItem.name}</div>
            <div className="item-price-container mt-4 d-flex align-items-center">
              {currentItem.discount && <div className="old-price me-4">{getPriceFixed(currentItem.price)} zł</div>}
              <div className="item-price d-flex">{getItemPrice(currentItem)} zł</div>
            </div>
            <div className="size mt-5">
              Rozmiar:
              <div className="mt-2">
                <div className="mt-3 mt-sm-0">
                  <CustomDropdown
                    currentValue={selectedSize}
                    items={currentItem.sizes}
                    action={setSelectedSize}
                    displayValue={() => {
                      return (
                        <div className="row align-items-center mx-auto d-flex flex-nowrap me-3 h-100">
                          {selectedSize || currentItem.sizes[0]}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="quantity mt-4 pb-5">
              Ilość:
              <div className="d-flex">
                <span className="mt-2 quantity-change d-flex">
                  <span className="pointer" onClick={() => handleSelectedQuantity(-1)}>
                    -
                  </span>
                  <span className="mx-4">{selectedQuantity}</span>
                  <span className="pointer" onClick={() => handleSelectedQuantity(1)}>
                    +
                  </span>
                </span>
                <AddedToCartModal
                  action={resetSettings}
                  item={currentItem}
                  size={selectedSize}
                  quantity={selectedQuantity}
                />
              </div>
            </div>
            <div className="desc pt-5">{currentItem.description}</div>
          </div>
        </div>
      </div>
      <div className="row mx-3 mt-5 tabs-container">
        {productTabs.map((tab) => (
          <div key={tab.value} className="col-12 col-md py-1 px-1 d-flex justify-content-center">
            <div
              onClick={() => setActiveTab(tab.value)}
              className={`tab w-100 text-center pointer ${tab.value === activeTab ? "active" : ""}`}
            >
              {tab.name}
            </div>
          </div>
        ))}
      </div>
      <div className="row mx-3 mt-4">
        <div className="col mt-3">
          {activeTab === "desc" && <div className="long-desc">{currentItem.longDescription}</div>}
          {activeTab === "linkedItems" && (
            <div className="row mx-auto">
              {linkedItems.map((i) => (
                <StoreItem item={i} key={`linked-item=${i.id}`} />
              ))}
            </div>
          )}
          {activeTab === "comments" && (
            <div className="d-flex justify-content-center">
              <button type="button" className="custom-btn">
                BĄDŹ PIERWSZYM KTÓRY NAPISZE RECENZJĘ
              </button>
            </div>
          )}
        </div>
      </div>
      {itemsFromThisCategory.length && (
        <div className="row mx-3 mt-5 pt-5">
          <div className="col-12">
            <div className="other-items-title text-center">
              {itemsFromThisCategory.length} INNYCH PRODUKTÓW W TEJ SAMEJ KATEGORII:
            </div>
            <div className="row mx-3 mt-4">
              {itemsFromThisCategory.map((i) => (
                <StoreItem item={i} key={`other-item=${i.id}`} />
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal show={showModal} size="lg" centered onHide={handleClose}>
        <Modal.Body className="">
          <div className="modal-image-container">
            <img src={mainImage} alt="" className="modal-image h-100" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductPage;
