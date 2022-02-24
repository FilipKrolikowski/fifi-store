import "./Category.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { categories, allStoreItems } from "../../../storeItems";
import { getPriceFixed, getItemPrice } from "../../utils/getItemPrice";
import ItemStars from "../../ItemStars";
import StoreItem from "../../StoreItem";
import { getRecommendedItems } from "../../utils/getRecommendedItems";
import { Link } from "react-router-dom";
import { Pagination } from "../../Interface/Pagination";
import { CustomDropdown } from "../../CustomDropdown";

const filterOptions = [
  {
    name: "NAJCZĘŚCIEJ KUPOWANE",
    value: "most-bought",
  },
  {
    name: "Nazwa, A do Z",
    value: "AtoZ",
  },
  {
    name: "Nazwa, Z do A",
    value: "ZtoA",
  },
  {
    name: "Cena rosnąco",
    value: "priceUp",
  },
  {
    name: "Cena malejąco",
    value: "priceDown",
  },
];

function Category() {
  const { categoryId } = useParams();
  const limit = 9;
  const [currentCategory, setCurrentCategory] = useState(categories.find((cat) => cat.id === categoryId));
  const [categoryItems, setCategoryItems] = useState(allStoreItems.filter((i) => i.category === currentCategory.id));
  const [filterType, setFilterType] = useState(filterOptions[0]);
  const [itemsPageCount, setItemsPageCount] = useState(
    Math.ceil(allStoreItems.filter((i) => i.category === currentCategory.id).length / limit)
  );
  const [itemsCurrentPage, setItemsCurrentPage] = useState(0);

  const filterItems = () => {
    if (["AtoZ", "ZtoA"].includes(filterType.value)) {
      return categoryItems.sort(function (a, b) {
        if (a.name < b.name) {
          return filterType.value === "AtoZ" ? -1 : 1;
        }
        if (a.name > b.name) {
          return filterType.value === "AtoZ" ? 1 : -1;
        }
        return 0;
      });
    } else if (["priceDown", "priceUp"].includes(filterType.value)) {
      if (filterType.value === "priceUp") {
        return categoryItems.sort((a, b) => (parseInt(a.price, 10) > parseInt(b.price, 10) ? 1 : -1));
      } else {
        return categoryItems.sort((a, b) => (parseInt(a.price, 10) > parseInt(b.price, 10) ? -1 : 1));
      }
    } else {
      return categoryItems;
    }
  };

  const getPaginatedItems = (items) => {
    if (items.length < limit) {
      return items;
    } else {
      return items.slice(itemsCurrentPage * limit, itemsCurrentPage * limit + limit);
    }
  };

  useEffect(() => {
    const newCurrentCategory = categories.find((cat) => cat.id === categoryId);
    setCurrentCategory(newCurrentCategory);
    setCategoryItems(allStoreItems.filter((i) => i.category === categoryId));
    setFilterType(filterOptions[0]);
    setItemsPageCount(Math.ceil(allStoreItems.filter((i) => i.category === categoryId).length / limit));
    setItemsCurrentPage(0);
    window.scrollTo(0, 0);
  }, [categoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="category pb-5">
      <div className="title-container d-flex align-items-center pb-5 mx-4">
        <div className="title text-nowrap">{currentCategory.name}</div>
        <div className="border-line mx-4"></div>
        <div className="items-number text-nowrap">Jest {categoryItems.length} produktów.</div>
      </div>
      <div className="row mx-4">
        <div className="col-3 ps-0 d-none d-xl-block">
          <div className="left-side-text mb-5 text-nowrap">{currentCategory.name}</div>
          <div className="left-side-text mb-4">NAJCZĘŚCIEJ KUPOWANE</div>
          <div className="d-flex flex-column most-often-bought">
            {getRecommendedItems().map((i, index) => (
              <div key={`most-often-bought-${i.id}`}>
                <Link
                  to={{ pathname: `/product/${i.id}` }}
                  className={`link most-often-bought-container d-flex pointer ${
                    index + 1 === getRecommendedItems().length ? "border-0" : ""
                  }`}
                >
                  {i.discount && <div className="discount">- {i.discount}%</div>}
                  <div className="most-often-bought-img-container">
                    <img src={i.image} alt="" className="most-often-bought-img" />
                  </div>
                  <div className="ms-3 d-flex flex-column justify-content-around">
                    <div className="most-often-bought-name">{i.name}</div>
                    <div>
                      <ItemStars stars={i.stars} />
                    </div>
                    <div className="most-often-bought-price-container d-flex align-items-center">
                      {i.discount && <div className="old-price me-2">{getPriceFixed(i.price)} zł</div>}
                      <div className="item-price d-flex">{getItemPrice(i)} zł</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-xl-9">
          <div className="row mx-auto mb-4">
            <div className="row mx-auto settings-bar align-items-center justify-content-between">
              <div className="d-flex align-items-center col-12 col-md-auto">
                <h1 className="mb-0 ms-3 text-nowrap d-none d-sm-block me-3">SORTUJ WG</h1>
                <div className="mt-3 mt-sm-0">
                  <CustomDropdown
                    currentValue={filterType}
                    items={filterOptions}
                    action={setFilterType}
                    displayValue={() => {
                      return (
                        <div className="row align-items-center mx-auto d-flex flex-nowrap me-3 h-100">
                          {filterType.name}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="d-flex col-12 col-md-auto my-2 my-sm-0">
                <h1 className="mb-0 ms-3 text-nowrap me-2 d-none d-sm-block">STRONY</h1>
                <Pagination current={itemsCurrentPage} count={itemsPageCount} setPage={setItemsCurrentPage} />
              </div>
            </div>
          </div>
          <div className="row mx-auto">
            {getPaginatedItems(filterItems()).map((i) => (
              <StoreItem item={i} key={`store-item-${i.id}`} maxInLine="3" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
