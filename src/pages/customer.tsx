import React, { Component } from "react";
import {
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";
import { Header, Input } from "../components";
import styles from "./styles";
import { GetCustomers } from "../redux/actions/homeAction";
import { AppState } from "../redux/store";
import { ICustomerItem } from "../redux/models/homeModel";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Ionicons";
import { customerDelete } from "../redux/actions/customerDeleteAction";
import RNPickerSelect from 'react-native-picker-select';


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isHomeLoading: boolean;
  customers: ICustomerItem[];
  GetCustomers: (orderType: number, searchText: string, dayOfWeek:number) => void;
  customerDelete: (customerId: number) => void;
  CustomerDeleteIsSuccess: boolean;
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  customerId: number;
  nameSurname: string;
  companyName: string;
  orderType: number;
  dayOfWeek : number;
  searchText : string;
  dayOfWeekCustomer?: number;
}

interface search {
  searchText: string;
}

const initialValues: search = {
  searchText: "",
}

const girdiler = Yup.object().shape({
  searchText: Yup.string()
    .matches(/./g)
    .min(1)
    .max(16)
    .required(),
});

class Customer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      customerId: 0,
      nameSurname: "",
      companyName: "",
      orderType: 1,
      dayOfWeek : 0,
      searchText : '',
      dayOfWeekCustomer:0,
    };
  }

  search(search: search) {
    this.props.GetCustomers(this.state.orderType, search.searchText, this.state.dayOfWeek);
    this.setState({searchText:search.searchText});
  }

  componentWillMount() {
    this.props.GetCustomers(this.state.orderType, this.state.searchText,this.state.dayOfWeek);
    this.setState({ refreshing: false });
  }

  getMusteri(value: number) {
    // this.setState({
    //   productId: productId,
    // });
    // this.props.GetProduct(productId,this.props.navigation.getParam("customerId"));
    
    this.props.GetCustomers(value, this.state.searchText, this.state.dayOfWeek);
    this.setState({
      orderType: value,
    });


  }
