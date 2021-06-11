import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function Favorite({ product }) {
    const addFavorite = ( ) => {
        console.log('prodcut añadido a laista de favoritos')
        console.log( product.title );
    }
    return (
        <View style={ { zIndex: 1 } } >
            <Button mode="contained" 
                contentStyle={ styles.btnAddFavoriteContent }
                labelStyle={ styles.btnLabel }
                style={ styles.btn }
                onPress={ addFavorite }
            >Añadir a favoritos</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnLabel:{
        fontSize: 15
    },
    btnAddFavoriteContent:{
        backgroundColor: '#c92c17',
        padding: 5
    },
    btn:{
        marginTop: 20
    }
})
