import axios from 'axios'
import {WATER_CUSTOMER_ORDER_DELETE} from './../constants'
import { Dispatch } from "react";
import {ORDER_DELETE_SUCCEED,ORDER_DELETE_FAILED} from './../types'
import {Action} from '../states'


export function orderDelete(id:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_CUSTOMER_ORDER_DELETE,
    {
        id: id,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(orderDeleteIsSucceed(true, "Sipariş Silindi!"));
      }
    }
  })
  .catch(error => { 
      
    console.log(error + 'error kaydetme asn storage')   
    dispatch(orderDeleteIsSucceed(false,"Bir hata oluştu."));
  });

  }

}

  export const orderDeleteIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ORDER_DELETE_SUCCEED : ORDER_DELETE_FAILED,
    payload : message
  })
  
