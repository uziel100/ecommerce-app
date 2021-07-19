import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import StatusBarCustom  from "../components/StatusBar";
import Search from "../components/Search/Search";
import colors from "../styles/colors";
import { useFocusEffect } from "@react-navigation/native";
import { getFavoriteApi } from "../api/favorite";
import ScreenLoading from '../components/ScreenLoading'
import useAuth from "../hooks/useAuth";
import { size } from "lodash-es";
import FavoriteList from "../components/Favorites/FavoriteList";

export default function Favorites() {
    const { auth } = useAuth();

    const [products, setProducts] = useState(null);
    const [reloadFavorite, setReloadFavorite] = useState(false);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getFavoriteApi(auth);
                setProducts(response);
                setReloadFavorite(false);
            })();
        }, [reloadFavorite])
    );

    return (
        <>
            <StatusBarCustom 
            backgroundColor={colors.bgSearch}
            barStyle="light-content"
             />
            <Search />
            {!products ? (
                <ScreenLoading text="Cargando lista" size="large" />
            ) : size(products) === 0 ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Lista de favoritos</Text>
                    <Text>No tienes productos en tu lista</Text>
                </View>
            ) : (                
                <FavoriteList
                    products={products}
                    auth={auth}
                    setReloadFavorite={setReloadFavorite}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 5,
    },
});
