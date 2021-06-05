import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from 'react-native-root-toast';
import { formStyle } from "../../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangeName() {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            ( async () => {
                const response = await getMeApi( auth.token );
                response.name &&  await formik.setFieldValue('name', response.name);
                response.lastname && await formik.setFieldValue('lastname', response.lastname);
            })()
        }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {            
            try {
                setLoading(true);
                const response = await updateUserApi(auth, formData);
                if(response.statusCode) throw 'Error al actualizar los datos'
                navigation.goBack();
            } catch (error) {                
                Toast.show( error , {
                    position: Toast.positions.CENTER
                })
                setLoading(false);
            }
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre"
                onChangeText={(text) => formik.setFieldValue("name", text)}
                value={formik.values.name}
                error={formik.errors.name}
                style={formStyle.input}
            />
            <TextInput
                label="Apellidos"
                onChangeText={(text) => formik.setFieldValue("lastname", text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}
                style={formStyle.input}
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                disabled={Object.keys(formik.errors).length ? true : false}
                loading={ loading }
            >
                Cambiar nombre y apellidos
            </Button>
        </View>
    );
}

const initialValues = () => {
    return {
        name: "",
        lastname: "",
    };
};

const validationSchema = () => {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    };
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
