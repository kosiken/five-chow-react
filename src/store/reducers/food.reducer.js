import { FETCH_RESTURANTS, FETCH_FOODS, SELECT_RESTURANT } from "../types";
import { makeDefaultResturants } from "../../constants";

let r = makeDefaultResturants();
let f = [];

r.forEach((i) => {
  f = f.concat(i.foods);
});

const initialState = {
  resturants: [],
  lastUpdated: null,
  foods: [],
  selectedResturant: null,
};

export default (state = initialState, action) => {
  let returnValue;
  switch (action.type) {
    case FETCH_RESTURANTS:
      if (state.resturants.length > 0) {
        returnValue = state;
        break;
      }
      returnValue = {
        resturants: r,
        foods: f.slice(0, 12),
        lastUpdated: Date.now(),
        selectedResturant: r[0],
      };
      
      

      break;
    case FETCH_FOODS:
  

      returnValue = {
        resturants: r,
        foods: f.slice(0, 12),
        lastUpdated: Date.now(),
        selectedResturant: r[0],
      };
      break;
    case SELECT_RESTURANT:
      returnValue = {
        ...state,
        selectedResturant: state.resturants.find(
          (resturant) => resturant.id === action.resturantId
        ),
      };
      break;

    default:
      returnValue = state;
      break;
  }
  return returnValue;
};
