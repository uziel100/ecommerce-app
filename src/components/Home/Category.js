import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ListCategory from './ListCategory'
import { getCategoryApi } from '../../api/category'

export default function Category() {
    const [categories, setCategories] = useState(null)

    useEffect( () => {
        ( async () => {
            const res = await getCategoryApi();
            setCategories( res )
        })()
    },[])

    if(!categories) return null;

    return (
        <View style={ styles.container } >
            <Text style={ styles.title } >Categorias</Text>
            <ListCategory categories={ categories } />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,   
        marginBottom: 10     
    }
})

