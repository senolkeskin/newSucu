import { AsyncStorage } from "react-native";
import axios from 'axios'
import {WATER_CUSTOMER_PRICE_GET_PRODUCT} from './../constants'
import { Dispatch } from "react";
import {CUSTOMERPICE_PRODUCT_GET,CUSTOMERPICE_PRODUCT_LOADING } from './../types'
import {Action} from '../states'
import { ICustomerPriceProductItem } from "../models/customerPriceProductModel";


export function GetCustomerProduct(customerId:number) {

  return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true));

    var WATER_CUSTOMER_PRICE_GET_PRODUCT_WITH_CUSTOMERID = WATER_CUSTOMER_PRICE_GET_PRODUCT+customerId;

  axios.get(WATER_CUSTOMER_PRICE_GET_PRODUCT_WITH_CUSTOMERID,
    
    )
  .then((response) =>{
    
  if(response.data.isSuccess){
      var productsModel :ICustomerPriceProductItem[] = [];
      
      response.data.result.forEach((product:any) => {
            var productItem : ICustomerPriceProductItem={
                    productId :product.productId,
                    productName : product.productName,
            }
            productsModel.push(productItem);         
      });
   
      dispatch(products(productsModel));
      
    }
   
  
  else {

  }
  })
  .catch((err) => {

  });


  }

}


export const loading = (loader : boolean) => ({
    type : CUSTOMERPICE_PRODUCT_LOADING,
    payload : loader
  })

  export const products = (products :ICustomerPriceProductItem[] ) => ({
    type : CUSTOMERPICE_PRODUCT_GET,
    payload : products
  })

  