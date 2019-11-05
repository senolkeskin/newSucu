import { ICustomerItem } from "./models/homeModel";
import { IOrderItem } from "./models/orderModel";

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
