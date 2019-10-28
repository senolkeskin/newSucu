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
import { loginUserService } from "../redux/services/user";
import styles from "./styles";
import { HeaderLeft } from "../components";
import { logoutUserService } from "../redux/services/user";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface userData {
  musteriAdi: string;
  sebilSayisi: string;
}

const girdiler = Yup.object().shape({
  musteriAdi: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  sebilSayisi: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {
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
          title="Sipariş Ekle"
          leftButtonPress={() => this.anasayfayaDon()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ musteriAdi: "", sebilSayisi: "" }}
              validationSchema={girdiler}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Müşteri Adı / Şirket Adı"
                        placeholderTextColor="white"
                        value={props.values.musteriAdi}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={props.handleChange("musteriAdi")}
                        onBlur={props.handleBlur("musteriAdi")}                   
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Sebil Sayısı"
                        placeholderTextColor="white"
                        value={props.values.sebilSayisi}
                        onChangeText={props.handleChange("sebilSayisi")}
                        onBlur={props.handleBlur("sebilSayisi")}
                        secureTextEntry
                      />
                      <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}
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



export default Login;