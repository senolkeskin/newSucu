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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface userData {
  musteriAdi: string;
  sebilSayisi: string;
}

const girdiler = Yup.object().shape({
  count: Yup.number()
  .positive()
  .min(1)
  .max(30)
  .required(),
});
class Login extends Component<Props, {}> {

  render() {
    const placeholder = {
      label: 'Ürün Seçiniz...',
      value: null,
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
                    <View style={styles.input}>
                    <RNPickerSelect
                      style={styles.pickerSelectStyles}
                      placeholder={placeholder}
                      onValueChange={(value) => console.log(value)}
                      items={[
                      { label: 'Football', value: 'football' },
                      { label: 'Baseball', value: 'baseball' },
                      { label: 'Hockey', value: 'hockey' },
                      ]}
                      textInputProps={{ underlineColor: 'yellow' }}
                      Icon={() => {
                        return <Icon name="md-arrow-down" size={24} color="gray" style={{top:15}} />;
                      }}
                    />
                    </View>
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



export default Login;