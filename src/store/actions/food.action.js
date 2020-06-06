import {FETCH_RESTURANTS, FETCH_FOODS} from '../types';

export const fetchResturants= (resturants) => dispatch => {
    dispatch({
      type: FETCH_RESTURANTS,
      resturants
    });
  };


  export const fetchFoods= (foods, resturantId) => dispatch => {
    dispatch({
      type: FETCH_RESTURANTS,
      foods, resturantId
    });
  };
