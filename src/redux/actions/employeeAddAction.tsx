import axios from 'axios'
import {WATER_ADD_EMPLOYEE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_ADD_SUCCEED,EMPLOYEE_ADD_FAILED} from './../types'
import {Action} from '../states'


export function employeeAdd(nameSurname:string, monthlySalary:number,email:string,password:string) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_EMPLOYEE,
    {
        nameSurname: nameSurname,
        monthlySalary: monthlySalary,
        email: email,
        password: password,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeAddIsSucceed(true, "Çalışan Eklendi!"));
      }
    }
  })
  .catch(error => { 
    dispatch(employeAddIsSucceed(false,"Çalışan Eklenirken bir hata oluştu."));
  });

  }

}

  
  export const employeAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_ADD_SUCCEED : EMPLOYEE_ADD_FAILED,
    payload : message
  })
  
