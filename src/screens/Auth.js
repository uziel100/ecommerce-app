import React, { useState } from "react";
import {
    Image,
    StyleSheet,    
    View,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { layoutStyle } from "../styles";
import logo from "../../assets/logo.png";
import FormRegister from "../components/Auth/FormRegister";
import FormLogin from "../components/Auth/FormLogin";

export const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);
    const changeForm = () => setShowLogin( !showLogin )
    return (
        <View style={[layoutStyle.container, styles.container]}>
            <KeyboardAvoidingView
                style={layoutStyle.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Image style={styles.logo} source={logo} />
                {showLogin ? <FormLogin changeForm={ changeForm }  /> : <FormRegister changeForm={ changeForm }  />}
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 80,
        resizeMode: "contain",
        marginBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#f1f2f7'
    },
});
