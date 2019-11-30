import axios from 'axios'
import {WATER_CUSTOMER_ADD} from './../constants'
import { Dispatch } from "react";
import {CUSTOMER_ADD_SUCCEED,CUSTOMER_ADD_FAILED} from './../types'
import {Action} from '../states'
import { Alert } from 'react-native';


export  function customerAdd(nameSurname:string, companyName:string, dayOfWeek1:number,fountainCount:string) {

  return (dispatch : Dispatch<Action>) =>  {
  axios.post(WATER_CUSTOMER_ADD,
    {
        nameSurname: nameSurname,
        companyName: companyName,
        dayOfWeek : dayOfWeek1,
        fountainCount: +fountainCount,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        Alert.alert(
          //title
          'Müşteri Ekleme Başarılı!',
          //body
          '',
          [
            { text: 'Tamam' }
          ],
          { cancelable: false }
        );
        dispatch(customerAddIsSucceed(true, "Müşteri Eklendi!"));
 
      }
 
    }
    else{
      dispatch(customerAddIsSucceed(false, "Müşteri Zaten Var!"));
      Alert.alert(
        //title
        'Müşteri Zaten Var!',
        //body
        '',
        [
          { text: 'Tamam' }
        ],
        { cancelable: false }
      );
    }
  })
  .catch(error => { 
      
    dispatch(customerAddIsSucceed(false,"Bir hata oluştu."));
  });

  }

}

  
  export const customerAddIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? CUSTOMER_ADD_SUCCEED : CUSTOMER_ADD_FAILED,
    payload : message
  })
  
