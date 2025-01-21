import { formatNum } from "./formatNum";

export const getTotalPrice = (items = []) => {
  let sum = 0;
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      sum += items[i].price;
    }
  }
  return sum;
};
