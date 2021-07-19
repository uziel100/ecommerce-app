import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { map } from "lodash";
import colors from "../../styles/colors";
import { API_URL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function ListCategory({ categories }) {
    const navigation = useNavigation();

    const goToProducsByCategory = (category) => {
        navigation.push("category", {
            idCategory: category._id,
            title: category.title,
            imgUrl: category.cover.url,
        });
    };
    return (
        <View style={styles.containerCategory}>
            {map(categories, (item) => (
                <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => goToProducsByCategory(item)}
                    key={item._id}
                >
                    <View>
                        <Image
                            style={styles.categoryCover}
                            source={{ uri: `${API_URL}${item.cover.url}` }}
                        />
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    containerCategory: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    categoryItem: {
        flexBasis: "49%",
        marginBottom: 10,
        height: 120,
        position: "relative",
    },
    categoryCover: {
        height: "100%",
        resizeMode: "cover",
    },
    containerTitle: {
        width: "100%",
        backgroundColor: colors.fontLight,
        position: "absolute",
        bottom: 0,
        paddingLeft: 5,
    },
    title: {
        fontSize: 13,
        color: "#555",
    },
});
