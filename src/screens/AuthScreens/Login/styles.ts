import { StyleSheet, Button } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B6EDC",
    justifyContent: "center"
  },
  headStyle: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontSize: 40,
    fontWeight: "700",
    color: "white",
    
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
    borderRadius: 2000,
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
  errorMessageText: {
    textAlign: "center",
    color: "#CE0404",
    fontWeight: "900",
    fontSize:15,
  },
  
  

});

export default styles;
