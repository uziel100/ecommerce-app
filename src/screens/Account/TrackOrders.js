import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { getOrdenStatusApi } from "../../api/orderstatus";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { useCallback } from "react/cjs/react.development";
import { map } from "lodash";
import { IconButton } from "react-native-paper";
import ScreenLoading from "../../components/ScreenLoading";

export default function TrackOrders() {
    const { auth } = useAuth();
    const [trackOrder, setTrackOrder] = useState(null);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setTrackOrder(null);
            (async () => {
                const response = await getOrdenStatusApi(auth);                
                setTrackOrder(response);
            })();
        }, [])
    );

    const formatDate = (date) => {
        const splitDate = date.split('/');
        return `${ splitDate[1] }/${ splitDate[0] }/${ splitDate[2] }`
    }
    
    if(!trackOrder) return(
        <ScreenLoading title="Cargando lista..." size="large" />
    )

    return (
        <View style={styles.container}>
            <ScrollView>
                {map(trackOrder, (item) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            navigation.navigate("track-detail", {
                                idpayment: item.idpayment,
                                trackId: item._id,
                                status: item.status,
                                address: item.address
                            });
                        }}
                        style={ { marginBottom: 15 } }
                    >
                        <View style={styles.containerItem}>
                            <View>
                                <Text
                                    style={[styles.textCenter, styles.textItem]}
                                >
                                    Código de rastreo
                                </Text>
                                <Text
                                    style={[
                                        styles.textCenter,
                                        styles.textValue,
                                    ]}
                                >
                                    {item._id}
                                </Text>
                                <Text
                                    style={[styles.textCenter, styles.textItem]}
                                >
                                    Fecha de pedido
                                </Text>
                                <Text
                                    style={[
                                        styles.textCenter,
                                        styles.textValue,
                                    ]}
                                >
                                    { formatDate(new Date(item.createdAt).toLocaleDateString()) }                                     
                                </Text>
                                <View style={styles.containerStatus}>
                                    <View
                                        style={{
                                            ...styles.circle,
                                            backgroundColor:
                                                item.status ===
                                                "Producto_entregado"
                                                    ? "#00FF00"
                                                    : "#FF0000",
                                        }}
                                    ></View>
                                    <Text>
                                        {item.status === "Producto_entregado"
                                            ? "Producto entregado"
                                            : "En proceso de entrega"}
                                    </Text>
                                </View>
                            </View>
                            <IconButton
                                icon="arrow-right"
                                color="#000"
                                size={18}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    containerItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#999",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    textCenter: {
        textAlign: "left",
    },
    textItem: {
        color: "#555",
        fontSize: 13,
        marginTop: 5,
    },
    textValue: {
        fontSize: 16,
        fontWeight: "bold",
    },
    containerStatus: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 15,
        marginRight: 10,
    },
});
