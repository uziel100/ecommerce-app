import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Price({ price, discount = 12 }) {

    const calcPrice = ( price, discount ) => {
        if( !discount ) return price;

        const discountAmount = ( price * discount ) / 100;
        return ( price - discountAmount ).toFixed(2)
    }

    return (
        <View>
            {
                discount &&
                <View style={ styles.containerData } >
                    <Text style={ styles.dataText } >Precio recomendado</Text>
                    <Text style={ [styles.dataValue, styles.oldPrice] }>$ { price } MX</Text>
                </View>
            }

            <View style={ styles.containerData } >
                <Text style={ styles.dataText } >Precio:</Text>
                <Text style={[ styles.dataValue, styles.currentPrice ]} >$ { calcPrice(price, discount) }</Text>
                
            </View>

            {
                discount &&
                <View style={ styles.containerData } >
                    <Text style={ styles.dataText } >Ahorras</Text>
                    <Text style={ [styles.dataValue, styles.saving] }>$ { (( price * discount ) / 100).toFixed(2) } ({ discount }%)</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerData:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    dataText:{
        width: '45%',
        fontSize: 16,
        color: '#747474',
        textAlign: 'right'
    },
    dataValue:{
        width: '55%',
        fontSize: 18,
        paddingLeft: 5
    },
    oldPrice:{
        textDecorationLine: 'line-through'
    },
    currentPrice:{
        fontSize: 20,
        color: '#bc0e0d',                
    },
    saving:{
        color: '#bc0e0d'
    }
})

