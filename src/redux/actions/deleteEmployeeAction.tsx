import axios from 'axios'
import {WATER_DELETE_EMPLOYEE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_DELETE_SUCCEED,EMPLOYEE_DELETE_FAILED} from './../types'
import {Action} from '../states'


export function employeeDelete(id:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_DELETE_EMPLOYEE,
    {
        id: id,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeeDeleteIsSucceed(true, "Çalışan Silindi!"));
      }
    }
  })
  .catch(error => { 
  });

  }

}

  export const employeeDeleteIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_DELETE_SUCCEED : EMPLOYEE_DELETE_FAILED,
    payload : message
  })
  
