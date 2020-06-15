import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER } from "../types";
import { User } from "../../constants";

const initialState = {
  user: {},
  isAuthorized: false,
  debug: false,
  token: null,
  location:'Place Street'
};

export default function(state = initialState, action) {
  let returnValue;
  let { user } = action;
  if (!user) {
    console.warn("action.user is empty");
    return state;
  }
   let nUser = User.defaultUser();
  switch (action.type) {
    case SIGNUP_USER:
     
      nUser.email = user.email;

      returnValue = {
        ...state,
        user: nUser,
        isAuthorized: true,
      };

      break;

    case LOGIN_USER:
  if(!state.debug){
  console.log(user)
  
  returnValue = {
  ...state,
  user,
  isAuthorized: true,
  token: user.token
  
  }
  
  break;
  }
      nUser.email = user.email;

      returnValue = {
        ...state,
        user: nUser,
        isAuthorized: true,
      };
      
     

      break;
    case LOGOUT_USER:
      returnValue = initialState;
      break;
    default:
      console.warn("Unknown action " + action.type);
      break;
  }
 
  return returnValue;
};
