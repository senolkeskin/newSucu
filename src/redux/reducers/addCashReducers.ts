import { AddCash, Action } from "../states";
import {ADD_CASH_SUCCEED,ADD_CASH_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    AddCashMessage: "",
  };

export default (state: AddCash = initalState, action: Action) => {
  switch (action.type) {
    case ADD_CASH_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        AddCashMessage:action.payload,
      };
      case ADD_CASH_FAILED:     
      return {
        ...state,
        isSuccess:false,
        AddCashMessage:action.payload,
      };
    default:
      return state;
  }
};