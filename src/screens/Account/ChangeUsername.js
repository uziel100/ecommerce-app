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

export default function ChangeUsername() {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                formik.setFieldValue("username", response.username);
            })();
        }, [])
    );

    const formik = useFormik({
        initialValues: { username: "" },
        validationSchema: Yup.object({
            username: Yup.string().required(true),
        }),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                if(response.statusCode) throw 'El nombre de usuario ya existe';
                
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError('username', true)
                setLoading(false);
            }
        },
    });
    return (
        <View style={styles.container}>
            <TextInput
                label="Username"
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
                style={formStyle.input}
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                disabled={Object.keys(formik.errors).length ? true : false}
                loading={loading}
            >
                Cambiar username
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
