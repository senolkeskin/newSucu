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
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HeaderLeft } from "../components";
import { productAdd } from "../redux/actions/productAddAction";
import { AppState } from '../redux/store'
import { connect } from "react-redux";
import { Input } from "react-native-elements";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees: boolean;
  productAdd: (productName: string, productCode: string, price: string) => void;
  ProductAddMessage: string;
  urun: productData;
}

interface productData {
  urunAdi: string;
  urunKodu: string;
  urunFiyati: string;
}

const initialValues: productData = {
  urunAdi: "",
  urunKodu: "",
  urunFiyati: "",
}

const girdiler = Yup.object().shape({
  urunAdi: Yup.string()
    .matches(/./g)
    .min(1)
    .max(30)
    .required(),
  urunKodu: Yup.string()
    .matches(/./g)
    .min(1)
    .max(30)
    .required(),
  urunFiyati: Yup.number()
    .positive()
    .required()
    .moreThan(0),
});


class addProduct extends Component<Props, {}> {
  


  static navigationOptions =  ({navigation}:Props) => {
    return {

      title: 'Ürün Oluştur',
     


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

    };
  }

  handleAlert() {
    this.props.navigation.navigate("Products");
    Alert.alert(
      //title
      'Yeni Ürün Oluşturuldu!',
      //body
      '',
      [
        { text: 'Tamam' }
      ],
      { cancelable: false }
    );
  }

  componentDidUpdate() { }

  handleCreateProduct(values: productData) {
    const { productAdd } = this.props;
    productAdd(values.urunAdi, values.urunKodu, values.urunFiyati);
    this.componentDidUpdate();
    this.handleAlert()

  };

  render() {
    return (
      <View style={styles.addCustomerContainer}>
        <StatusBar backgroundColor="#2B6EDC" />

        <View style={{ marginBottom: 30 }}></View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={initialValues}
              validationSchema={girdiler}
              onSubmit={values => this.handleCreateProduct(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.inputContainer}>
                      <View style={styles.input}>
                        <Input
                          style={styles.input}
                          placeholder="Ürün Adı"
                          placeholderTextColor="#9A9A9A"
                          value={props.values.urunAdi}
                          autoCapitalize="words"
                          onChangeText={props.handleChange("urunAdi")}
                          onBlur={props.handleBlur("urunAdi")}
                        />
                      </View>
                      <View style={styles.input}>
                        <Input
                          style={styles.input}
                          placeholder="Ürün Kodu"
                          placeholderTextColor="#9A9A9A"
                          value={props.values.urunKodu}
                          autoCapitalize="words"
                          onChangeText={props.handleChange("urunKodu")}
                          onBlur={props.handleBlur("urunKodu")}
                        />
                      </View>
                      <View style={styles.inputFiyatContainer}>
                        <View style={{ flex: 8 }}>
                          <Input
                            style={styles.inputFiyat}
                            placeholder="Ürün Fiyatı"
                            placeholderTextColor="#9A9A9A"
                            value={props.values.urunFiyati}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            onChangeText={props.handleChange("urunFiyati")}
                            onBlur={props.handleBlur("urunFiyati")}
                          />
                        </View>
                        <Text style={styles.inputFiyatText}>TL</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.ProductAddButton}
                        onPress={props.handleSubmit}>
                        <Text style={styles.ProductAddButtonText}>Oluştur</Text>
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

const mapStateToProps = (state: AppState) => ({
  isSuccees: state.productAdd.isSuccess,
  ProductAddMessage: state.productAdd.ProductAddMessage
})

function bindToAction(dispatch: any) {
  return {
    productAdd: (productName: string, productCode: string, price: string) =>
      dispatch(productAdd(productName, productCode, price))
  };
}

export default connect(mapStateToProps, bindToAction)(addProduct);