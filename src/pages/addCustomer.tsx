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
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HeaderLeft } from "../components";
import { customerAdd } from "../redux/actions/customerAddAction";
import { AppState } from '../redux/store'
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from 'react-native-picker-select';
import { Input } from "react-native-elements";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isSuccees: boolean;
   customerAdd:  (nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: string) =>  void;
  CustomerAddMessage: string;
  musteri: customerData;
}

interface customerData {
  musteriAdiSoyadi: string;
  sirketAdi: string;
  fountainCount: string;
}

const initialValues: customerData = {
  musteriAdiSoyadi: "",
  sirketAdi: "",
  fountainCount: "",
}

interface CustomerInserState {
  dayOfWeek: number;
}

const girdiler = Yup.object().shape({
  musteriAdiSoyadi: Yup.string()
    .matches(/./g, " ")
    .min(3, "*Müşteri adı 3 karakterden kısa olamaz!")
    .max(30, "*Müşteri adı 30 karakterden uzun olamaz!")
    .required("*Zorunlu Alan"),
  sirketAdi: Yup.string()
    .matches(/./g, " ")
    .min(3, "*Şirket adı 3 karakterden kısa olamaz!")
    .max(30, "*Şirket adı 30 karakterden uzun olamaz!")
    .required("*Zorunlu Alan"),
  fountainCount: Yup.number()
    .positive("*Pozitif değer giriniz.")
    .required("*Zorunlu Alan")
    .moreThan(0),
});


class addCustomer extends Component<Props, CustomerInserState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dayOfWeek: 0
    };
  }


  _SetStateDay(value: number) {

    this.setState({ dayOfWeek: value });
  }

  handleAddCustomer(values: customerData) {
    const { customerAdd } = this.props;
    customerAdd(values.musteriAdiSoyadi, values.sirketAdi, this.state.dayOfWeek, values.fountainCount);

  };

  render() {
    const placeHolderDay = {
      label: 'Tümü',
      value: 0,
      color: '#2B6EDC',
    }
    return (
      <View style={styles.addCustomerContainer}>
        <StatusBar backgroundColor="#2B6EDC" />
        <HeaderLeft
          title="Müşteri Ekle"
          leftButtonPress={() => this.props.navigation.navigate("Customer")}
        />
        <View style={{ marginBottom: 30 }}></View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={initialValues}
              validationSchema={girdiler}
              onSubmit={values => this.handleAddCustomer(values)}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
                return (
                  <View>
                    <View style={styles.inputContainer}>
                      <View style={styles.input}>
                        <Input

                          placeholder="Adı Soyadı"
                          placeholderTextColor="#9A9A9A"
                          value={values.musteriAdiSoyadi}
                          autoCapitalize="words"
                          onChangeText={handleChange("musteriAdiSoyadi")}
                          onBlur={handleBlur("musteriAdiSoyadi")}
                        />
                      </View>
                      <Text style={styles.errorText}>{errors.musteriAdiSoyadi}</Text>
                      <View style={styles.input}>
                        <Input
                          style={styles.input}
                          placeholder="Şirket Adı"
                          placeholderTextColor="#9A9A9A"
                          value={values.sirketAdi}
                          autoCapitalize="words"
                          onChangeText={handleChange("sirketAdi")}
                          onBlur={handleBlur("sirketAdi")}
                        />
                      </View>
                      <Text style={styles.errorText}>{errors.sirketAdi}</Text>
                      <View style={styles.input}>
                        <Input

                          placeholder="Sebil Sayısı"
                          placeholderTextColor="#9A9A9A"
                          value={String(values.fountainCount)}
                          autoCapitalize="words"
                          keyboardType="numeric"
                          onChangeText={handleChange("fountainCount")}
                          onBlur={handleBlur("fountainCount")}
                        />
                      </View>
                      <Text style={styles.errorText}>{errors.fountainCount}</Text>
                      <View style={styles.rnpickerselect}>
                        <RNPickerSelect
                          style={styles.pickerSelectStyles}
                          placeholder={placeHolderDay}
                          onValueChange={(value) => (this._SetStateDay(value))}
                          items={[
                            { label: 'Pazartesi', value: 1 },
                            { label: 'Salı', value: 2 },
                            { label: 'Çarşamba', value: 3 },
                            { label: 'Perşembe', value: 4 },
                            { label: 'Cuma', value: 5 },
                            { label: 'Cumartesi', value: 6 },
                            { label: 'Pazar', value: 7 },
                          ]}
                          textInputProps={{ underlineColor: 'yellow' }}
                          Icon={() => {
                            return <Icon name="md-arrow-down" size={24} color="gray" style={{ top: 15 }} />;
                          }}
                        />
                      </View>

                      <TouchableOpacity
                        style={styles.customerAddButton}
                        onPress={handleSubmit}>
                        <Text style={styles.CustomerAddButtonText}>Ekle</Text>
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
  isSuccees: state.customerAdd.isSuccess,
  CustomerAddMessage: state.customerAdd.CustomerAddMessage
})

function bindToAction(dispatch: any) {
  return {
    customerAdd: (nameSurname: string, companyName: string, dayOfWeek: number, fountainCount: string) =>
      dispatch(customerAdd(nameSurname, companyName, dayOfWeek, fountainCount))
  };
}

export default connect(mapStateToProps, bindToAction)(addCustomer);