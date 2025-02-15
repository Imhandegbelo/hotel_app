import {rooms} from "../data/roomData";

export const getSuiteByPrice = (price) => {
  let newRoom = rooms.filter((r) => r.price === price);

  return newRoom[0]?.name;
};
