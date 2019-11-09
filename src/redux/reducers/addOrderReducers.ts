import { AddOrder, Action } from "../states";
import {ADD_ORDER_SUCCEED,ADD_ORDER_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    AddOrderMessage: "",
  };

export default (state: AddOrder = initalState, action: Action) => {
  switch (action.type) {
    case ADD_ORDER_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        AddOrderMessage:action.payload,
      };
      case ADD_ORDER_FAILED:     
      return {
        ...state,
        isSuccess:false,
        AddOrderMessage:action.payload,
      };
    default:
      return state;
  }
};