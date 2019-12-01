import { AsyncStorage } from "react-native";
import axios from 'axios'
import {WATER_PRODUCT_FOR_CUSTOMER} from './../constants'
import { Dispatch } from "react";
import {PRODUCT_FOR_CUSTOMER_GET,PRODUCT_FOR_CUSTOMER_LOADING } from './../types'
import {Action} from '../states'
import { IProductForCustomerItem } from "../models/productForCustomerModel";


export function GetProduct(productId:number,customerId:number) {

  return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true));

    var WATER_PRODUCT_FOR_CUSTOMER_WITH_PROID_CUSID = WATER_PRODUCT_FOR_CUSTOMER+productId+"&customerId="+customerId;

  axios.get(WATER_PRODUCT_FOR_CUSTOMER_WITH_PROID_CUSID,
    
    )
  .then((response) =>{
    
  if(response.data.isSuccess){
      var productModel : IProductForCustomerItem={
        productId:response.data.result.productId,
        productName:response.data.result.productName,
        unitPrice:response.data.result.unitPrice,
        productCode:response.data.result.productCode,
      }
      dispatch(products(productModel));
    }
   
  
  else {

  }
  })
  .catch((err) => {
    // dispatch(loading(false));
  });
  }
}
export const loading = (loader : boolean) => ({
    type : PRODUCT_FOR_CUSTOMER_LOADING,
    payload : loader,
  })

  export const products = (product :IProductForCustomerItem) => ({
    type : PRODUCT_FOR_CUSTOMER_GET,
    payload : product,
  })

  