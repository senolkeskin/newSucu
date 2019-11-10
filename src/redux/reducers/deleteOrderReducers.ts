import { OrderDelete, Action } from "../states";
import {ORDER_DELETE_SUCCEED,ORDER_DELETE_FAILED} from "../types";


const initalState = {
    isSuccess: false,
  };

export default (state: OrderDelete = initalState, action: Action) => {
  switch (action.type) {
    case ORDER_DELETE_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
      };
      case ORDER_DELETE_FAILED:     
      return {
        ...state,
        isSuccess:false,
      };
    default:
      return state;
  }
};