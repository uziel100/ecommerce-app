import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Carousel, { Pagination } from "react-native-snap-carousel";
import { API_URL } from '../../utils/constants';

const width = Dimensions.get('window').width;
const height = 400;

export default function CarouselImages({ images }) {    

    const [imageActive, setImageActive] = useState(0)

    const renderItem = ({ item }) => {
        return(
            <Image 
                source={ { uri: `${ API_URL }${ item.url }` } }
                style={ styles.carousel } 
            />
        )
    }
    return (
        <>
            <Carousel 
                layout={ 'default'}
                sliderWidth={ width }
                itemWidth={ width }
                data={ images }
                renderItem={ renderItem }
                onSnapToItem={ index => setImageActive( index ) }
            />            
            <Pagination 
                dotsLength={ images.length }
                activeDotIndex={ imageActive }                        
                inactiveDotOpacity={ 0.4 }
                inactiveDotScale={ 0.6 }
            />
        </>
    )
}

const styles = StyleSheet.create({
    carousel: {
        width,
        height,
        resizeMode: 'contain'
    }
})
