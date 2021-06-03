import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Toast from 'react-native-root-toast'
import { formStyle } from "../../styles";
import { registerApi } from "../../api/user";

export default function FormRegister({ changeForm }) {

    const [loading, setLoading] = useState(false)

    const formik = useFormik( {
        initialValues: initialValues(),
        validationSchema: Yup.object( validationSchema() ),
        onSubmit: async ( formData ) => {
            setLoading(true);
            try {
                await registerApi( formData );
                changeForm();
            } catch (error) {
                setLoading(false)
                Toast.show('Ha ocurrido un error al registrar',{
                    position: Toast.positions.CENTER
                })                
            }
        }
    })


    return (
        <View>
            <TextInput 
                label="Email" 
                style={formStyle.input} 
                onChangeText={ ( text ) => formik.setFieldValue('email', text) }
                value={ formik.values.email }
                error={ formik.errors.email }
            />
            <TextInput 
                label="Nombre del usuario" 
                style={formStyle.input} 
                onChangeText={ ( text ) => formik.setFieldValue('username', text) }
                value={ formik.values.username }
                error={ formik.errors.username }
            />
            <TextInput
                label="Contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={ ( text ) => formik.setFieldValue('password', text) }
                value={ formik.values.password }
                error={ formik.errors.password }
            />
            <TextInput
                label="Repetir contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={ ( text ) => formik.setFieldValue('matchPassword', text) }
                value={ formik.values.matchPassword }
                error={ formik.errors.matchPassword }
            />

            <Button 
                mode="contained" 
                style={formStyle.btnSuccess}
                onPress={ formik.handleSubmit }
                loading={ loading }
            >
                Registrarse
            </Button>
            <Button
                mode="text"
                labelStyle={formStyle.btnTextLabel}
                style={formStyle.btnText}
                onPress={ changeForm }
            >
                Iniciar sesión
            </Button>
        </View>
    );
}

const initialValues = () => {
    return{
        email: '',
        username: '',
        password: '',
        matchPassword: ''
    }
}
const validationSchema = () => {
    return{
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        matchPassword: Yup.string().required(true).oneOf( [Yup.ref('password')], true )

    }
}
