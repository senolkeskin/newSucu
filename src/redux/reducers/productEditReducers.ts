import { ProductEdit, Action } from "../states";
import {EDIT_PRODUCT_SUCCEED,EDIT_PRODUCT_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    ProductEditMessage: "",
  };

export default (state: ProductEdit = initalState, action: Action) => {
  switch (action.type) {
    case EDIT_PRODUCT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        ProductEditMessage:"Ürün Düzenlendi.",
      };
      case EDIT_PRODUCT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        ProductEditMessage:"Ürün Düzenlenemedi!",
      };
    default:
      return state;
  }
};