import axios from 'axios'
import {WATER_EDIT_EMPLOYEE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_EDIT_SUCCEED,EMPLOYEE_EDIT_FAILED} from './../types'
import {Action} from '../states'


export function employeeEdit(employeeId:number,active:boolean,nameSurname:string, monthlySalary:number, email:string,password:string) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_EDIT_EMPLOYEE,
    {
        id: employeeId,
        active:active,
        nameSurname: nameSurname,
        monthlySalary: monthlySalary,
        email:email,
        password:password,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeEditIsSucceed(true, "Çalışan Düzenlendi!"));
      }
    }
  })
  .catch(error => { 
  });

  }

}

  
  export const employeEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_EDIT_SUCCEED : EMPLOYEE_EDIT_FAILED,
    payload : message
  })
  
