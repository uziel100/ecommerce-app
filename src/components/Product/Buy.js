import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function Buy({ product, quantity }) {

    const addProductCart = () => {
        console.log('añadir producto al carrito')
        console.log(product.title);
        console.log(quantity);
    }

    return (
        <View style={ { zIndex: 1 } } >
            <Button mode="contained"
                contentStyle={ styles.btnBuyContent }
                labelStyle={ styles.btnLabel }
                style={ styles.btn }
                onPress={ () => addProductCart() }
             >Añadir a la cesta</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBuyContent: {    
        backgroundColor: '#008fe9',
        paddingVertical: 5
    },
    btnLabel:{
        fontSize: 15
    },
    btn:{
        marginTop: 30
    }
})

