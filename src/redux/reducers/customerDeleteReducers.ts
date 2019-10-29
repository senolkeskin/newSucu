import { CustomerDelete, Action } from "../states";
import {CUSTOMER_DELETE_SUCCEED,CUSTOMER_DELETE_FAILED} from "../types";


const initalState = {
    isSuccess: false,
  };

export default (state: CustomerDelete = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_DELETE_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
      };
      case CUSTOMER_DELETE_FAILED:     
      return {
        ...state,
        isSuccess:false,
      };
    default:
      return state;
  }
};