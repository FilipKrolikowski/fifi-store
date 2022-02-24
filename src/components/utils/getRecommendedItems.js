import { allStoreItems, recommendedItems } from "../../storeItems";

export const getRecommendedItems = () => {
  return allStoreItems.filter((i) => recommendedItems.includes(i.id));
};
