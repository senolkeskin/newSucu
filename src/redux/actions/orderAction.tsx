import { AsyncStorage } from "react-native";
import axios from 'axios'
import {WATER_CUSTOMER_ORDERS_GET} from './../constants'
import { Dispatch } from "react";
import {ORDERS_GET,ORDER_LOADING,ORDER_GET_CUSTOMERID } from './../types'
import {Action} from '../states'
import { IOrderItem } from "../models/orderModel";
import { NavigationScreenProp, NavigationState } from "react-navigation";


export function GetOrders(customerId:number) {
    console.log(customerId.toString()+"fsfsafafsafafasfs");

    return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true));

    const token:string = "asdada";

    var WATER_CUSTOMER_ORDERS_GET_CUSTOMER =WATER_CUSTOMER_ORDERS_GET+customerId;

    axios.get(WATER_CUSTOMER_ORDERS_GET_CUSTOMER,
    {headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Barrier '+token
      }})
  .then((response) =>{
    
  if(response.data.isSuccess){
      var orderModel :IOrderItem[] = [];
      response.data.result.orderItems.forEach((order:any) => {
            var orderItem : IOrderItem={
                    orderId : order.orderId,
                    unitPrice :order.unitPrice,
                    totalPrice :order.totalPrice,
                    count:order.count,
                    productName: order.productName,
                    productCode: order.productCode,
            }
            orderModel.push(orderItem);         
      });
   
      dispatch(orders(orderModel));
    }
   
  
  else {

  }
  })
  .catch((err) => {
    console.log(err + "error axios") 
    // dispatch(loading(false));

  });


  }

}

export const loading = (loader : boolean) => ({
    type : ORDER_LOADING,
    payload : loader
  })

  export const orders = (orders :IOrderItem[] ) => ({
    type : ORDERS_GET,
    payload : orders
  })