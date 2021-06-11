import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import StatusBar from '../../components/StatusBar'
import Search from '../../components/Search/index'
import colors from '../../styles/colors'
import NewProducts from '../../components/Home/NewProducts'

export default function Home() {
    return (
        <>
            <StatusBar backgroundColor={ colors.bgDark } barStyle="light-content" />            
            <Search />
            <ScrollView>
                {/* banner */}
                {/* new product */}
                <NewProducts />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'       
    }
})
