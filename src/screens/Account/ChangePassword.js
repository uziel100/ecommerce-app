import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { formStyle } from "../../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            try {
                setLoading(true);
                const response = await updateUserApi(auth, formData);
                if(response.statusCode) throw 'Error al cambiar la contraseña'
                navigation.goBack();
            } catch (error) {
                Toast.show( error, {
                    position: Toast.positions.CENTER,
                });
                setLoading(false);
            }
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                label="Contraseña"
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                style={formStyle.input}
                secureTextEntry
            />
            <TextInput
                label="Repetir contraseña"
                onChangeText={(text) =>
                    formik.setFieldValue("repeatPassword", text)
                }
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                style={formStyle.input}
                secureTextEntry
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                disabled={Object.keys(formik.errors).length ? true : false}
                loading={loading}
            >
                Cambiar contraseña
            </Button>
        </View>
    );
}

const initialValues = () => {
    return {
        password: "",
        repeatPassword: "",
    };
};

const validationSchema = () => {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string()
            .min(4, true)
            .required(true)
            .oneOf([Yup.ref("password")], true),
    };
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
