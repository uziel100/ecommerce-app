import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getProductsByCategoryApi } from "../../api/category";
import ListProduct from "../../components/Home/ListProduct";
import { API_URL } from "../../utils/constants";
import ScreenLoading from "../../components/ScreenLoading";

export default function Category({ route: { params } }) {
    const { idCategory, imgUrl, title } = params;

    const navigation = useNavigation();

    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {            
            navigation.setOptions({ title });
            if(!products){
                const response = await getProductsByCategoryApi(idCategory);
                setProducts(response);
            }
        })();
    }, []);

    return (
        <View>
            <Image style={styles.img} source={{ uri: `${API_URL}${imgUrl}` }} />
            
                {!products ? (
                    <View style={{ marginTop: 100 }} >
                        <ScreenLoading title="Obteniendo productos" size="large" />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.title}>Productos</Text>
                        <ListProduct products={products} />
                    </View> 
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    img: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,        
    },
});
