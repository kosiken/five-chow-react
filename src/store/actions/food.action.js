import { FETCH_RESTURANTS, FETCH_FOODS, SELECT_RESTURANT } from "../types";
import { makeDefaultResturants } from "../../constants";

let r = makeDefaultResturants();
let f = [];

r.forEach((i) => {
  f = f.concat(i.foods);
});
export const fetchResturants = (resturants) => (dispatch) => {
  dispatch({
    type: FETCH_RESTURANTS,
    resturants,
  });
};

export const fetchFoods = (debug, payload) => (dispatch) => {
  
  if(debug){
  dispatch({
    type: FETCH_FOODS,
    payload:  
    {
        resturants: r,
        foods: f.slice(0, 12),
        lastUpdated: Date.now(),
        selectedResturant: r[0],
      }
    
    
 
  });
  }
  
  else {
  dispatch({
   type: FETCH_FOODS,
   foods: payload
  
  
  })
  
  }
};

export const selectResturant = (id) => (dispatch) => {
  dispatch({
    type: SELECT_RESTURANT,
    resturantId: id,
  });
};
