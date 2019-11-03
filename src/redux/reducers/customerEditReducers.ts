import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { CustomerEdit, Action } from "../states";
import {CUSTOMER_EDIT_SUCCEED,CUSTOMER_EDIT_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    CustomerEditMessage: "",
  };

export default (state: CustomerEdit = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        CustomerEditMessage:"Müşteri Düzenlendi.",
      };
      case CUSTOMER_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        CustomerEditMessage:"Müşteri Düzenlenemedi!",
      };
    default:
      return state;
  }
};