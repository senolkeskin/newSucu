import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { Orders, Action } from "../states";
import { ORDERS_GET, ORDER_LOADING } from "../types";


const initalState = {
    customerId: 0,
    orders: [],
    isOrderLoading: false,
  };

export default (state: Orders = initalState, action: Action) => {
  switch (action.type) {
    case ORDERS_GET:
        
      return {
        ...state,
        customerId: action.payload,
        orders: action.payload,
        isOrderLoading:false
      };
    case ORDER_LOADING:
      return {
        ...state,
        customerId: action.payload,
        isOrderLoading: action.payload
      };
    default:
      return state;
  }
};