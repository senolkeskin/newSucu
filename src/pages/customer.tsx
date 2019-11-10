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
        Modal,
        Alert,} from "react-native";
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
import { Server } from "http";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isHomeLoading : boolean;
  customers : ICustomerItem[];
  GetCustomers : (orderType:number,searchText:string) => void;
  customerDelete : (customerId:number) => void;
  CustomerDeleteIsSuccess: boolean;
}

interface State {
  modalVisible: boolean;
  refreshing:boolean;
  customerId:number;
  nameSurname:string;
  companyName:string;
}

interface search{
  searchText:string;
}

const initialValues:search={
  searchText:"",
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
      refreshing:false,
      customerId:0,
      nameSurname:"",
      companyName:"",
    };
  }

  search(search:search){
    this.props.GetCustomers(1,search.searchText)
  }

  componentWillMount() {
    this.props.GetCustomers(1,"");
    this.setState({ refreshing: false });  
  }


  openModal(customerId:number,nameSurname:string,companyName:string) {
    this.setState({modalVisible:true,
                  customerId:customerId,
                  nameSurname:nameSurname,
                  companyName:companyName,});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  deleteSelectedCustomer(){
    const {customerDelete}=this.props;
    customerDelete(this.state.customerId);
    this.closeModal();
    this.onRefresh();
    this.componentWillMount();
  }

  deleteCustomerAlert(){
      //function to make three option alert
      Alert.alert(
        //title
        'Müşteri Silme İşlemi',
        //body
        'Müşteriyi silmek istiyor musunuz?',
        [
          {text: 'Geri Gel'},
          {text: 'Evet', onPress: () => this.deleteSelectedCustomer()},
        ],
        { cancelable: false }
      );
    
  }

  editCustomer(){
    this.closeModal();
    this.props.navigation.navigate("EditCustomer", 
                    {customerId: this.state.customerId,
                    nameSurname:this.state.nameSurname,
                    companyName:this.state.companyName})

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

_renderView(){
  const {customers, isHomeLoading,navigation} = this.props;
  console.log(isHomeLoading);
  if(isHomeLoading){
    return (<ActivityIndicator></ActivityIndicator>);
  }
  else{
    return (<FlatList
      refreshing={this.state.refreshing}
      onRefresh={() => this.onRefresh()}
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
          <Text style={styles.paratextalınan}>{item.displayTookTotalAmount} Alınan</Text>
          <Text style={styles.paratextkalan} >{item.displayRestTotalAmount} Kalan</Text>
          <Text style={styles.paratextToplam} >Toplam: {item.displayTotalAmount}</Text>
        </View>
        
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.iconButtonCustomer}

          onPress={()=>this.openModal(item.customerId,item.nameSurname,item.companyName)}>
          
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
                  onPress={()=>this.editCustomer()}>
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
        <View style={{marginTop:10}}></View>
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
                      onPress={()=>this.props.GetCustomers(1,props.values.searchText)}>
                        <Icon name="ios-arrow-round-forward" size={30} color={"#EBEDF1"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            </Formik>
            <View style={styles.search_row}>
            <TouchableOpacity
            style={styles.wantedCustomerGetButtonContainer}
            onPress={()=>this.props.GetCustomers(1,"")}>
              <Text style={styles.wantedCustomerGetText}>Tüm Müşteriler</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.wantedCustomerGetButtonContainer}
            onPress={()=>this.props.GetCustomers(2,"")}>
              <Text style={styles.wantedCustomerGetText}>Ödeme Alınacaklar</Text>
            </TouchableOpacity>
            </View>
            
        </ScrollView>
        </KeyboardAvoidingView>
      {this._renderView()}
     
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  isHomeLoading : state.home.isHomeLoading,
  customers : state.home.customers,
  CustomerDeleteIsSuccess: state.customerDelete.isSuccess,
})
function bindToAction(dispatch: any) {
  return {
    GetCustomers: (orderType:number,searchText:string) =>
    dispatch(GetCustomers(orderType,searchText)),
    customerDelete: (customerId:number) =>
    dispatch(customerDelete(customerId)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Customer);
