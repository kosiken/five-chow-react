import {FETCH_RESTURANTS, FETCH_FOODS} from '../types'
import { makeDefaultResturants } from "../../constants";

const initialState = {
    resturants: [], lastUpdated:null,
foods:[]
}


export default (state = initialState, action) => {

    let returnValue;
    switch(action.type) {
        case FETCH_RESTURANTS:
    		if(state.resturants.length > 0){
    		returnValue=state
            break;
    		
    		}
    		let r = makeDefaultResturants()
    		let f = []
    		
    		r.forEach(i => { f= f.concat(i.foods)})
            returnValue = {...state,
                resturants: r,
                foods: f
            }
               
            break;
        case FETCH_FOODS:
        console.log(state.resturants.find(res=> res.id == action.resturantId))
           let foods = [];
           
           returnValue ={...state, foods};
           break;

        default:
            returnValue=state
            break;
    }
    return returnValue;
}
