import axios from 'axios'
import {WATER_EDIT_PRODUCT} from './../constants'
import { Dispatch } from "react";
import {EDIT_PRODUCT_SUCCEED,EDIT_PRODUCT_FAILED} from './../types'
import {Action} from '../states'


export function productEdit(id:number, status:boolean, productName:string,productCode:string,price:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_EDIT_PRODUCT,
    {
        id: id,
        status: status,
        productName : productName,
        productCode :productCode,
        price :price,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(productEditIsSucceed(true, "Ürün Düzenlendi!"));
      }
    }
  })
  .catch(error => {      
    dispatch(productEditIsSucceed(false,"Bir hata oluştu."));
  });
  }
}

  
  export const productEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EDIT_PRODUCT_SUCCEED : EDIT_PRODUCT_FAILED,
    payload : message
  })
  