getDayOfMusteri(value:number){
  console.log(value);
  this.props.GetCustomers(this.state.orderType, this.state.searchText, value);
  this.setState({
    dayOfWeek: value,
  });

}

  openModal(customerId: number, nameSurname: string, companyName: string, dayOfWeek?: number) {
    this.setState({
      modalVisible: true,
      customerId: customerId,
      nameSurname: nameSurname,
      companyName: companyName,
      dayOfWeekCustomer: dayOfWeek,
    });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  deleteSelectedCustomer() {
    const { customerDelete } = this.props;
    customerDelete(this.state.customerId);
    this.closeModal();
    this.onRefresh();
    this.props.GetCustomers(this.state.orderType, this.state.searchText,this.state.dayOfWeek);
    this.setState({ refreshing: false });
  }

  deleteCustomerAlert() {
    //function to make three option alert
    Alert.alert(
      //title
      'Müşteri Silme İşlemi',
      //body
      'Müşteriyi silmek istiyor musunuz?',
      [
        { text: 'Geri Gel' },
        { text: 'Evet', onPress: () => this.deleteSelectedCustomer() },
      ],
      { cancelable: false }
    );

  }

  editCustomer() {
    this.closeModal();
    console.log(this.state.dayOfWeekCustomer)
    this.props.navigation.navigate("EditCustomer",
      {
        customerId: this.state.customerId,
        nameSurname: this.state.nameSurname,
        companyName: this.state.companyName,
        dayofWeekCustomer: this.state.dayOfWeekCustomer
      })

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.GetCustomers(this.state.orderType, this.state.searchText,this.state.dayOfWeek);
    this.setState({ refreshing: false });
  }

  _renderView() {
    const { customers, isHomeLoading, navigation } = this.props;
    console.log(isHomeLoading);
    if (isHomeLoading) {
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else {
      if(this.props.customers.length>0){

        return (<FlatList
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          data={this.props.customers}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity style={styles.row_cell5} onPress={
                () => this.props.navigation.navigate("OrdersCustomer", { customerId: item.customerId, nameSurname: item.nameSurname, companyName: item.companyName})}>
                <View style={styles.row_cell1}>
              <Text style={styles.musteri_adi}>{item.nameSurname} {item.dayOfWeek}</Text>
                  <Text style={styles.alt_bilgi}>{item.companyName}</Text>
                </View>
                <View style={styles.row_cell2}>
                  <Text style={styles.paratextalınan}>{item.displayTookTotalAmount} Alınan</Text>
                  <Text style={styles.paratextkalan} >{item.displayRestTotalAmount} Kalan</Text>
                  <Text style={styles.paratextToplam} >Toplam: {item.displayTotalAmount}</Text>
                </View>
  
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButtonCustomer}
  
                onPress={() => this.openModal(item.customerId, item.nameSurname, item.companyName, item.dayOfWeek )}>
  
                <Icon name="md-more" size={24} color={"#C4B47B"} />
              </TouchableOpacity>
            </View>)}
          keyExtractor={item => item.customerId.toString()}
        />);

      }
      else{
        return (<View style={styles.musteribulunamadiContainer}><Text style={styles.musteribulunamadiText}>Arama sonucu bulunamadı.</Text></View>);
      }
      
    }
  }
  render() {
    const placeholder = {
      label: 'Tüm Müşteriler',
      value: 1,
      color: '#2B6EDC',
    };
    const placeHolderDay ={
      label: 'Tümü',
      value: 0,
      color: '#2B6EDC',
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC" />
        <Header
          title="Müşteriler"
          rightButtonPress={() => this.props.navigation.navigate("CustomerAdd")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.modalCancelButtonContainer}
                  onPress={() => this.closeModal()}>
                  <Icon name="md-close" size={30} color={"#6E6E6E"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalEditButtonContainer}
                  onPress={() => this.editCustomer()}>
                  <Text style={styles.modalEditButtonText}
                  >Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalDeleteButtonContainer}
                  onPress={() => this.deleteCustomerAlert()}>
                  <Text style={styles.modalDeleteButtonText}
                  >Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{ marginTop: 10 }}></View>
          <ScrollView bounces={false}>
            <Formik
              initialValues={initialValues}
              validationSchema={girdiler}
              onSubmit={values => this.search(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.search_row}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Ara"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.searchText}
                        autoCapitalize="none"
                        onChangeText={props.handleChange("searchText")}
                        onBlur={props.handleBlur("searchText")}
                      />
                      <TouchableOpacity style={styles.searchButton}
                        onPress={() => this.search(props.values)}>
                        <Icon name="ios-arrow-round-forward" size={30} color={"#EBEDF1"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            </Formik>
            <View style={styles.search_row}>
              <View style={styles.rnpickerselect}>
                <RNPickerSelect
                  style={styles.pickerSelectStyles}
                  placeholder={placeholder}
                  onValueChange={(value) => (this.getMusteri(value))}
                  items={[
                    { label: 'Ödeme Alınacaklar', value: 2 },
                  ]}
                  textInputProps={{ underlineColor: 'yellow' }}
                  Icon={() => {
                    return <Icon name="md-arrow-down" size={24} color="gray" style={{ top: 15 }} />;
                  }}
                />
              </View>
              <View style={styles.rnpickerselect}>
                <RNPickerSelect
                  style={styles.pickerSelectStyles}
                  placeholder={placeHolderDay}
                  onValueChange={(value) => (this.getDayOfMusteri(value))}
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
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
        {this._renderView()}

      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isHomeLoading: state.home.isHomeLoading,
  customers: state.home.customers,
  CustomerDeleteIsSuccess: state.customerDelete.isSuccess,
})
function bindToAction(dispatch: any) {
  return {
    GetCustomers: (orderType: number, searchText: string, dayOfWeek:number) =>
      dispatch(GetCustomers(orderType, searchText, dayOfWeek)),
    customerDelete: (customerId: number) =>
      dispatch(customerDelete(customerId)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Customer);
