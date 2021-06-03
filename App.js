import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import jwtDecode from 'jwt-decode';
import { Provider as PaperProvider, Button } from "react-native-paper";
import { Auth as AuthScreen } from "./src/screens/Auth";

import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, delTokenApi } from "./src/api/token";
import { layoutStyle } from "./src/styles";


export default function App() {
    const [auth, setAuth] = useState(undefined);

    useEffect(() => {
        ( async () => {
            const token = await getTokenApi();
            if(token){                             
                setAuth({
                    token,
                    idUser:  jwtDecode( token ).id
                })
            }else{
                setAuth(null)
            }
        })()
    }, [])

    const login = (user) => {        
        setTokenApi( user.jwt );
        setAuth({
            token: user.jwt,
            idUser: user.user._id
        })
    }

    const logout = () => {
        if(auth){
            delTokenApi()
            setAuth(null);
        }
    }

    const authData = useMemo(() => ({
        auth,
        login,
        logout,
    }) , [auth]);

    if( auth === undefined ) return null;

    return (
        <AuthContext.Provider value={ authData } >
            <PaperProvider>
                {auth ? 
                <View style={ layoutStyle.container } >
                    <Text>Zona de usuarios</Text>
                    <Button onPress={ authData.logout } mode="outlined">Cerrar sesion</Button>
                </View> : <AuthScreen />}
            </PaperProvider>
        </AuthContext.Provider>
    );
}

