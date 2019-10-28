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
  ActivityIndicator,
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../../../redux/actions/loginAction";
import styles from "./styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'

const logo = require("./water.png");

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished : boolean;
  isSucceed : boolean;
  isLoading : boolean;
  loginErrorMessage:string;
  loginUserService : (email : string , password : string ) => void;
}

interface userData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .min(4)
    .max(50)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {

  handleLogin = (values: userData) => { 
    const { loginUserService, isSucceed } = this.props;
      loginUserService(values.username, values.password);
      console.log(isSucceed);
  };

  _renderLoginButton(pr:any){
    const {isLoading } = this.props;
    if(isLoading){
      return (<ActivityIndicator></ActivityIndicator>);
    }

    return (
      <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.buttonText}
      onPress={pr.handleSubmit}
      >Giriş</Text>
    </TouchableOpacity>
    );
  }

  render() {
    if(this.props.isSucceed)
    {
      console.log("ata");
      this.props.navigation.navigate("Customer");
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Image 
                        style={styles.logo}
                        source={logo}
                             
                      />
                      <Text style={styles.headText}>
                        SUCU
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Kullanıcı Adı / E-posta"
                        placeholderTextColor="white"
                        value={props.values.username}
                        keyboardType="email-address"
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText={props.handleChange("username")}
                        onBlur={props.handleBlur("username")}                   
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        placeholderTextColor="white"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                      />
                      {this._renderLoginButton(props)}
  
                      <Text style={styles.errorMessageText}>{this.props.loginErrorMessage}</Text>
                      <Text style={styles.linkText}
                      onPress={() => this.props.navigation.navigate("MainStack")}>
                      Şifremi Unuttum
                    </Text>

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
  isFinished : state.login.isFinished,
  isSucceed : state.login.isSucceed,
  isLoading : state.login.isLoading,
  loginErrorMessage :state.login.loginErrorMessage
})

function bindToAction(dispatch : any) {
  return {
    loginUserService : (email:string , password : string) =>
    dispatch(loginUserService(email,password))
  };

}


export default connect(mapStateToProps,bindToAction)(Login);
