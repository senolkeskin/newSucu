import axios from 'axios'
import {WATER_EDIT_EMPLOYEE} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_EDIT_SUCCEED,EMPLOYEE_EDIT_FAILED} from './../types'
import {Action} from '../states'


export function employeeEdit(employeeId:number,nameSurname:string, monthlySalary:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_EDIT_EMPLOYEE,
    {
        id: employeeId,
        nameSurname: nameSurname,
        monthlySalary: monthlySalary,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeEditIsSucceed(true, "Çalışan Düzenlendi!"));
      }
    }
  })
  .catch(error => { 
      
    console.log(error + 'error kaydetme asn storage')   
    dispatch(employeEditIsSucceed(false,"Çalışan Düzelenirken bir hata oluştu."));
  });

  }

}

  
  export const employeEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_EDIT_SUCCEED : EMPLOYEE_EDIT_FAILED,
    payload : message
  })
  
