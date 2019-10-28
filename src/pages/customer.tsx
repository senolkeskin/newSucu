import React, { Component } from "react";
import { View,
        FlatList, 
        StatusBar, 
        Text, 
        TouchableOpacity, 
        ActivityIndicator, 
        TextInput, 
        KeyboardAvoidingView, 
        Platform,
        LayoutChangeEvent,
        LayoutRectangle,
        Modal,
        Button,} from "react-native";
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
import { Dropdown, DropDownData, RenderBaseProps } from 'react-native-material-dropdown';


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isHomeLoading : boolean;
  customers : ICustomerItem[];
  GetCustomers : () => void;
}

interface State {
  page: number;
  limit: number;
  modalVisible: boolean;
}

const girdiler = Yup.object().shape({
  arananCustomer: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
});

class Customer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      modalVisible: false,
    };
  }

  componentWillMount() {
    this.props.GetCustomers();
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

_renderView(){
  const {customers, isHomeLoading,navigation} = this.props;
  console.log(isHomeLoading);
  if(isHomeLoading){
    return (<ActivityIndicator></ActivityIndicator>);
  }
  else{
    return (<FlatList
    data={this.props.customers}
    renderItem={({ item })  => (
      <View style={styles.row}>
      <TouchableOpacity style={styles.row_cell5} onPress={
        ()=>this.props.navigation.navigate("OrdersCustomer", {customerId: item.customerId,nameSurname:item.nameSurname,companyName:item.companyName})}>
        <View style={styles.row_cell1}>
          <Text style={styles.musteri_adi}>{item.nameSurname}</Text>
          <Text style={styles.alt_bilgi}>{item.companyName}</Text>
        </View>
        <View style={styles.row_cell2}>
          <Text style={styles.paratextalınan}>49900TL kalan</Text>
          <Text style={styles.paratextkalan} >10TL alınan</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.iconButtonCustomer}

          onPress={()=>this.openModal()}>
          
      <Icon name="md-more" size={24} color={"#C4B47B"} />
      </TouchableOpacity>
      </View>)}
    keyExtractor={item => item.customerId.toString()}
  />);
  }
}
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
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
                  onPress={() => this.closeModal()}>
                  <Text style={styles.modalEditButtonText}
                  >Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalDeleteButtonContainer}
                  onPress={() => this.closeModal()}>
                  <Text style={styles.modalDeleteButtonText}
                  >Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        <View style={{marginTop:10}}></View>
        <ScrollView bounces={false}>
        <Formik
              initialValues={{ arananCustomer: ""}}
              validationSchema={girdiler}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.search_row}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Ara"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.arananCustomer}
                        autoCapitalize="none"
                        onChangeText={props.handleChange("arananCustomer")}
                        onBlur={props.handleBlur("arananCustomer")}                   
                      />
                      <TouchableOpacity style={styles.searchButton}>
                        <Icon name="ios-arrow-round-forward" size={30} color={"#EBEDF1"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            </Formik>
        </ScrollView>
        </KeyboardAvoidingView>
      {this._renderView()}
     
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  isHomeLoading : state.home.isHomeLoading,
  customers : state.home.customers
})
function bindToAction(dispatch: any) {
  return {
    GetCustomers: () =>
    dispatch(GetCustomers())
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Customer);
