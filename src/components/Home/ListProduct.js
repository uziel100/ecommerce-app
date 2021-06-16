import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import { map } from "lodash";
import { API_URL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function ListProduct({ products }) {
    const navigation = useNavigation();

    const goToProduct = (idProduct) => {
        navigation.push("product-detail", { idProduct });
    };

    return (
        <View style={styles.container}>
            {map(products, (product) => (
                <TouchableWithoutFeedback
                    key={product._id}
                    onPress={() => goToProduct(product._id)}
                >
                    <View style={styles.containerProduct}>
                        <View style={styles.product}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${API_URL}${product.main_image.url}`,
                                }}
                            />
                            <Text
                                style={styles.name}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {product.title}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,        
    },
    containerProduct: {
        width: "50%",
        padding: 3,
    },
    product: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    image: {
        height: 150,
        resizeMode: "contain",
    },
    name: {
        marginVertical: 10,
        fontSize: 14,
        color: "#555",
    },
});
