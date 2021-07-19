import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as Yup from 'yup';
import { useFormik  } from "formik";
import Toast from "react-native-root-toast";
import { formStyle } from "../../styles";
import { loginApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";



export default function FormRegister({ changeForm }) {
   
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState( true )
    const { login } = useAuth();
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:  Yup.object( validationSchema() ),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await loginApi(formData)                
                if( response.statusCode) throw "Usuario o contraseña incorrecto";    
                login( response )
            } catch (error) {                                
                Toast.show( error , {
                    position: Toast.positions.CENTER
                });
                setLoading(false);
            }
        }
    })

    return (
        <View>
            <TextInput 
                label="Email o username" 
                style={formStyle.input} 
                onChangeText={ text => formik.setFieldValue('identifier', text) }
                value={ formik.values.identifier }
                error={ formik.errors.identifier }
            />            
            <TextInput
                label="Contraseña"
                style={formStyle.input}
                right={
                    <TextInput.Icon
                        name={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                secureTextEntry={showPassword}
                onChangeText={ text => formik.setFieldValue('password', text) }
                value={ formik.values.password }
                error={ formik.errors.password }
            />            
            <Button mode="contained" 
                style={formStyle.btnSuccess}
                onPress={ formik.handleSubmit }
                disabled={ Object.keys(formik.errors).length > 0? true : false }
                loading={ loading }
            >  
                Iniciar sesión
            </Button>
            <Button
                mode="text"
                labelStyle={formStyle.btnTextLabel}
                style={formStyle.btnText}
                onPress={ changeForm }
            >
                Registrarse
            </Button>
        </View>
    );
}

const initialValues = () => {
    return{
        identifier: '',
        password: ''
    }
}

const validationSchema = () => {
    return{
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}