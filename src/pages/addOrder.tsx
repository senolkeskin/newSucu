import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
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
import {GetProduct} from "../redux/actions/productForCustomerAction";
import { IProductForCustomerItem } from "../redux/models/productForCustomerModel";
import { Input } from "react-native-elements";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading : boolean;
  products : IProductItem[];
  GetProducts : () => void;
  AddOrder : (productId:number, customerId:number,unitPrice:number, count:number)=>void;
  isSuccees : boolean;
  AddOrderMessage: string;
  GetProduct : (productId:number,customerId:number) => void;
  product: IProductForCustomerItem;
}

interface State {
  productName:string,
  productCode:string,
  unitPrice:string,
  date:string,
  productId:number,
  count:string,
  isSuccess: boolean,
}

interface Item {
  label: string;
  value: any;
  key?: string | number;
  color?: string;
}

interface input{
  count:string,
  unitPrice:string,
}

const girdiler = Yup.object().shape({
  count: Yup.number()
  .positive()
  .required(),
  unitPrice: Yup.number()
  .positive()
  .required()
  .moreThan(0),
});
class addOrder extends Component<Props, State> {






  static navigationOptions =  ({navigation}:Props) => {
    return {

      title: 'Sipariş Ekle',
      


    headerStyle: {
      backgroundColor: '#2B6EDC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

    }

    
  };


  constructor(props: Props) {
    super(props);
    this.state = {
      productId:0,
      productName:"",
      productCode:"",
      unitPrice:"",
      date:"",
      count:"",
      isSuccess:false,
    };
  }

  handleAlert(){
      this.props.navigation.navigate("OrdersCustomer",{customerId:this.props.navigation.getParam("customerId")});
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

  siparisOlustur(values:input){
    const { AddOrder, navigation, isSuccees } = this.props;
    var customerId = navigation.getParam("customerId");
    AddOrder(this.state.productId, customerId, Number(values.unitPrice),Number(values.count));
    this.handleAlert()
  }

  OrderInfo(productId:number){
    this.setState({
      productId: productId,
    });
    this.props.GetProduct(productId,this.props.navigation.getParam("customerId"));

  }
  
  PickerMenuCreate(){
    var PickerModel :Item[] = [];
      
      this.props.products.forEach((product:IProductItem) => {
            var productItem : Item={
                label : product.productName,
                value :product.productId,
            }
            PickerModel.push(productItem);         
      });

      return PickerModel;
  }
componentDidMount(){
  this.props.GetProducts();
}
  componentWillMount() {
    this.props.GetProducts();
    var dateAta:string;
    var date = new Date();
    dateAta = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    this.setState({date:dateAta});
    
  }

  render() {
    const initialValues:input={
      count:this.state.count,
      unitPrice:String(this.props.product.unitPrice),
    }

    const placeholder = {
      label: 'Ürün Seçiniz...',
      value: '',
      color: '#2B6EDC',
    };

    return (
      <View style={styles.addCustomerContainer}>
              
        <StatusBar backgroundColor="#2B6EDC"/>

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
                    <View style={styles.rnpickerselect}>
                    <RNPickerSelect
                      
                      style={styles.pickerSelectStyles}
                      placeholder={placeholder}
                      onValueChange={(value) => this.OrderInfo(value)}
                      items={this.PickerMenuCreate()}
                      textInputProps={{ underlineColor: 'yellow' }}
                      Icon={() => {
                        return <Icon name="md-arrow-down" size={24} color="gray" style={{ top: Platform.OS == "ios" ? 0 : 15 }} />;
                      }}
                    />
                    </View>
                      <Text>Ürün Adedi:</Text>
                      <View style={styles.input}>
                      <Input
                        style={styles.input}
                        placeholder="Ürün Adedi"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                        value={props.values.count}
                        onChangeText={props.handleChange("count")}
                        onBlur={props.handleBlur("count")}
                      />
                      </View>
                      <Text>Tarih:</Text>
                      <View style={styles.input}>
                      <Input
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={this.state.date}
                      />
                      </View>
                      <Text>Ürün Kodu:</Text>
                      <View style={styles.input}>
                      <Input
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={this.props.product.productCode}       
                      />
                      </View>
                      <Text>Birim Fiyat:</Text>
                      <View style={styles.input}>
                      <Input
                        style={styles.input}
                        placeholder="Ürün Adedi"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                        value={String(props.values.unitPrice)}
                        onChangeText={props.handleChange("unitPrice")}
                        onBlur={props.handleBlur("unitPrice")}     
                      />
                      </View>
                      <Text>Toplam:</Text>
                      <View style={styles.input}>
                      <Input
                        editable={false}
                        style={styles.input}
                        placeholderTextColor="#313033"
                        value={"Toplam Tutar: "+(Number(props.values.unitPrice)*Number(props.values.count))+" TL"}       
                      />
                      </View>
                      <TouchableOpacity style={styles.siparisButtonContainer}>
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
  product: state.productForCustomer.product,
})
function bindToAction(dispatch: any) {
  return {
    GetProducts: () =>
    dispatch(GetProducts()),
    AddOrder: (productId:number, customerId:number, unitPrice:number, count:number) =>
    dispatch(AddOrder(productId, customerId, unitPrice,count)),
    GetProduct: (productId:number,customerId:number) =>
    dispatch(GetProduct(productId,customerId)), 
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(addOrder);