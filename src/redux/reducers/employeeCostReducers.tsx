import { EmployeeCostAdd, Action } from "../states";
import {EMPLOYEE_COST_ADD_SUCCEED,EMPLOYEE_COST_ADD_FAILED} from "../types";


const initalState = {
    isSuccess: false,
    EmployeeCostAddMessage: "",
  };

export default (state: EmployeeCostAdd = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_COST_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeCostAddMessage:"Çalışan Gider Eklendi.",
      };
      case EMPLOYEE_COST_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeCostAddMessage:"Çalışan Gider Eklenemedi!",
      };
    default:
      return state;
  }
};