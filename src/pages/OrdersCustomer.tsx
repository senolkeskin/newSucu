import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StatusBar, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Alert, TextInput } from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";
import { HeaderLeftRight, Input } from "../components";
import styles from "./styles";
import { GetOrders} from "../redux/actions/orderAction";
import { AppState } from "../redux/store";
import { IOrderItem } from "../redux/models/orderModel";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { AddCash} from "../redux/actions/addCashAction";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  orders: IOrderItem[],
  takeTotalAmount:number,
  tookTotalAmount: number,
  restTotalAmount: number,
  isOrderLoading: boolean,
  GetOrders : (customerId:number) => void;
  AddCash : (orderId:number,amount:string) => void;
}

interface amountData {
  amount: string
}

interface State {
  refreshing: boolean;
  modalVisible: boolean;
  orderId:number;
  amount:number;
  modalAmountVisible:boolean;
  modalPriceVisible:boolean;
}

const girdiler = Yup.object().shape({
  amount: Yup.number()
  .positive()
  .min(1)
  .max(30)
  .required(),
});

const initialValues:amountData = {
  amount:"",
}


class OrdersCustomer extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing:false,
      modalVisible:false,
      orderId:0,
      amount:0,
      modalAmountVisible:false,
      modalPriceVisible:false,
    };
  }
  
  componentWillMount() {
    this.props.GetOrders(this.props.navigation.getParam("customerId"));
    this.setState({ refreshing: false }); 
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

  deleteOrderAlert(){
    //function to make three option alert
    Alert.alert(
      //title
      'Sipariş Silme İşlemi',
      //body
      'Siparişi silmek istiyor musunuz?',
      [
        {text: 'Geri Gel'},
        {text: 'Evet', onPress: () => this.deleteSelectedOrder()},
      ],
      { cancelable: false }
    );
  
}

addCash(){
  this.closeModal();
  this.openAmountModal();

}

openModal(orderId:number) {
  this.setState({modalVisible:true,
                orderId:orderId,});
}

closeModal() {
  this.setState({modalVisible:false});
}

openAmountModal() {
  this.setState({modalAmountVisible:true});
}

closeAmountModal() {
  this.setState({modalAmountVisible:false});
}

closePriceModal(){
  this.setState({modalPriceVisible:false});
}

openPriceModal(){
  this.setState({modalPriceVisible:true});
}

goToNewPricePage(){
  this.closePriceModal();
  this.props.navigation.navigate("NewPricePage",{customerId:this.props.navigation.getParam("customerId")});
}

odemeAl(values: amountData){
  this.props.AddCash(this.state.orderId,values.amount);
  this.closeAmountModal();
  this.onRefresh();
  this.componentWillMount();
}

deleteSelectedOrder(){
  //const {customerDelete}=this.props; sipariş sil sonra apisi yazılınca eklenecek
  //customerDelete(this.state.customerId);
  this.closeModal();
  this.onRefresh();
  this.componentWillMount();
}


  _renderView(){
    const {orders, isOrderLoading,navigation} = this.props;
    console.log(isOrderLoading);
    if(isOrderLoading){
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else{
      return (<FlatList
        refreshing={this.state.refreshing}
        onRefresh={() => this.onRefresh()}
        data={this.props.orders}
        renderItem={({ item }) => 
          <View style={styles.orderContainer}>
            <View style={styles.row_cell1}>
              <View style={styles.row_cell3}>
                <Text style={styles.urunAdiText}>{item.productName}</Text>
                <Text style={styles.tarihText}>{item.dateTime.slice(8,10)+"/"+item.dateTime.slice(5,7)+"/"+item.dateTime.slice(0,4)+" "+
                  item.dateTime.slice(11,16)}</Text>
                <TouchableOpacity
                  style={styles.iconButtonOrder}
                  onPress={()=>this.openModal(item.orderId)}>
                  <Icon name="md-more" size={24} color={"#C4B47B"} />
                </TouchableOpacity>
              </View>
              <View style={styles.row_cell3}>
                <Text style={styles.urunAdetText}>Adet: {item.count}</Text>
                <Text style={styles.birimFiyatText}>Birim Fiyat: {item.unitPrice} TL</Text>
                <Text style={styles.toplamFiyatText}>Toplam Fiyat: {item.totalPrice} TL</Text>
              </View>
              <View style={styles.row_cell3}>
                <Text style={styles.alınanParaText}>Alınan Para: {item.tookTotalPrice} TL</Text>
                <Text style={styles.kalanParaText}>Kalan Para: {item.restAmount} TL</Text>
              </View>
            </View>
            
            
          </View>}
        keyExtractor={item => item.orderId.toString()}
      />);
    }
  }


  render() {
    
    const { navigation } = this.props;

    var nameSurname:string=this.props.navigation.getParam("nameSurname");
    var companyName:string=this.props.navigation.getParam("companyName");

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <HeaderLeftRight
          title={"Sipariş Detay"}
          leftButtonPress={() => this.props.navigation.navigate("Customer")}
          rightButtonPress={() => this.props.navigation.navigate("AddOrder",{customerId:this.props.navigation.getParam("customerId")})}
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
              <TouchableOpacity style={styles.modalOrderButtonContainer}
                  onPress={()=>this.addCash()}>
                  <Text style={styles.modalEditButtonText}
                  >Ödeme Ekle</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.modalDeleteButtonContainer}
                  onPress={() => this.deleteOrderAlert()}>
                  <Text style={styles.modalDeleteButtonText}
                  >Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal            
              visible={this.state.modalAmountVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeAmountModal()}
              transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.modalCancelButtonContainer}
                  onPress={() => this.closeAmountModal()}>
                  <Icon name="md-close" size={30} color={"#6E6E6E"} />
                </TouchableOpacity>
                <ScrollView bounces={false}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={girdiler}
                  onSubmit={values => this.odemeAl(values)}
                >
                  {props => {
                return (                
                  <View>
                      <View style={styles.inputFiyatContainer}>
                      <TextInput
                        style={styles.inputFiyat}
                        placeholder="Ürün Fiyatı"
                        placeholderTextColor="#9A9A9A"
                        value={props.values.amount+""}
                        autoCapitalize="none"
                        keyboardType= "numeric"
                        onChangeText={props.handleChange("amount")}
                        onBlur={props.handleBlur("amount")}      
                      />
                      <Text style={styles.inputFiyatText}>TL</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.amountButtonContainer}
                        onPress={props.handleSubmit}>
                        <Text style={styles.amountButtonText}> Ekle </Text>               
                      </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
            </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal            
              visible={this.state.modalPriceVisible}
              animationType={'slide'}
              onRequestClose={() => this.closePriceModal()}
              transparent={true}
          >
            <View style={styles.modalPriceContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.modalCancelButtonContainer}
                  onPress={() => this.closePriceModal()}>
                  <Icon name="md-close" size={30} color={"#6E6E6E"} />
                </TouchableOpacity>
              <TouchableOpacity style={styles.modalPriceYeniPriceButtonContainer}
                  onPress={()=>this.goToNewPricePage()}>
                  <Text style={styles.modalPriceYeniPriceButtonText}
                  >Yeni Fiyat Gir</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.modalPriceTanimliFiyatButtonContainer}
                  onPress={() => this.deleteCustomerAlert()}>
                  <Text style={styles.modalPriceTanimliFiyatButtonText}
                  >Tanımlı Fiyatlar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        <View style={styles.order_ustbilgi_row}>
        <View style={styles.row_cell1}>
          <Text style={styles.musteri_adi}>{nameSurname}</Text>
          <Text style={styles.alt_bilgi}>{companyName}</Text>
        </View>
        <TouchableOpacity
            style={styles.iconButtonOrder}
            onPress={()=>this.openPriceModal()}>
            <Icon name="md-more" size={24} color={"#C4B47B"} />
        </TouchableOpacity>
        <View style={styles.row_cell2}>
          <Text style={styles.paratextalınan}>{this.props.tookTotalAmount} TL Alınan</Text>
          <Text style={styles.paratextkalan} >{this.props.restTotalAmount} TL Kalan</Text>
          <Text style={styles.paratextToplam}>Toplam: {this.props.takeTotalAmount} TL </Text>
        </View>
        
      </View>
        <View style={{marginTop:10}}></View>
        </KeyboardAvoidingView>
        {this._renderView()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOrderLoading : state.orders.isOrderLoading,
  orders : state.orders.orders,
  takeTotalAmount: state.orders.takeTotalAmount,
  tookTotalAmount: state.orders.tookTotalAmount,
  restTotalAmount: state.orders.restTotalAmount,
  
});

function bindToAction(dispatch: any,) {
  return {
    GetOrders: (customerId:number) =>
    dispatch(GetOrders(customerId)),
    AddCash:(orderId:number,amount:string)=>
    dispatch(AddCash(orderId,Number(amount))),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(OrdersCustomer);