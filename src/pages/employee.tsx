import React, { Component } from "react";
import {
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState,} from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../components";
import styles from "./styles";
import { AppState } from "../redux/store";
import { IEmployeeItem } from "../redux/models/employeeModel";
import Icon from "react-native-vector-icons/Ionicons";
import { employeeDelete } from "../redux/actions/deleteEmployeeAction";
import { GetEmployees } from "../redux/actions/employeeAction";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoading: boolean;
  employees: IEmployeeItem[];
  employeeDelete: (employeeId: number) => void;
  employeeDeleteIsSuccess: boolean;
  GetEmployees: () => void
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  nameSurname: string;
  employeeId: number;
  monthlySalary:number;
  active:boolean
}

class Employee extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      nameSurname: "",
      employeeId: 0,
      monthlySalary:0,
      active:false,
    };
  }
  static navigationOptions =  ({navigation}) => {
    return {

      title: 'Çalışanlar',
      headerRight: <TouchableOpacity style={{marginRight:20}}  onPress={() => navigation.navigate("AddEmployee")}>
<Icon name="ios-add" size={40} style={{color:'white'}} />
      </TouchableOpacity>,


    headerStyle: {
      backgroundColor: '#2B6EDC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

    }

    
  };

  




  componentWillMount() {
    this.props.GetEmployees();
    this.setState({ refreshing: false });
  }

  openModal(employeeId: number, nameSurname: string, monthlySalary: number,active:boolean) {
    this.setState({
      modalVisible: true,
      employeeId: employeeId,
      nameSurname: nameSurname,
      monthlySalary: monthlySalary,
      active:active,
    });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  deleteSelectedEmployee() {
    const { employeeDelete } = this.props;
    employeeDelete(this.state.employeeId);
    this.closeModal();
    this.onRefresh();
    this.componentWillMount();
  }

  deleteEmployeeAlert() {
    //function to make three option alert
    Alert.alert(
      //title
      'Müşteri Silme İşlemi',
      //body
      'Müşteriyi silmek istiyor musunuz?',
      [
        { text: 'Geri Gel' },
        { text: 'Evet', onPress: () => this.deleteSelectedEmployee() },
      ],
      { cancelable: false }
    );

  }

  editEmployee() {
    this.closeModal();
    this.props.navigation.navigate("EditEmployee",
      {
        employeeId: this.state.employeeId,
        nameSurname: this.state.nameSurname,
        monthlySalary: this.state.monthlySalary,
        active: this.state.active,
      })

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

  _renderView() {
    const { isLoading, navigation } = this.props;
    console.log(isLoading);
    if (isLoading) {
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else {
      return (<FlatList
        refreshing={this.state.refreshing}
        onRefresh={() => this.onRefresh()}
        data={this.props.employees}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.row_cell5}>
              <View style={styles.row_cell1}>
                <Text style={styles.musteri_adi}>{item.employeeName}</Text>
                <Text style={styles.alt_bilgi}>İşe Giriş: {item.createDate.slice(8, 10) + "/" + item.createDate.slice(5, 7) + "/" + item.createDate.slice(0, 4)}</Text>
              </View>
              <View style={styles.row_cell2}>
                <Text style={styles.maasText}> Maaş: {item.monthlySalary} TL</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.iconButtonCustomer}
              onPress={() => this.openModal(item.employeeId,item.employeeName,item.monthlySalary,item.active)}>
              <Icon name="md-more" size={24} color={"#C4B47B"} />
            </TouchableOpacity>
          </View>)}
        keyExtractor={item => item.employeeId.toString()}
      />);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC" />
        {/* <Header
          title="Çalışanlar"
          rightButtonPress={() => this.props.navigation.navigate("AddEmployee")}
        /> */}
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
                  onPress={() => this.editEmployee()}>
                  <Text style={styles.modalEditButtonText}
                  >Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalDeleteButtonContainer}
                  onPress={() => this.deleteEmployeeAlert()}>
                  <Text style={styles.modalDeleteButtonText}
                  >Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{ marginTop: 10 }}></View>
        </KeyboardAvoidingView>
        {this._renderView()}

      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.employee.isLoading,
  employees: state.employee.employees,
  employeeDeleteIsSuccess: state.deleteEmployee.isSuccess,
})
function bindToAction(dispatch: any) {
  return {
    GetEmployees: () =>
      dispatch(GetEmployees()),
      employeeDelete: (employeeId: number) =>
      dispatch(employeeDelete(employeeId)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Employee);
