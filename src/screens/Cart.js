import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import StatusBarCustom from "../components/StatusBar";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../styles/colors";
import { getProductCartApi } from "../api/cart";
import { getAddressApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import { size } from "lodash";
import NotProducts from "../components/cart/NotProducts";
import Search from "../components/Search/Search";
import ProductList from "../components/cart/ProductList";
import AddressList from "../components/cart/AddressList";
import Payment from "../components/cart/Payment";
export default function Cart() {
    const { auth } = useAuth();

    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);

    useFocusEffect(
        useCallback(() => {
            setCart(null);
            setAddresses(null);
            setSelectedAddress(null);

            loadCart();
            loadAddress();
        }, [])
    );

    useEffect(() => {
        if (reloadCart) {
            loadCart();
            setReloadCart(false);
        }
    }, [reloadCart]);

    const loadCart = async () => {
        const response = await getProductCartApi();
        setCart(response);
    };

    const loadAddress = async () => {
        const response = await getAddressApi(auth);
        setAddresses(response);
    };

    return (
        <>
            <StatusBarCustom
                backgroundColor={colors.bgSearch}
                barStyle="light-content"
            />
            {!cart || size(cart) === 0 ? (
                <>
                    <Search />
                    <NotProducts />
                </>
            ) : (
                <KeyboardAwareScrollView extraScrollHeight={25}>
                    <ScrollView style={styles.cartContainer}>
                        <ProductList
                            cart={cart}
                            products={products}
                            setProducts={setProducts}
                            setReloadCart={setReloadCart}
                            setTotalPayment={setTotalPayment}
                        />
                        <AddressList
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />
                        <Payment
                            selectedAddress={selectedAddress}
                            products={products}
                            totalPayment={totalPayment}
                        />
                    </ScrollView>
                </KeyboardAwareScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    cartContainer: {
        padding: 20,
    },
    reload: {
        backgroundColor: "#000",
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.3,
        alignItems: "center",
        justifyContent: "center",
    },
    reloadText: {
        marginTop: 10,
        color: "#fff",
    },
});
