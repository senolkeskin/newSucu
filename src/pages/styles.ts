import { StyleSheet, Button } from "react-native";
import { colors } from "../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    
  },
  addCustomerContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },

  headStyle: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
    paddingHorizontal: 45,
    borderRadius: 2000,
    color: '#ffffff',
    marginBottom:10,
    
  },
  inputContainer: {
    elevation:5,
    borderRadius:2,
    paddingTop:30,
    marginHorizontal:20,
    justifyContent: "space-between",
    padding: 20,
    flex:4,
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center"
  },
  background: {
    backgroundColor: "#A1A9EF",
  },
  input: {
    elevation:2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    color: 'black',
    marginBottom:10,
    borderRadius:4,
    borderColor:"white"
  },
  logoContainer:{
    alignItems:"center",
    flexGrow:1,
    justifyContent:"center",
  },
  logo:{
    width:100,
    height:100,
  },
  buttonContainer:{
    backgroundColor:'#D2D5F1',
    borderRadius: 2000,
    marginHorizontal: 20,
    paddingVertical: 15,
    marginBottom:10,
  },
  customerAddButton:{
    backgroundColor:'#5458F7',
    borderRadius: 2000,
    marginHorizontal: 20,
    paddingVertical: 15,
    marginTop:5,
    marginBottom:10,
    marginLeft:200,
  },

  CustomerAddButtonText:{
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize:16,
  },
  linkText: {
    textAlign: "center",
    color: "#C2C8F7",
    fontWeight: "900",
    marginHorizontal: 120,
    paddingVertical: 15,
    
  },

  flatContainer:{
    flex:1,
  },

  item: {
    backgroundColor: '#B5BAEA',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
    color: "white",

  },

  row: {
    elevation: 6.5,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 5,
    marginBottom: 5,
  },

  row_cell1: {
    flex: 2,
    flexDirection: 'column',
    marginBottom:10,
    marginTop:10,
  },

  row_cell2: {
    flex: 1,
    flexDirection: 'column',
    marginBottom:10,
    marginTop:10,
  },

  row_cell3:{
    flex: 1,
    flexDirection: "row",
    marginBottom:10,
    marginTop:10,
  },

  row_cell4: {
    flexDirection: "column",
    flex:1,
    marginLeft:5,
  },
  row_cell5: {
    flexDirection: 'row',
    flex:7,
  },

  tikla: {
    color: "#131843",
    paddingLeft: 16,
    flex: 0,
    fontSize: 24,
  },
  musteri_adi: {
    color: "#131843",
    textAlignVertical: 'bottom',
    includeFontPadding: false,
    flex: 0,
    fontSize: 20,
  },
  alt_bilgi: {
    color: "#0A157A",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 10,
  },
  paratextalınan: {
    color: "green",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 13,
    textAlign: "right",
  },
  paratextkalan: {
    color: "red",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 13,
    textAlign: "right",
  },
  detay_bilgi: {
    color: "#0A157A",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },
  orderContainer: {
    elevation: 6.5,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  urunAdiText:{
    textAlignVertical: 'bottom',
    color: "#08147E",
    includeFontPadding: false,
    flex: 2,
    fontSize: 20,
  },
  tarihText:{
    textAlign:"right",
    color: "#946C4D",
    includeFontPadding: false,
    flex: 1,
    fontSize: 15,
    paddingRight:12,
    marginTop:5,
  },
  urunAdetText:{
    textAlign:"left",
    color: "#C4B47B",
    includeFontPadding: false,
    flex:0.8,
    fontSize: 12,
  },
  birimFiyatText:{
    textAlign:"left",
    color: "#C4B47B",
    includeFontPadding: false,
    flex:0.8,
    fontSize: 12,
  },
  toplamFiyatText:{
    textAlign:"right",
    color: "#4B3A3A",
    includeFontPadding: false,
    flex:1.1,
    fontSize: 12,
    fontWeight:"bold",
  },

  searchInput:{
    elevation:2,
    backgroundColor: '#E2E7F5',
    marginHorizontal: 10,
    marginLeft:15,
    paddingHorizontal: 20,
    color: 'black',
    marginBottom:10,
    borderRadius:2,
    flex:5,
    flexDirection: "column",
  },

  searchButton:{
    backgroundColor:'#2B6EDC',
    borderRadius: 2000,
    marginHorizontal: 10,
    paddingVertical: 8,
    marginBottom:5,
    marginLeft:0,
    flexDirection: 'column',
    flex:1.5,
    alignItems:"center",
  },

  search_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  order_ustbilgi_row: {
    marginHorizontal:10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconButtonCustomer: {
    marginHorizontal: 2,
    paddingLeft:16,
    flex:0.5,
    textAlign:"right",
  },
  iconButtonOrder: {
    marginHorizontal: 2,
    paddingLeft:16,
    flex:0.1,
    textAlign:"right",
  },


  modalContainer: {
    margin:20,
    padding: 20,
    backgroundColor: '#efefef',
    top:330,
    left: 20,
    right: 20,
    alignItems: 'center',
    position: "absolute",
  },
  innerContainer: {
    alignItems: 'center',
  },

});

export default styles;