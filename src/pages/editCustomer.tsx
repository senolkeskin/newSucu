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
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HeaderLeft } from "../components";
import { customerEdit } from "../redux/actions/customerEditAction";
import { AppState } from '../redux/store'
import { connect } from "react-redux";
import { thisExpression } from "@babel/types";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees : boolean;
  customerEdit : (id:number ,nameSurname : string , companyName : string ) => void;
  CustomerEditMessage: string;
  musteri: customerData;
}

interface customerData {
    musteriAdiSoyadi:string;
    sirketAdi: string;
}

const girdiler = Yup.object().shape({
    musteriAdiSoyadi: Yup.string()
    .matches(/./g)
    .min(1)
    .max(20)
    .required(),
    sirketAdi: Yup.string()
    .matches(/./g)
    .min(1)
    .max(20)
    .required(),
});


class editCustomer extends Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.state = {
      
    };
  }

  handleEditCustomer(values: customerData) {
    const { customerEdit, isSuccees,navigation } = this.props;
    if(isSuccees){
      customerEdit(this.props.navigation.getParam("customerId"),values.musteriAdiSoyadi, values.sirketAdi);
      this.props.navigation.navigate("Customer");
      Alert.alert(
        //title
        'Müşteri Düzenleme Başarılı!',
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
    
    
  };

  render() {
    const { navigation } = this.props;

    var musteriAdiSoyadi:string=this.props.navigation.getParam("nameSurname");
    var sirketAdi:string=this.props.navigation.getParam("companyName");

    return (
      <View style={styles.addCustomerContainer}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <HeaderLeft
          title="Müşteri Bilgilerini Düzenle"
          leftButtonPress={() => this.props.navigation.navigate("Customer")}
        />

        <View style={{marginBottom:30}}></View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{musteriAdiSoyadi,sirketAdi}}
              validationSchema={girdiler}
              onSubmit={values => this.handleEditCustomer(values)}
            >
              {props => {
                return (                
                  <View>
                    <View style={styles.inputContainer}>
                    <Text>Adı Soyadı</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Adı Soyadı"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.musteriAdiSoyadi}
                        autoCapitalize="words"
                        onChangeText={props.handleChange("musteriAdiSoyadi")}
                        onBlur={props.handleBlur("musteriAdiSoyadi")}                   
                      />
                      <Text>Şirket Adı</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Şirket Adı"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.sirketAdi}
                        autoCapitalize="words"
                        onChangeText={props.handleChange("sirketAdi")}
                        onBlur={props.handleBlur("sirketAdi")}
                        
                      />
                      <TouchableOpacity 
                        style={styles.customerEditButton}
                        onPress={props.handleSubmit}>
                        <Text style={styles.CustomerEditButtonText}>Düzenle</Text>               
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
  isSuccees : state.customerEdit.isSuccess,
  CustomerEditMessage :state.customerEdit.CustomerEditMessage
})

function bindToAction(dispatch : any) {
  return {
    customerEdit : (id:number ,nameSurname:string , companyName : string) =>
    dispatch(customerEdit(id,nameSurname,companyName))   
  };
}

export default connect(mapStateToProps,bindToAction)(editCustomer);