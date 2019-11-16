import axios from 'axios'
import {WATER_ADD_EMPLOYEE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_ADD_SUCCEED,EMPLOYEE_ADD_FAILED} from './../types'
import {Action} from '../states'


export function employeeAdd(nameSurname:string, monthlySalary:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_EMPLOYEE,
    {
        nameSurname: nameSurname,
        monthlySalary: monthlySalary,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeAddIsSucceed(true, "Çalışan Eklendi!"));
      }
    }
  })
  .catch(error => { 
      
    console.log(error + 'error kaydetme asn storage')   
    dispatch(employeAddIsSucceed(false,"Çalışan Eklenirken bir hata oluştu."));
  });

  }

}

  
  export const employeAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_ADD_SUCCEED : EMPLOYEE_ADD_FAILED,
    payload : message
  })
  
