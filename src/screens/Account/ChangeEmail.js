import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import Toast from 'react-native-root-toast';
import { Button, TextInput } from "react-native-paper";
import { formStyle } from "../../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangeEmail() {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                formik.setFieldValue("email", response.email);
            })();
        }, [])
    );

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email(true).required(true),
        }),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                if(response.statusCode) throw 'Email ya existe';
                
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError('email', true)
                setLoading(false);
            }
        },
    });
    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
                style={formStyle.input}
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                disabled={Object.keys(formik.errors).length ? true : false}
                loading={loading}
            >
                Cambiar email
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
