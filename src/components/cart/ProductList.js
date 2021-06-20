import { map, size } from "lodash";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getProductApi } from "../../api/product";
import ScreenLoading from "../../components/ScreenLoading";
import Product from "./Product";

export default function ProductList({
    cart,
    products,
    setProducts,
    setReloadCart,
    setTotalPayment
}) {


    useEffect(() => {
        (async () => {
            setProducts(null)
            setTotalPayment(null);
            const tempProducts = [];
            let totalPaymentTemp = 0;

            for await (const product of cart) {
                const response = await getProductApi(product.idProduct);
                response.quantity = product.quantity;
                tempProducts.push(response);                
                totalPaymentTemp +=  calcPrice(response.price, response.discount) * response.quantity;
            }
            setProducts(tempProducts);
            setTotalPayment( totalPaymentTemp.toFixed(2) )
        })();
    }, [cart]);

    const calcPrice = (price, discount) => {
        if (!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    };

    return (
        <View>
            <Text style={styles.title}>Listado:</Text>
            {!products ? (
                <ScreenLoading title="Cargando carrito" size="large" />
            ) : (
                map(products, (product) => (
                    <Product
                        key={product._id}
                        product={product}
                        setReloadCart={setReloadCart}
                    />
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
