import axios from 'axios'
import {WATER_ADD_CASH} from './../constants'
import { Dispatch } from "react";
import {ADD_CASH_SUCCEED,ADD_CASH_FAILED} from './../types'
import {Action} from '../states'


export function AddCash(orderId:number, amount:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_CASH,
    {
        orderId: orderId,
        amount: amount,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(addCash(true, "Ödeme Alındı!"));
      }
    }
  })
  .catch(error => { 
    dispatch(addCash(false,"Ödeme Alınırken bir hata oluştu."));
  });

  }

}

  
  export const addCash = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ADD_CASH_SUCCEED : ADD_CASH_FAILED,
    payload : message
  })
  