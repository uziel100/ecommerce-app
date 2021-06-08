import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-root-toast'
import { Button, TextInput } from "react-native-paper";
import { formStyle } from "../../styles";
import { addAddressApi, getOneAddressApi, updateAddressApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function AddAddress( {  route: { params }  } ) {
   
    const [loading, setLoading] = useState(false)
    const [newAddress, setNewAddress] = useState(true)
    const { auth  } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        ( async () => {
            if(params?.idAddress){
                setNewAddress(false);
                navigation.setOptions({ title: 'Actualizar dirección' });
                const response = await getOneAddressApi(auth, params.idAddress );
                formik.setFieldValue('_id', response._id);
                formik.setFieldValue('title', response.title);
                formik.setFieldValue('state', response.state);
                formik.setFieldValue('postal_code', response.postal_code);
                formik.setFieldValue('phone', response.phone);
                formik.setFieldValue('name_lastname', response.name_lastname);
                formik.setFieldValue('country', response.country);
                formik.setFieldValue('city', response.city);
                formik.setFieldValue('address', response.address);                
            }
        })()
    }, [params])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {            
            setLoading(true)
            try {
                if( newAddress ){
                    const response = await addAddressApi(auth, {...formData, user: auth.idUser});                
                    if(response.statusCode) throw "No se puedo agregar la dirección" ;                
                }else{                    
                    await updateAddressApi(auth, formData);
                }
                navigation.goBack()
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                } )
                setLoading(false);
            }
        },
    });
    return (
        <KeyboardAwareScrollView extraHeight={25}>
            <View style={styles.container}>
                <Text style={styles.title}>Nueva dirección</Text>
                <TextInput
                    label="Titulo"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("title", text)}
                    value={ formik.values.title }
                    error={ formik.errors.title }
                />
                <TextInput
                    label="Nombre y apellido"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("name_lastname", text)}
                    value={ formik.values.name_lastname}
                    error={ formik.errors.name_lastname }
                />
                <TextInput
                    label="Dirección"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("address", text)}
                    value={ formik.values.address}
                    error={ formik.errors.address }
                />
                <TextInput
                    label="Codigo postal"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("postal_code", text)}
                    value={ formik.values.postal_code}
                    error={ formik.errors.postal_code }
                />
                <TextInput
                    label="Ciudad"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("city", text)}
                    value={ formik.values.city}
                    error={ formik.errors.city }
                />
                <TextInput
                    label="Estado"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("state", text)}
                    value={ formik.values.state}
                    error={ formik.errors.state }
                />
                <TextInput
                    label="Pais"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("country", text)}
                    value={ formik.values.country}
                    error={ formik.errors.country }
                />
                <TextInput
                    label="Telefono"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("phone", text)}
                    value={ formik.values.phone}
                    error={ formik.errors.phone }
                />

                <Button
                    mode="contained"
                    style={[formStyle.btnSuccess, styles.btnSuccess]}
                    onPress={ formik.handleSubmit }
                    loading={ loading }
                >                    
                    { newAddress? 'Crear dirección' : 'Actualizar dirección' }
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
}

const initialValues = () => {
    return {
        title: "",
        name_lastname: "",
        address: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    };
};

const validationSchema = () => {
    return {
        title: Yup.string().required(true),
        name_lastname: Yup.string().required(true),
        address: Yup.string().required(true),
        postal_code: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        country: Yup.string().required(true),
        phone: Yup.string().min(10, true).max(10, true).required(true),
    };
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
    },
    btnSuccess: {
        marginBottom: 20,
    },
});
