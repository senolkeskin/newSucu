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
import { HeaderLeftRight } from "../components";
import styles from "./styles";
import { GetProducts } from "../redux/actions/productAction";
import { AppState } from "../redux/store";
import { IProductItem } from "../redux/models/productModel";
import Icon from "react-native-vector-icons/Ionicons";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoading : boolean;
  products : IProductItem[];
  GetProducts : () => void;
}

interface State {
  modalVisible: boolean;
  refreshing:boolean;
  productId:number;
  productName:string;
  productCode:string;
  price:number;
}

class Products extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing:false,
      productId:0,
      productCode:"",
      productName:"",
      price:0
    };
  }

  componentWillMount() {
    this.props.GetProducts();
    this.setState({ refreshing: false });  
  }


  openModal(productCode:string,productName:string,price:number,productId:number) {
    this.setState({modalVisible:true,
                productId: productId,
                productCode:productCode,
                productName:productName,
                price:price,});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }


  editProduct(){
    this.closeModal();
    this.props.navigation.navigate("EditProduct", 
                    {productId: this.state.productId,
                    productName:this.state.productName,
                    price:this.state.price,
                    productCode:this.state.productCode})

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

_renderView(){
  const {products, isLoading,navigation} = this.props;
  console.log(isLoading);
  if(isLoading){
    return (<ActivityIndicator></ActivityIndicator>);
  }
  else{
    return (<FlatList
      refreshing={this.state.refreshing}
      onRefresh={() => this.onRefresh()}
      data={this.props.products}
      renderItem={({ item })  => (
      <View style={styles.row}>
      <View style={styles.row_cell5}>
        <View style={styles.row_cell1}>
          <Text style={styles.musteri_adi}>{item.productName}</Text>
          <Text style={styles.alt_bilgi}>Ürün Kodu: {item.productCode}</Text>
        </View>
        <View style={styles.row_cell2}>
          <Text style={styles.productUrunfiyatText}>Birim Fiyat: {item.price} TL</Text>
        </View>
      </View>
      <TouchableOpacity
          style={styles.iconButtonCustomer}

          onPress={()=>this.openModal(item.productCode,item.productName,item.price,item.productId)}>
          
      <Icon name="md-more" size={24} color={"#C4B47B"} />
      </TouchableOpacity>
      </View>)}
    keyExtractor={item => item.productId.toString()}
  />);
  }
}
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <HeaderLeftRight
          title="Ürünler Listesi"
          rightButtonPress={() => this.props.navigation.navigate("AddProduct")}
          leftButtonPress={()=>this.props.navigation.navigate("Settings")}
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
                  onPress={()=>this.editProduct()}>
                  <Text style={styles.modalEditButtonText}
                  >Düzenle</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
        <View style={{marginTop:10}}></View>
        </KeyboardAvoidingView>
      {this._renderView()} 
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  isHomeLoading : state.home.isHomeLoading,
  products : state.products.products,
})
function bindToAction(dispatch: any) {
  return {
    GetProducts: () =>
    dispatch(GetProducts()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Products);
