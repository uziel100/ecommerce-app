import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getMeApi } from "../api/user";
import useAuth from "../hooks/useAuth";
import Search from "../components/Search";
import StatusBarCustom from "../components/StatusBar";
import colors from "../styles/colors";

export default function Account() {
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                console.log(response);
            })();
        }, [])
    );

    return (
        <>
            <StatusBarCustom
                backgroundColor={colors.bgDark}
                barStyle="light-content"
            />
            <Search />
            <ScrollView>
                <Text>Welcome to Account</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
