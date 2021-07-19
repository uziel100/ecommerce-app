import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getOrdersByIdPaymentApi } from "../../api/order";
import ListOrder from "../../components/Order/ListOrder";
import ScreenLoading from "../../components/ScreenLoading";
import useAuth from "../../hooks/useAuth";

export default function TrackOrderDetail({ route: { params } }) {
    const { idpayment, trackId, status, address } = params;
    const { auth } = useAuth();
    const [order, setOrder] = useState(null);
    const [statusOrden, setStatusOrden] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getOrdersByIdPaymentApi(auth, idpayment);
            setOrder(data);
            console.log(data)
            setStatusOrden(getStatusLabel(status));
        })();
    }, []);

    const getStatusLabel = (statusOrder) => {
        const codeStatus = {
            Pedido_confirmado: {
                color: "#FF0000",
                text: "Pedido confirmado",
            },
            Proceso_de_empaquetado: {
                color: "#FF7F00",
                text: "Proceso de empaquetado",
            },
            En_camino: {
                color: "#008080",
                text: "En camino",
            },
            Cerca_del_domicilio: {
                color: "#FFFF00",
                text: "Cerca del domicilio",
            },
            Producto_entregado: {
                color: "#00FF00",
                text: "Entregado",
            },
        };
        console.log(codeStatus[statusOrder]);
        return codeStatus[statusOrder];
    };

    const formatDate = (date) => {
        const splitDate = date.split('/');
        return `${ splitDate[1] }/${ splitDate[0] }/${ splitDate[2] }`
    }

    if (!order) return(
        <ScreenLoading  size="large" />
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleSection}>Ver detalles del pedido</Text>
            <View style={styles.containerSection}>
                <View style={[styles.flexRow]}>
                    <Text style={styles.textItem}>Fecha de pedido: </Text>
                    <Text style={styles.textValue}>                        
                        { formatDate(new Date(order[0].createdAt).toLocaleDateString()) }
                    </Text>
                </View>
                <View style={[styles.flexRow]}>
                    <Text style={styles.textItem}>N° de rastreo: </Text>
                    <Text style={styles.textValue}>{trackId}</Text>
                </View>
                <View style={[styles.flexRow]}>
                    <Text style={styles.textItem}>Total del pedido: </Text>
                    <Text style={styles.textValue}>
                        $ { Math.ceil(order[0].totalPayment) }
                    </Text>
                </View>
            </View>
            <Text style={styles.subTitleSection}>Detalles de envio</Text>
            <View style={styles.containerSection}>
                <View style={[styles.flexRow]}>
                    <Text style={styles.textItem}>Estado del envio: </Text>
                    <View style={styles.flexRow}>
                        <View
                            style={{
                                ...styles.circle,
                                backgroundColor: statusOrden?.color,
                            }}
                        ></View>
                        <Text style={styles.textValue}>
                            {statusOrden?.text}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.containerSection}>
                <ListOrder orders={order} />
            </View>
            <Text style={styles.subTitleSection}>Dirección de envio</Text>
            <View style={{...styles.containerSection, marginBottom: 40}}>
                    <Text style={styles.title}>{address.title}</Text>
                    <Text>{address.name_lastname}</Text>
                    <Text>{address.address}</Text>
                    <View style={styles.blockLine}>
                        <Text>{address.state}, </Text>
                        <Text>{address.city}, </Text>
                        <Text>{address.postal_code}</Text>
                    </View>
                    <Text>{address.country}</Text>
                    <Text>Numero de telefono: {address.phone}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 100
    },
    containerSection: {
        borderColor: "#999",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    titleSection: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    subTitleSection: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 15,
        marginTop: 10,
    },
    flexRow: {
        flexDirection: "row",
        marginBottom: 5,
        alignItems: "center",
    },
    textItem: {
        color: "#555",
        fontSize: 14,
        marginRight: 10,
    },
    textValue: {
        color: "#000",
        fontSize: 14,
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 15,
        marginRight: 10,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5,
    },
    blockLine: {
        flexDirection: "row",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
});
