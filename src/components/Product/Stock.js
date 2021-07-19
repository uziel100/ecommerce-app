import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Stock({ quantity }) {
    return (
        <View style={styles.containerData}>
            <Text style={styles.dataText}>Stock:</Text>
            {
                (quantity == 0)
                    ? <Text style={[styles.dataValue ,styles.dataEmpty]}>Agotado</Text>            
                    : <Text style={styles.dataValue}>{quantity} disponibles</Text>            
            }
        </View>
    );
}
const styles = StyleSheet.create({
    containerData: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        marginBottom: 10,
    },
    dataText: {
        width: "45%",
        fontSize: 16,
        color: "#747474",
        textAlign: "right",
    },
    dataValue: {
        width: "55%",
        fontSize: 16,
        paddingLeft: 5,
    },
    dataEmpty:{
        color: '#bc0e0d',  
    }
});
