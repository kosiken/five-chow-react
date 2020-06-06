import {FETCH_RESTURANTS, FETCH_FOODS} from '../types'
import { makeDefaultResturants } from "../../constants";

const initialState = {
    resturants: []
}


export default (state = initialState, action) => {
    let returnValue;
    switch(action.type) {
        case FETCH_RESTURANTS:
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