import axios from 'axios'
import {WATER_PRODUCT_ADD} from './../constants'
import { Dispatch } from "react";
import {PRODUCT_ADD_SUCCEED,PRODUCT_ADD_FAILED} from './../types'
import {Action} from '../states'


export function productAdd(productName:string, productCode:string, price:string) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_PRODUCT_ADD,
    {
        productName: productName,
        productCode: productCode,
        price: price,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(productAddIsSucceed(true, "Ürün Oluşturuldu!"));
      }
    }
  })
  .catch(error => { 
    dispatch(productAddIsSucceed(false,"Bir hata oluştu."));
  });

  }

}

  
  export const productAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? PRODUCT_ADD_SUCCEED : PRODUCT_ADD_FAILED,
    payload : message
  })