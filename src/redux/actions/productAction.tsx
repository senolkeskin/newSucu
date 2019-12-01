import axios from 'axios'
import {WATER_GET_PRODUCT} from './../constants'
import { Dispatch } from "react";
import {PRODUCT_GET,PRODUCT_LOADING } from './../types'
import {Action} from '../states'
import { IProductItem } from "../models/productModel";


export function GetProducts() {

  return (dispatch : Dispatch<Action>) =>  {
  
    dispatch(loading(true));

  axios.get(WATER_GET_PRODUCT,
    
    )
  .then((response) =>{
    
  if(response.data.isSuccess){
      var productModel :IProductItem[] = [];
      
      response.data.result.homeProductItemModels.forEach((product:any) => {
            var productItem : IProductItem={
                productId :product.productId,
                productName : product.productName,
                productCode :product.productCode,
                price :product.price,
                productStatus: product.productStatus,
            }
            productModel.push(productItem);         
      });
   
      dispatch(products(productModel));
      
    }
   
  
  else {

  }
  })
  .catch((err) => {

  });


  }

}


export const loading = (loader : boolean) => ({
    type : PRODUCT_LOADING,
    payload : loader
  })

  export const products = (products :IProductItem[] ) => ({
    type : PRODUCT_GET,
    payload : products
  })

  