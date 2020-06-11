import { FETCH_RESTURANTS, FETCH_FOODS, SELECT_RESTURANT } from "../types";

export const fetchResturants = (resturants) => (dispatch) => {
  dispatch({
    type: FETCH_RESTURANTS,
    resturants,
  });
};

export const fetchFoods = (resturantId) => (dispatch) => {
  dispatch({
    type: FETCH_FOODS,
    resturantId,
  });
};

export const selectResturant = (id) => (dispatch) => {
  dispatch({
    type: SELECT_RESTURANT,
    resturantId: id,
  });
};
