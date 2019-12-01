import { AsyncStorage } from "react-native";
import axios from 'axios'
import { WATER_EMPLOYEE_GET } from './../constants'
import { Dispatch } from "react";
import { EMPLOYEE_GET, LOADING_EMPLOYEES } from './../types'
import { Action } from '../states'
import { IEmployeeItem } from "../models/employeeModel";


export function GetEmployees() {

    return (dispatch: Dispatch<Action>) => {

        dispatch(loading(true));

        axios.get(WATER_EMPLOYEE_GET,

        )
            .then((response) => {

                if (response.data.isSuccess) {
                    var employeesModel: IEmployeeItem[] = [];

                    response.data.result.forEach((employee: any) => {
                        var employeeItem: IEmployeeItem = {
                            employeeId: employee.employeeId,
                            employeeName: employee.employeeName,
                            monthlySalary: employee.monthlySalary,
                            createDate: employee.createDate,
                            active: employee.active,
                        }
                        employeesModel.push(employeeItem);
                    });

                    dispatch(employees(employeesModel));
                }
            })
            .catch((err) => {
            });
    }
}


export const loading = (loader: boolean) => ({
    type: LOADING_EMPLOYEES,
    payload: loader
})

export const employees = (employees: IEmployeeItem[]) => ({
    type: EMPLOYEE_GET,
    payload: employees
})

