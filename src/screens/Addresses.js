import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native'
import { IconButton } from 'react-native-paper'
import { getAddressApi } from '../api/address'
import { size } from 'lodash'
import useAuth from '../hooks/useAuth'
import colors from '../styles/colors'
import AddressList from '../components/Address/AddressList'

export default function Addresses() {
    const [addresses, setAddresses] = useState(null)
    const [reloadAddress, setReloadAddress] = useState(false)
    const { auth } = useAuth();
    const navigation = useNavigation();
    useFocusEffect(
        useCallback( () => { 
            setAddresses(null);
            ( async () => {
                try {                    
                    const response = await getAddressApi( auth );                           
                    setAddresses( response );             
                } catch (error) {   
                    console.log(error)
                }
            })()
        }, [reloadAddress])
    )

    return (
        <ScrollView style={ styles.container }>
            <Text style={ styles.title }>Mis direccioenes </Text>
            <TouchableOpacity onPress={ () => navigation.navigate('add-address') }>
                <View style={ styles.addAddress }>
                    <Text>Añadir una dirección</Text>
                    <IconButton icon="arrow-right" color="#000" size={ 18 }  />
                </View>
            </TouchableOpacity>            
            {
                !addresses 
                ? <ActivityIndicator size="large" color={ colors.primary } style={ styles.loading } />
                : size( addresses ) === 0
                    ? <Text style={ styles.noAddressText }>Agrega tu primera dirección</Text>
                    : <AddressList
                    addresses={addresses} 
                    setReloadAddress={ setReloadAddress }                    
                  />
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 20,        
    },
    title: {
        fontSize: 20
    },
    addAddress:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },    
    addAddressText: {
        fontSize: 16
    },
    loading: {
        marginTop: 20
    },
    noAddressText:{
        fontSize: 15,
        marginTop: 15,
        textAlign: 'center'
    }
})
