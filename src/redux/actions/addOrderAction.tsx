import axios from 'axios'
import {WATER_ADD_ORDER} from './../constants'
import { Dispatch } from "react";
import {ADD_ORDER_SUCCEED,ADD_ORDER_FAILED} from './../types'
import {Action} from '../states'


export function AddOrder(productId:number, customerId:number,unitPrice:number, count:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_ORDER,
    {
        productId: productId,
        customerId: customerId,
        unitPrice: unitPrice,
        count: count,
    })
  .then((response) =>{
  if(response.data.isSuccess){
    console.log("------------------------------------------");
      if(response.data.result){
        dispatch(addOrder(true, "Sipariş Alındı!"));
      }
    }
  })
  .catch(error => { 
    console.log(error + 'error kaydetme asn storage')   
    dispatch(addOrder(false,"Sipariş eklenirken bir hata oluştu."));
  });

  }

}

  
  export const addOrder = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ADD_ORDER_SUCCEED : ADD_ORDER_FAILED,
    payload : message
  })
  