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
import { GetProducts } from "../redux/actions/productAction";
import { IProductItem } from "../redux/models/productAddModel";
import { AddOrder } from "../redux/actions/addOrderAction";
import { IAddOrderItem } from "../redux/models/addOrderModel";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading : boolean;
  products : IProductItem[];
  GetProducts : () => void;
  AddOrder : (productId:number, customerId:number,unitPrice:number, count:number)=>void;
  isSuccees : boolean;
  AddOrderMessage: string;
}

interface State {
  productName:string,
  productCode:string,
  price:string,
  date:string,
  productId:number,
  count:string,
}

interface Item {
  label: string;
  value: any;
  key?: string | number;
  color?: string;
}

interface input{
  count:string,
  price:string,
}

const girdiler = Yup.object().shape({
  count: Yup.number()
  .positive()
  .min(1)
  .max(30)
  .required(),
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
      productName:"",
      productCode:"",
      price:"",
      date:"",
      count:"",
    };
  }

  siparisOlustur(values:input){
    const { AddOrder, isSuccees,navigation } = this.props;
    var customerId = navigation.getParam("customerId");
    console.log(this.state.productId+" " +customerId+" "+ Number(values.price)+" " + " "+Number(values.count));
    if(true){   
      AddOrder(this.state.productId, customerId, Number(values.price),Number(values.count));
      this.props.navigation.navigate("OrdersCustomer");
      Alert.alert(
        //title
        'Yeni Sipariş Oluşturuldu!',
        //body
        '',
        [
          {text: 'Tamam'}
        ],
        { cancelable: false }
      );      
    }
    else{
      Alert.alert(
        //title
        'Bir Sorun Oluştu!',
        //body
        '',
        [
          {text: 'Tamam'}
        ],
        { cancelable: false }
      );
    }

  }

  OrderInfo(value:IProductItem){
    this.setState({
      productId: value.productId,
      productName:value.productName,
      productCode:value.productCode,
      price:String(value.price),
    })
    console.log(this.state.price);
  }
  
  PickerMenuCreate(){
    var PickerModel :Item[] = [];
      
      this.props.products.forEach((product:IProductItem) => {
            var productItem : Item={
                label : product.productName,
                value :product,
            }
            PickerModel.push(productItem);         
      });

      return PickerModel;
  }

  componentWillMount() {
    this.props.GetProducts();
    var dateAta:string;
    var date = new Date().toISOString(); //Current Date
    dateAta = date;
    this.setState({date:dateAta});
    
  }

  render() {
    const initialValues:input={
      count:this.state.count,
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
          title="Sipariş Ekle"
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
                      <Text>Ürün Adedi:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Ürün Adedi"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                        value={props.values.count}
                        onChangeText={props.handleChange("count")}
                        onBlur={props.handleBlur("count")}
                      />
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={this.state.date.slice(8,10)+"/"+this.state.date.slice(5,7)+"/"+this.state.date.slice(0,4)+" "+
                        this.state.date.slice(11,16)}
                      />
                      <Text>Ürün Kodu:</Text>
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={this.state.productCode}       
                      />
                      <Text>Birim Fiyat:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Ürün Adedi"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                        value={props.values.price}
                        onChangeText={props.handleChange("price")}
                        onBlur={props.handleBlur("price")}     
                      />
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={"Toplam Tutar: "+(Number(props.values.price)*Number(props.values.count))+" TL"}       
                      />
                      <TouchableOpacity style={styles.buttonContainer}>
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
    GetProducts: () =>
    dispatch(GetProducts()),
    AddOrder: (productId:number, customerId:number, unitPrice:number, count:number) =>
    dispatch(AddOrder(productId, customerId, unitPrice,count)), 
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(addOrder);