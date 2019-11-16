import React, { Component } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TextInput,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HeaderLeft } from "../components";
import { employeeEdit } from "../redux/actions/editEmployeeAction";
import { AppState } from '../redux/store'
import { connect } from "react-redux";
import { IEmployeeItem } from "../redux/models/addEmployeeModel";
import { IUserItem } from "../redux/models/addUserModel";
import { Input } from "react-native-elements";
import { AddUser } from "../redux/actions/addUserAction"

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isSuccees: boolean;
    EmployeeAddMessage: string;
    employee: IEmployeeItem;
    user: IUserItem;
    employeeEdit: (employeeId:number,nameSurname: string, monthlySalary: number) => void;
    AddUser: (nameSurname: string, mail: string, password: string) => void;
}

interface multi extends IEmployeeItem, IUserItem { }

const girdiler = Yup.object().shape({
    nameSurname: Yup.string()
        .matches(/./g, " ")
        .min(3, "*Çalışan adı 3 karakterden kısa olamaz!")
        .max(30, "*Çalışan adı 30 karakterden uzun olamaz!")
        .required("*Zorunlu Alan"),
    monthlySalary: Yup.number()
        .positive("Pozitif değer giriniz!")
        .required("*Zorunlu Alan")
        .moreThan(0, "Sıfırdan büyük olmalıdır!"),
    mail: Yup.string()
        .email("E-posta Giriniz!")
        .min(3, "*E-posta 3 karakterden kısa olamaz!")
        .max(30, "*E-posta 30 karakterden uzun olamaz!"),
    password: Yup.string()
        .min(3, "*Şifre 3 karakterden kısa olamaz!")
        .max(30, "*Şifre 30 karakterden uzun olamaz!"),
});


class addEmployee extends Component<Props, {}> {

    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    handleAlert() {

        this.props.navigation.navigate("Employee");
        Alert.alert(
            //title
            'Çalışan Ekleme Başarılı!',
            //body
            '',
            [
                { text: 'Tamam' }
            ],
            { cancelable: false }
        );
    }


    handleEditEmployee(values: multi) {
        const { employeeEdit, AddUser,navigation } = this.props;
        console.log(String(navigation.getParam("employeeId"))+" "+values.nameSurname+" "+values.monthlySalary )
        employeeEdit(navigation.getParam("employeeId"),values.nameSurname, Number(values.monthlySalary));
        // if (values.mail != "" && values.password != "") {
        //     AddUser(values.nameSurname, values.mail, values.password);
        // }
        this.handleAlert();
    };

    render() {
        const { navigation } = this.props;
        const initialValues: multi = {
            nameSurname: navigation.getParam("nameSurname"),
            monthlySalary: String(navigation.getParam("monthlySalary")),
            mail: "",
            password: "",
        }
        return (
            <View style={styles.addCustomerContainer}>
                <StatusBar backgroundColor="#2B6EDC" />
                <HeaderLeft
                    title="Çalışan Düzenle"
                    leftButtonPress={() => this.props.navigation.navigate("Employee")}
                />
                <View style={{ marginBottom: 30 }}></View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView bounces={false}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={girdiler}
                            onSubmit={values => this.handleEditEmployee(values)}
                        >
                            {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
                                return (
                                    <View>
                                        <View style={styles.inputContainer}>
                                            <Input
                                                style={styles.input}
                                                placeholder="Adı Soyadı"
                                                placeholderTextColor="#9A9A9A"
                                                value={values.nameSurname}
                                                autoCapitalize="words"
                                                onChangeText={handleChange("nameSurname")}
                                                onBlur={handleBlur("nameSurname")}
                                            />
                                            <Text style={styles.errorText}>{errors.nameSurname}</Text>
                                            <View style={styles.inputFiyatContainer}>
                                                <View style={{ flex: 8 }}>
                                                    <Input
                                                        style={styles.inputFiyat}
                                                        placeholder="Maaş"
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.monthlySalary}
                                                        autoCapitalize="none"
                                                        keyboardType="numeric"
                                                        onChangeText={handleChange("monthlySalary")}
                                                        onBlur={handleBlur("monthlySalary")}
                                                    />
                                                </View>

                                                <Text style={styles.inputFiyatText}>TL</Text>
                                            </View>
                                            <Text style={styles.errorText}>{errors.monthlySalary}</Text>
                                            <View style={styles.userAddContiner}>
                                                <Text style={styles.addUserInfoText}>İsteğe Bağlı Alan(Çalışanın İçin Düzenlenebilir)</Text>
                                                <Input
                                                    style={styles.input}
                                                    placeholder="E-posta(bağlı değil)"
                                                    placeholderTextColor="#9A9A9A"
                                                    value={values.mail}
                                                    autoCapitalize="words"
                                                    keyboardType="email-address"
                                                    onChangeText={handleChange("mail")}
                                                    onBlur={handleBlur("mail")}
                                                />
                                                <Text style={styles.errorText}>{errors.mail}</Text>
                                                <Input
                                                    style={styles.input}
                                                    placeholder="Şifre(bağlı değil)"
                                                    placeholderTextColor="#9A9A9A"
                                                    value={values.password}
                                                    autoCapitalize="words"
                                                    onChangeText={handleChange("password")}
                                                    onBlur={handleBlur("password")}
                                                />
                                                <Text style={styles.errorText}>{errors.password}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.customerAddButton}
                                                onPress={handleSubmit}>
                                                <Text style={styles.CustomerAddButtonText}>Ekle</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }}
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isSuccees: state.addEmployee.isSuccess,
    EmployeeAddMessage: state.addEmployee.EmployeeAddMessage,
    isSucceesUser: state.addUser.isSuccess,
})

function bindToAction(dispatch: any) {
    return {
        employeeEdit: (employeeId:number,nameSurname: string, monthlySalary: number) =>
            dispatch(employeeEdit(employeeId,nameSurname, monthlySalary)),
        AddUser: (nameSurname: string, mail: string, password: string) =>
            dispatch(AddUser(nameSurname, mail, password)),
    };
}

export default connect(mapStateToProps, bindToAction)(addEmployee);