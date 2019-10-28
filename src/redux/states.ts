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
    customerId: number;
    orders: IOrderItem[];
    isOrderLoading: boolean;
  }

  export interface CustomerAdd
  {
    isSuccess: boolean,
    CustomerAddMessage: string,
  }