import axios from 'axios'
import {WATER_CUSTOMER_ADD} from './../constants'
import { Dispatch } from "react";
import {CUSTOMER_ADD_SUCCEED,CUSTOMER_ADD_FAILED} from './../types'
import {Action} from '../states'


export function customerAdd(nameSurname:string, companyName:string, dayOfWeek1:number) {

  return (dispatch : Dispatch<Action>) =>  {
console.log(dayOfWeek1, 111);
  axios.post(WATER_CUSTOMER_ADD,
    {
        nameSurname: nameSurname,
        companyName: companyName,
        dayOfWeek : dayOfWeek1
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerAddIsSucceed(true, "Müşteri Eklendi!"));
      }
    }
  })
  .catch(error => { 
      
    console.log(error + 'error kaydetme asn storage')   
    dispatch(customerAddIsSucceed(false,"Bir hata oluştu."));
  });

  }

}

  
  export const customerAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMER_ADD_SUCCEED : CUSTOMER_ADD_FAILED,
    payload : message
  })
  
