import { StyleSheet, Button } from "react-native";
import { colors } from "../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B6EDC",
    justifyContent: "center",
    
  },
  addCustomerContainer: {
    flex: 1,
    backgroundColor: "#2B6EDC",
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
    paddingHorizontal: 45,
    color: '#ffffff',
    marginBottom:10,
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
  buttonText:{
    textAlign: "center",
    color: "#1928A9",
    fontWeight: "900",
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
    elevation: 1,
    borderRadius: 10,
    backgroundColor: "#B5BAEA",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
  },
  row_cell: {
    flex: 1,
    flexDirection: 'column',
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
  detay_bilgi: {
    color: "#0A157A",
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },


  


  
  

});

export default styles;