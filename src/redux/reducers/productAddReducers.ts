import { ProductAdd, Action } from "../states";
import {PRODUCT_ADD_SUCCEED,PRODUCT_ADD_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    ProductAddMessage: "",
  };

export default (state: ProductAdd = initalState, action: Action) => {
  switch (action.type) {
    case PRODUCT_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        ProductAddMessage:"Ürün Oluşturuldu.",
      };
      case PRODUCT_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        ProductAddMessage:"Ürün Oluşturulamadı!",
      };
    default:
      return state;
  }
};