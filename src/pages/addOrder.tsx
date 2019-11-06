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
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HeaderLeft } from "../components";
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/Ionicons";
import { GetProducts } from "../redux/actions/productAction";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import { IProductItem } from "../redux/models/productAddModel";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading : boolean;
  products : IProductItem[];
  GetProducts : () => void;
}
interface State {
  productName:string,
  productCode:string,
  price:number,
  date:string,
}

interface Item {
  label: string;
  value: any;
  key?: string | number;
  color?: string;
}

interface orderData {
  count:number,
}

const initialValues:orderData = {
  count:0,
}

const girdiler = Yup.object().shape({
  count: Yup.number()
  .positive()
  .min(1)
  .max(30)
  .required(),
});
class addOrder extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      productName:"",
      productCode:"",
      price:0,
      date:"",
    };
  }

  siparisOlustur(values:orderData){

  }

  OrderInfo(value:IProductItem){
    this.setState({
      productName:value.productName,
      productCode:value.productCode,
      price:value.price,
    })
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
    var date = new Date().toISOString(); //Current Date
    
  }

  render() {
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
                        placeholder="Ürün Adedi"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                        value={props.values.count+""}
                        onChangeText={props.handleChange("count")}
                        onBlur={props.handleBlur("count")}
                      />
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={"Date().toISOString()"}
                      />
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={this.state.productCode}       
                      />
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={this.state.price+""}       
                      />
                      <TextInput
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={(this.state.price*props.values.count)+""}       
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
})
function bindToAction(dispatch: any) {
  return {
    GetProducts: () =>
    dispatch(GetProducts()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(addOrder);