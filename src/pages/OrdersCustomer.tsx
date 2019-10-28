import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StatusBar, Text, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { HeaderLeft } from "../components";
import styles from "./styles";
import { GetOrders } from "../redux/actions/orderAction";
import { AppState } from "../redux/store";
import { IOrderItem } from "../redux/models/orderModel";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  orders: IOrderItem[],
  isOrderLoading: boolean,
  GetOrders : (customerId:number) => void;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
}

class OrdersCustomer extends Component<Props, State> {
  
  componentWillMount() {
    this.props.GetOrders(this.props.navigation.getParam("customerId"));
  }


  _renderView(){
    const {orders, isOrderLoading,navigation} = this.props;
    console.log(isOrderLoading);
    if(isOrderLoading){
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else{
      return (<FlatList
        data={this.props.orders}
        renderItem={({ item }) => 
          <View style={styles.orderContainer}>
            <View style={styles.row_cell1}>
              <View style={styles.row_cell3}>
                <Text style={styles.urunAdiText}>{item.productName}</Text>
                <Text style={styles.tarihText}>25 Ekim 2019</Text>
                <TouchableOpacity
                  style={styles.iconButton}
                >
                  <Icon name="md-more" size={24} color={"#C4B47B"} />
                </TouchableOpacity>
              </View>
              <View style={styles.row_cell3}>
                <Text style={styles.urunAdetText}>Adet: {item.count}</Text>
                <Text style={styles.birimFiyatText}>Birim Fiyat: {item.unitPrice}TL</Text>
                <Text style={styles.toplamFiyatText}>Toplam Fiyat: {item.totalPrice}TL</Text>
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
        <HeaderLeft
          title={nameSurname+" Sipariş Detay"}
          leftButtonPress={() => this.props.navigation.navigate("Customer")}
        />
        <View style={styles.order_ustbilgi_row}>
        <View style={styles.row_cell1}>
          <Text style={styles.musteri_adi}>{nameSurname}</Text>
          <Text style={styles.alt_bilgi}>{companyName}</Text>
        </View>
        <View style={styles.row_cell2}>
          <Text style={styles.paratextalınan}>49900TL kalan</Text>
          <Text style={styles.paratextkalan} >10TL alınan</Text>
        </View>
      </View>
        <View style={{marginTop:10}}></View>
        {this._renderView()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOrderLoading : state.orders.isOrderLoading,
  orders : state.orders.orders
});

function bindToAction(dispatch: any,) {
  return {
    GetOrders: (customerId:number) =>
    dispatch(GetOrders(customerId))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(OrdersCustomer);