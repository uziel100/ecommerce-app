import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { getProductApi } from "../../api/product";
import Search from "../../components/Search";
import StatusBarCustom from "../../components/StatusBar";
import ScreenLoading from "../../components/ScreenLoading";
import colors from "../../styles/colors";
import CarouselImages from "../../components/Product/CarouselImages";
import Price from "../../components/Product/Price";
import Quantity from "../../components/Product/Quantity";
import Buy from "../../components/Product/Buy";
import Favorite from "../../components/Product/Favorite";
import Stock from "../../components/Product/Stock";
import Markdown from "react-native-markdown-text";
import { API_URL } from "../../utils/constants";

export default function Product({ route: { params } }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        (async () => {
            const response = await getProductApi(params.idProduct);
            const product = {
                ...response,
                images: [response.main_image, ...response.images],
            };
            setProduct(product);
        })();
    }, [params]);

    return (
        <>
            <StatusBarCustom
                backgroundColor={colors.bgSearch}
                barStyle="light-content"
            />
            <Search />
            {!product ? (
                <ScreenLoading title="Cargando producto..." size="large" />
            ) : (
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{product.title}</Text>
                    <CarouselImages images={product.images} />
                    <View style={styles.containerView}>
                        <Price
                            price={product.price}
                            discount={product.discount}
                        />
                        <Stock quantity={product.stock} />
                        {product.stock > 0 && (
                            <Quantity
                                quantity={quantity}
                                quantityMax={product.quantity_max}
                                setQuantity={setQuantity}
                            />
                        )}
                        {product.stock > 0 && (
                            <Buy product={product} quantity={quantity} />
                        )}

                        <Favorite product={product} />
                        <Markdown                        
                            styles={{
                                heading2: {
                                    fontSize: 18,                                                                        
                                    marginVertical: 15,
                                    fontWeight: "bold",
                                },
                                strong: {
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            {product.description}
                        </Markdown>
                    </View>
                </ScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
    },
    containerView: {
        padding: 20,
        marginBottom: 200,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        padding: 20,
    },
});
