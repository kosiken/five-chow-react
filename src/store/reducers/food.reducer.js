import { FETCH_RESTURANTS, FETCH_FOODS, SELECT_RESTURANT } from "../types";


const initialState = {
  resturants: [],
  lastUpdated: null,
  lastUpdatedResturants: null,
  foods: [],
  selectedResturant: null,
};

export default (state = initialState, action) => {
  let returnValue;
  switch (action.type) {
    case FETCH_RESTURANTS:
      if (!action.resturants) {
        returnValue = state;
        break;
      }
      returnValue = {
      ...state,
      resturants: action.resturants,
      lastUpdatedResturants: Date.now()
      
      }
      
      

      break;
    case FETCH_FOODS:
  	if(action.foods){
  	
  	returnValue = {
  	...state,
  	lastUpdated: Date.now(),
  	foods: action.foods
  	
  	}
  	
  	break;
  	}

      returnValue = action.payload;
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
