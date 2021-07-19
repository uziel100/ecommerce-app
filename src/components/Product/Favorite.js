import { size } from 'lodash-es';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { addFavoriteApi, deleteFavoriteApi, isFavoriteApi } from '../../api/favorite';
import useAuth from "../../hooks/useAuth";
import colors from '../../styles/colors'

export default function Favorite({ product }) {

    const { auth } = useAuth();
    const [isFavorite, setIsFavorite] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        ( async () => {
            const response = await isFavoriteApi(auth, product._id)
            if( size( response ) === 0){
                setIsFavorite(false);
            }else{
                setIsFavorite(true);
            }
        })()
    }, [])

    const addFavorite = async ( ) => {
        if(!loading){
            setLoading(true)
            try {
                await addFavoriteApi(auth, product._id )
                setIsFavorite(true)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
    }

    const deleteFavorite = async ( ) => {
        if(!loading){
            setLoading(true)
            try {
                await deleteFavoriteApi(auth, product._id )
                setIsFavorite(false)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
    }


    if(isFavorite === null) return null;

    return (
        <View style={ { zIndex: 1 } } >
            <Button mode="contained" 
                contentStyle={ isFavorite? styles.btnDeleteFavoriteContent : styles.btnAddFavoriteContent }
                labelStyle={ styles.btnLabel }
                style={ styles.btn }
                onPress={ isFavorite? deleteFavorite : addFavorite }
                loading={ loading }
            >
                {
                    isFavorite
                        ? "Eliminar de favoritos"
                        : "Añadir a favoritos"
                }                
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnLabel:{
        fontSize: 15
    },
    btnAddFavoriteContent:{
        backgroundColor: colors.secondary,
        padding: 5
    },
    btnDeleteFavoriteContent:{
        backgroundColor: colors.danger,
        padding: 5
    },    
    btn:{
        marginTop: 20
    }
})
