import {FETCH_RESTURANTS, FETCH_FOODS} from '../types'
import { makeDefaultResturants } from "../../constants";

const initialState = {
    resturants: []
}


export default (state = initialState, action) => {
if(state.resturants.length> 0){
return state
}
    let returnValue = initialState;;
    switch(action.type) {
        case FETCH_RESTURANTS:
        console.log('here')
            returnValue = {
                resturants: makeDefaultResturants()
            }
            break;

        default:
            console.warn("Unknown action " + action.type);
            break;
    }
    return returnValue;
}
