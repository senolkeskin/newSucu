import { EmployeeAdd, Action } from "../states";
import {EMPLOYEE_ADD_SUCCEED,EMPLOYEE_ADD_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    EmployeeAddMessage: "",
  };

export default (state: EmployeeAdd = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeAddMessage:"Çalışan Eklendi.",
      };
      case EMPLOYEE_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeAddMessage:"Çalışan Eklenemedi!",
      };
    default:
      return state;
  }
};