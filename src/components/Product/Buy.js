import React from 'react'
import Toast from 'react-native-root-toast'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { addProductCartApi } from '../../api/cart'

export default function Buy({ product, quantity }) {

    const addProductCart = async () => {        
        const addedProduct =  await addProductCartApi( product._id, quantity )
        if( addedProduct ){            
            Toast.show('Producto añadido al carrito', {
                position: Toast.positions.CENTER
            })
        }else{
            Toast.show('Error al añadir al carrito', {
                position: Toast.positions.CENTER
            })
        }
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
        backgroundColor: '#2b9aef',
        paddingVertical: 5
    },
    btnLabel:{
        fontSize: 15
    },
    btn:{
        marginTop: 30
    }
})

