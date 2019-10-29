import axios from 'axios'
import {WATER_CUSTOMER_DELETE} from './../constants'
import { Dispatch } from "react";
import {CUSTOMER_DELETE_SUCCEED,CUSTOMER_DELETE_FAILED} from './../types'
import {Action} from '../states'


export function customerDelete(id:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_CUSTOMER_DELETE,
    {
        id: id,
    })
  .then((response) =>{
      console.log(response.data.isSuccess+"gasggasgasgasgsgasg")
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerDeleteIsSucceed(true, "Müşteri Silindi!"));
      }
    }
  })
  .catch((response) => {
    console.log(response.data.isSuccess+ "safsafsfsafsafsafsafasf")
    if(response.data.isSuccess){
      if(response.data.result){
        dispatch(customerDeleteIsSucceed(true, "Müşteri Silindi!"));
      }
    }
  });

  }

}

  
  export const customerDeleteIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMER_DELETE_SUCCEED : CUSTOMER_DELETE_FAILED,
    payload : message
  })
  
