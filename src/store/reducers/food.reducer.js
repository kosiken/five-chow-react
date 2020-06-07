import {FETCH_RESTURANTS, FETCH_FOODS} from '../types'
import { makeDefaultResturants } from "../../constants";

const initialState = {
    resturants: [], lastUpdated:null,
foods:[]
}


export default (state = initialState, action) => {
if(state.resturants.length> 0){
return state
}
console.log(action)
    let returnValue = initialState;;
    switch(action.type) {
        case FETCH_RESTURANTS:
    
            returnValue = {...state,
                resturants: makeDefaultResturants()
            }
               
            break;
        case FETCH_FOODS:
           let foods = state.find(res=> res.id==action.resturantId).foods;
           
           returnValue ={...state, foods};
           break;

        default:
            console.warn("Unknown action " + action.type);
            break;
    }
    return returnValue;
}
