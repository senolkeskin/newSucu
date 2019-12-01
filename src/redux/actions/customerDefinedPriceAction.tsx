import axios from 'axios'
import {WATER_CUSTOMER_DEFINED_PRICE} from '../constants'
import { Dispatch } from "react";
import {CUSTOMER_DEFINED_PRICE_GET,CUSTOMER_DEFINED_PRICE_LOADING } from '../types'
import {Action} from '../states'
import { IDefinedCustomerPriceItem } from "../models/customerDefinedPriceModel";


export function getCustomerPrice(customerId:number) {

  return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true));

    var WATER_CUSTOMER_DEFINED_PRICE_WITH_CUSTOMERID= WATER_CUSTOMER_DEFINED_PRICE+customerId;

  axios.get(WATER_CUSTOMER_DEFINED_PRICE_WITH_CUSTOMERID,
    
    )
  .then((response) =>{
    
  if(response.data.isSuccess){
      var productModel :IDefinedCustomerPriceItem[] = [];
      
      response.data.result.forEach((product:any) => {
            var productItem : IDefinedCustomerPriceItem={
              customerPriceId:product.customerPriceId,
              productId:product.productId,
              customerId:product.customerId,
              productName:product.productName,
              unitPrice:product.unitPrice,
              displayUnitPrice:product.displayUnitPrice,
            }
            productModel.push(productItem);         
      });
   
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
    type : CUSTOMER_DEFINED_PRICE_LOADING,
    payload : loader
  })

  export const products = (products :IDefinedCustomerPriceItem[] ) => ({
    type : CUSTOMER_DEFINED_PRICE_GET,
    payload : products
  })

  