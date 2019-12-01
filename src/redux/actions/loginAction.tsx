import { AsyncStorage } from "react-native";
import axios from 'axios'
import {WATER_USER_LOGIN} from './../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED,RESET_PROPS} from './../types'
import {Action} from '../states'


export function loginUserService(username:string, password:string) {

  return (dispatch : Dispatch<Action>) =>  {


    dispatch(loading(true));

  axios.post(WATER_USER_LOGIN,
    {
        username: username,
        password: password,
    })
  .then((response) =>{
  if(response.data.isSuccess){

    AsyncStorage.setItem("userToken", response.data.result.token)
    .then(() => {       
      AsyncStorage.setItem("UserId", response.data.result.userId.toString()).then(()=>{
        AsyncStorage.setItem("UserType",response.data.result.userType.toString()).then(()=>{
          dispatch(loginIsSucceed(true,"")); 
        });
       
      })
    })
    .catch(error => { 
      dispatch(loginIsSucceed(false,"Bir hata oluştu."));
      dispatch(reset());
    });
    }

   
  
  else {
    if(response.data.message == "User.Login.UserNotFound"){
      dispatch(loginIsSucceed(false,"Böyle bir kullanıcı bulunamadı!")); 
    }
  }
  })
  .catch(() => {
    dispatch(loginIsSucceed(false, "Bir hata oluştu."));
    dispatch(reset());

  });


  }

}


export function logoutUserService() {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem("userToken")
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  
  export const loading = (loader : boolean) => ({
    type : LOGIN_STARTED,
    payload : loader
  })
  
  
  export const loginIsSucceed = (loginIsSucced : boolean, message:string) => ({
    type : loginIsSucced ? LOGIN_SUCCEED : LOGIN_FAILED,
    payload : message
  })
  

  
  
  export const reset = () => ({
    type : RESET_PROPS,
    payload:null
  })