//bu sayfa henüz oluşturulmadı.
import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HeaderLeft } from "../components";
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import { GetCustomerProduct } from "../redux/actions/customerPriceGetProductAction";
import { ICustomerPriceProductItem } from "../redux/models/customerPriceProductModel";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading : boolean;
  products : ICustomerPriceProductItem[];
  GetCustomerProduct : (customerId:number) => void;
  AddOrder : (productId:number, customerId:number,unitPrice:number, count:number)=>void;
  isSuccees : boolean;
  AddOrderMessage: string;
}

interface State {
    productId:number,
    customerId:number;  
    price:string,
}

interface Item {
  label: string;
  value: number;
  key?: string | number;
  color?: string;
}

interface input{
  price:string,
}

const girdiler = Yup.object().shape({
  price: Yup.number()
  .positive()
  .min(1)
  .max(30)
  .required()
  .moreThan(0),
});
class addOrder extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      productId:0,
      customerId:this.props.navigation.getParam("customerId"),
      price:"",
    };
  }



  OrderInfo(productId:number){
    this.setState({
      productId: productId,
    })
    console.log(productId);
    console.log(this.state.customerId);
  }
  
  PickerMenuCreate(){
    var PickerModel :Item[] = [];
      
      this.props.products.forEach((product:ICustomerPriceProductItem) => {
            var productItem : Item={
                label : product.productName,
                value :product.productId,
            }
            PickerModel.push(productItem);         
      });

      return PickerModel;
  }

  componentWillMount() {
    this.props.GetCustomerProduct(this.state.customerId);
    
  }

  render() {
    const initialValues:input={
      price:this.state.price,
    }

    const placeholder = {
      label: 'Ürün Seçiniz...',
      value: '',
      color: '#2B6EDC',
    };

    return (
      <View style={styles.addCustomerContainer}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <HeaderLeft
          title="Yeni Fiyat"
          leftButtonPress={() => this.props.navigation.navigate("OrdersCustomer")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>      
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={girdiler}
              onSubmit={values => this.siparisOlustur(values)}
            >
              {props => {
                return (
                  <View>
                    <View>
                    </View>
                    <View style={styles.inputContainer}>
                    <View style={styles.input}>
                    <RNPickerSelect
                      style={styles.pickerSelectStyles}
                      placeholder={placeholder}
                      onValueChange={(value) => this.OrderInfo(value)}
                      items={this.PickerMenuCreate()}
                      textInputProps={{ underlineColor: 'yellow' }}
                      Icon={() => {
                        return <Icon name="md-arrow-down" size={24} color="gray" style={{top:15}} />;
                      }}
                    />
                    </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Ürün Fiyatı"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                        value={props.values.price}
                        onChangeText={props.handleChange("price")}
                        onBlur={props.handleBlur("price")}
                      />
                      <TouchableOpacity style={styles.newPriceButtonContainer}>
                        <Text style={styles.amountButtonText}
                        onPress={props.handleSubmit}
                        >Sipariş Ekle</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  isProductLoading : state.products.isProductLoading,
  products : state.products.products,
  isSuccees: state.addOrder.isSuccess,
})
function bindToAction(dispatch: any) {
  return {
    GetCustomerProduct: (customerId:number) =>
    dispatch(GetCustomerProduct(customerId)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(addOrder);