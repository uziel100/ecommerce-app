import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { getHomeBannerApi } from '../../api/home-banner';
import { API_URL } from '../../utils/constants';


const width = Dimensions.get('window').width;
const height = 170;

export default function Banner( ) {

    const [bannerActive, setBannerActive] = useState(0)
    const [banners, setBanners] = useState(null)

    const navigation = useNavigation();

    useEffect(() => {
        ( async()=> {
            const response = await getHomeBannerApi();
            setBanners( response )
        })()
    }, [])

    if(!banners) return null;

    const goToProduct = ( idProduct ) => {
        navigation.push('product-detail', { idProduct })
    }
    
    const renderItem = ({ item }) => {
        return(
            <TouchableWithoutFeedback
                onPress={ () => goToProduct( item.product._id ) }
            >
                <Image 
                    source={ { uri: `${ API_URL }${ item.banner.url }` } }
                    style={ styles.carousel } 
                />
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={ styles.container } >        
            <Carousel 
                layout={ 'default'}
                sliderWidth={ width }
                itemWidth={ width }
                data={ banners }
                renderItem={ renderItem }
                onSnapToItem={ index => setBannerActive( index ) }
            />
            <Pagination 
                dotsLength={ banners.length }
                activeDotIndex={ bannerActive }                 
                inactiveDotOpacity={ 0.4 }
                inactiveDotScale={ 0.6 }
                containerStyle={ styles.dotsContainerStyle }
                dotStyle={ styles.dot }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'relative'
    },
    carousel: {
        width,
        height,
        resizeMode: 'contain',
        borderWidth: 1                
    },
    dotsContainerStyle:{
        position: 'absolute',
        bottom: -20,        
        width: '100%',        
    },
    dot: {
        backgroundColor: '#554'
    }
})