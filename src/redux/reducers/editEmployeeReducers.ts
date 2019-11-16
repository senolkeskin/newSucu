import { EmployeeAdd, Action } from "../states";
import {EMPLOYEE_EDIT_SUCCEED,EMPLOYEE_EDIT_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    EmployeeAddMessage: "",
  };

export default (state: EmployeeAdd = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeAddMessage:"Çalışan Düzenlendi.",
      };
      case EMPLOYEE_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeAddMessage:"Çalışan Düzenlenemedi!",
      };
    default:
      return state;
  }
};