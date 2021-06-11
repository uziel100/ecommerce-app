import React, {  useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { getProductApi } from '../../api/product'
import Search from '../../components/Search'
import StatusBarCustom from '../../components/StatusBar'
import ScreenLoading from '../../components/ScreenLoading'

import colors from '../../styles/colors'
import CarouselImages from '../../components/Product/CarouselImages'
import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import Buy from '../../components/Product/Buy'
import Favorite from '../../components/Product/Favorite'

export default function Product({ route:{ params }  }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        ( async ()=> {
            const response = await getProductApi( params.idProduct );
            const product = { ...response, images: [ response.main_image, ...response.images ] }
            setProduct( product )
        })()
    }, [params])    

    return (
        <>
            <StatusBarCustom backgroundColor={ colors.bgDark } />
            <Search />
            {
                !product
                    ? <ScreenLoading title="Cargando producto..." size="large" />
                    :<ScrollView style={ styles.container }>
                        <Text style={ styles.title } >{ product.title }</Text>
                        <CarouselImages images={ product.images } />
                        <View style={ styles.containerView } >
                            <Price price={ product.price } discount={ product.discount } />
                            <Quantity quantity={ quantity } setQuantity={ setQuantity }  />
                            <Buy product={ product } quantity={ quantity } />
                            <Favorite product={ product } />
                        </View>
                    </ScrollView>  
            }
        </>
    )
}

const styles = StyleSheet.create({
    container:{        
        paddingBottom: 50
    },
    containerView:{
        padding: 20,
        marginBottom: 200
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        padding: 20,
    }    
})
