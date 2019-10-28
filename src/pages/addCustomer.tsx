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
import { logoutUserService } from "../redux/services/user";
import { customerAdd } from "../redux/actions/customerAddAction";
import { AppState } from '../redux/store'
import { connect } from "react-redux";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees : boolean;
  customerAdd : (nameSurname : string , companyName : string ) => void;
  CustomerAddMessage: string
}

interface customerData {
  musteriAdi: string;
  musteriSoyadi: string;
  sirketAdi: string;
}

const girdiler = Yup.object().shape({
  musteriAdi: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(1)
    .max(16)
    .required(),
    musteriSoyadi: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(1)
    .max(16)
    .required(),
    sirketAdi: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(1)
    .max(16)
    .required(),
});

class addCustomer extends Component<Props, {}> {

  handleLogin = (values: customerData) => { 
    const { customerAdd, isSuccees } = this.props;
    var nameSurname:string = values.musteriAdi+" "+values.musteriSoyadi;
    customerAdd(nameSurname, values.sirketAdi);
      console.log(isSuccees+" "+nameSurname+" "+values.sirketAdi+" rwqrwqrrwqrrq");
      console.log(this.props.CustomerAddMessage);
  };

  anasayfayaDon = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("MainStack");
    });
  };

  render() {
    return (
      <View style={styles.addCustomerContainer}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <HeaderLeft
          title="Müşteri Ekle"
          leftButtonPress={() => this.props.navigation.navigate("Customer")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ musteriAdi: "", musteriSoyadi: "", sirketAdi:"" }}
              validationSchema={girdiler}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (                
                  <View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Adı"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.musteriAdi}
                        autoCapitalize="words"
                        onChangeText={props.handleChange("musteriAdi")}
                        onBlur={props.handleBlur("musteriAdi")}                   
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Soyadı"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.musteriSoyadi}
                        autoCapitalize="words"
                        onChangeText={props.handleChange("musteriSoyadi")}
                        onBlur={props.handleBlur("musteriSoyadi")}
                      />
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
                        style={styles.customerAddButton}>
                        <Text style={styles.CustomerAddButtonText}
                          onPress={props.handleSubmit}>Ekle</Text>
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
  isSuccees : state.customerAdd.isSuccess,
  CustomerAddMessage :state.customerAdd.CustomerAddMessage
})

function bindToAction(dispatch : any) {
  return {
    customerAdd : (nameSurname:string , companyName : string) =>
    dispatch(customerAdd(nameSurname,companyName))   
  };
}

export default connect(mapStateToProps,bindToAction)(addCustomer);