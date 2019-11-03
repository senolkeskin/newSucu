import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Icon from "react-native-vector-icons/Ionicons";

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";
import Customer from "../pages/customer";
import Employee from "../pages/employee";
import Settings from "../pages/settings";
import addCustomer from "../pages/addCustomer";
import OrdersCustomer from "../pages/OrdersCustomer";
import addOrder from "../pages/addOrder";
import editCustomer from "../pages/editCustomer";
import addProduct from "../pages/addProduct";

const CustomerApp =createStackNavigator(
  {
  Customer: { screen: Customer},
  CustomerAdd : {screen : addCustomer},
  OrdersCustomer : {screen: OrdersCustomer },
  AddOrder: { screen: addOrder},
  EditCustomer: {screen: editCustomer}
  },
  {
    headerMode: "none"
  }

);

const SettingsApp = createStackNavigator(
  {
    Settings: {screen: Settings},
    AddProduct: {screen: addProduct},

  },
  {
    headerMode: "none"
  }
)

const MainStack = createBottomTabNavigator(
  {
    Customer:  {screen: CustomerApp,
      navigationOptions:{
        tabBarLabel:'Müşteriler',
        tabBarIcon:()=>(  
          <Icon name="ios-contacts" size={25}/>  
        ),
      }
    },
    Employee: { screen: Employee,
      
      navigationOptions:{
        tabBarLabel:'Çalışanlar',
        tabBarIcon:()=>(  
          <Icon name="ios-person"  size={25}/>  
        ),
      },
      
    },
    Settings: { screen: SettingsApp,
      navigationOptions:{
        tabBarLabel:'Ayarlar',
        tabBarIcon:()=>(  
          <Icon name="ios-settings"  size={25}/>  
        )  
      }},
  },
  {
    initialRouteName: "Customer",
    
  }
);

const LoginScreen = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      LoginScreen: LoginScreen,
      MainStack: MainStack,
      AddCustomer: CustomerApp,
    },
    {
      initialRouteName: "AuthLoading" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
