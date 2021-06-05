import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getMeApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import Search from "../../components/Search";
import StatusBarCustom from "../../components/StatusBar";
import colors from "../../styles/colors";
import ScreenLoading from "../../components/ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";

export default function Account() {
    const [user, setUser] = useState(null)
    const { auth } = useAuth();
    
    useFocusEffect(        
        useCallback(() => {
            (async () => {                
                const response = await getMeApi(auth.token);                
                setUser( response )
            })();
        }, [])
    );

    return (
        <>
            <StatusBarCustom
                backgroundColor={colors.bgDark}
                barStyle="light-content"
            />
            {
                !user ?
                <ScreenLoading size={38} />
                :
                <>
                    <Search />
                    <ScrollView>
                        <UserInfo user={ user } />
                        <Menu />
                    </ScrollView>
                </>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
