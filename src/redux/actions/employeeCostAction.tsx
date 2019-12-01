import axios from 'axios'
import {WATER_ADD_EMPLOYEE_COST} from '../constants'
import { Dispatch } from "react";
import {EMPLOYEE_COST_ADD_SUCCEED,EMPLOYEE_COST_ADD_FAILED} from '../types'
import {Action} from '../states'


export function employeeCost(employeId:number, cost:number) {

  return (dispatch : Dispatch<Action>) =>  {

  axios.post(WATER_ADD_EMPLOYEE_COST,
    {
        employeId: employeId,
        cost: cost,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        dispatch(employeCostIsSucceed(true, "Çalışan Gider Eklendi!"));
      }
    }
  })
  .catch(error => { 
    dispatch(employeCostIsSucceed(false,"Çalışan Gider Eklenirken bir hata oluştu."));
  });

  }

}

  export const employeCostIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_COST_ADD_SUCCEED : EMPLOYEE_COST_ADD_FAILED,
    payload : message
  })
  
