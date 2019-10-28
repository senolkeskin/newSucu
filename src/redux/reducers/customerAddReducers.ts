import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { CustomerAdd, Action } from "../states";
import {CUSTOMER_ADD_SUCCEED,CUSTOMER_ADD_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    CustomerAddMessage: "",
  };

export default (state: CustomerAdd = initalState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        CustomerAddMessage:"Müşteri Eklendi.",
      };
      case CUSTOMER_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        CustomerAddMessage:"Müşteri Eklenemedi!",
      };
    default:
      return state;
  }
};