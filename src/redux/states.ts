import { ICustomerItem } from "./models/homeModel";
import { IOrderItem } from "./models/orderModel";
import { IProductItem} from "./models/productModel";
import {ICustomerPriceProductItem} from "./models/customerPriceProductModel"
import {IDefinedCustomerPriceItem} from "./models/customerDefinedPriceModel"

export interface State {
    data: any[];
    loading: boolean;
  }

  export interface Action {
    type: string;
    payload: any;
  }

  export interface HomeState{
      customers:ICustomerItem[];
      isHomeLoading :boolean;
  }

  export interface UserState {
    isLoading: boolean;
    isFinished: boolean;
    isSucceed: boolean;
    loginErrorMessage : string;
  
  }

  export interface Orders
  {
    orders: IOrderItem[];
    isOrderLoading: boolean;
    takeTotalAmount:number;
    tookTotalAmount:number;
    restTotalAmount:number;
  }

  export interface CustomerAdd
  {
    isSuccess: boolean,
    CustomerAddMessage: string,
  }

  export interface CustomerDelete
  {
    isSuccess: boolean;
  }

  export interface CustomerEdit
  {
    isSuccess: boolean,
    CustomerEditMessage: string,
  }

  export interface ProductAdd
  {
    isSuccess: boolean,
    ProductAddMessage: string, 
  }

  export interface AddCash
  {
    isSuccess: boolean,
    AddCashMessage: string,
  }

  export interface ProductState{
    products:IProductItem[];
    isProductLoading :boolean;
}

export interface AddOrder
  {
    isSuccess: boolean,
    AddOrderMessage: string,
  }

  export interface ProductEdit
  {
    isSuccess: boolean,
    ProductEditMessage: string,
  }

  export interface CustomerPriceProductState{
    products:ICustomerPriceProductItem[];
    isProductLoading :boolean;
}

export interface AddCustomerPrice
  {
    isSuccess: boolean,
    AddCustomerPriceMessage: string,
  }

  export interface CustomerDefinedPriceState{
    products:IDefinedCustomerPriceItem[];
    isProductLoading :boolean;
}

export interface CustomerPriceEdit
{
  isSuccess: boolean,
  CustomerPriceEditMessage: string,
}