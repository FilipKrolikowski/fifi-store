import "./PreviewItemModal.scss";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import EyeIcon from "../../../images/custom-icons/EyeIcon";
import { getItemPrice, getPriceFixed } from "../../utils/getItemPrice";
import { Slide } from "react-slideshow-image";
import AddedToCartModal from "./AddedToCartModal";
import { CustomDropdown } from "../../CustomDropdown";

function PreviewItemModal({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [selectedSize, setSelectedSize] = useState("xs/s");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(item.image);

  const resetSettings = () => {
    setSelectedSize("xs/s");
    setSelectedQuantity(1);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    resetSettings();
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

  const properties = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    cssClass: "custom-slider",
  };

  return (
    <>
      <Modal show={showModal} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="name">{item.name}</div>
        </Modal.Header>
        <Modal.Body>
          <div className="row mx-auto preview-item-modal">
            <div className="col-12 col-lg-6 d-flex flex-column d-none d-md-flex">
              <div className="main-image-container mb-4 mb-lg-0">
                <img src={mainImage} alt="" className="main-image" />
              </div>
              <div className="slider-container mt-auto">
                <Slide {...properties}>
                  {item.images.map((image, index) => (
                    <div key={`preview-item-slider-${index}`} className="image-container">
                      <img src={image} alt="" className="image pointer" onClick={() => setMainImage(image)} />
                    </div>
                  ))}
                </Slide>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-end mt-0 mt-md-4 mt-lg-0">
                {item.discount && <div className="old-price me-3 mb-1">{getPriceFixed(item.price)} zł</div>}
                <div className="price">{getItemPrice(item)} zł</div>
              </div>
              <div className="desc mt-3">{item.description}</div>
              <div className="size mt-5">
                Rozmiar:
                <div className="mt-3 mt-sm-0">
                  <CustomDropdown
                    currentValue={selectedSize}
                    items={item.sizes}
                    action={setSelectedSize}
                    displayValue={() => {
                      return (
                        <div className="row align-items-center mx-auto d-flex flex-nowrap me-3 h-100">
                          {selectedSize || item.sizes[0]}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="quantity mt-4">
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
                  <AddedToCartModal item={item} action={handleClose} size={selectedSize} quantity={selectedQuantity} />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <span
        title="Podgląd"
        onClick={handleOpen}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <EyeIcon className="item-icon mx-1" color={isHover ? "#fff" : "#949494"} />
      </span>
    </>
  );
}

export default PreviewItemModal;
