import axios from 'axios'
import {WATER_CUSTOMER_ADD} from './../constants'
import { Dispatch } from "react";
import {CUSTOMER_ADD_SUCCEED,CUSTOMER_ADD_FAILED} from './../types'
import {Action} from '../states'


export function customerAdd(nameSurname:string, companyName:string) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_CUSTOMER_ADD,
    {
        nameSurname: nameSurname,
        companyName: companyName,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerAddIsSucceed(true, "Müşteri Eklendi!"));
      }
    }
  })
  .catch((response) => {
    if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerAddIsSucceed(true, "Müşteri Eklendi!"));
      }
    }
  });

  }

}

  
  export const customerAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMER_ADD_SUCCEED : CUSTOMER_ADD_FAILED,
    payload : message
  })
  
