import axios from 'axios'
import {WATER_CUSTOMER_PRICE_ADD} from './../constants'
import { Dispatch } from "react";
import {CUSTOMERPRICE_ADD_SUCCEED,CUSTOMERPRICE_ADD_FAILED} from './../types'
import {Action} from '../states'


export function customerPriceAdd(productId:number, customerId:number, price:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_CUSTOMER_PRICE_ADD,
    {
        productId: productId,
        customerId: customerId,
        price:price,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerPriceAddIsSucceed(true, "Yeni Bir Fiyat Girildi!"));
      }
    }
  })
  .catch(error => {  
    dispatch(customerPriceAddIsSucceed(false,"Bir hata oluştu."));
  });

  }

}

  
  export const customerPriceAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMERPRICE_ADD_SUCCEED : CUSTOMERPRICE_ADD_FAILED,
    payload : message
  })
  
