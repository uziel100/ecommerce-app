import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Quantity({quantity, setQuantity, quantityMax}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState( quantity );
    const [itemQuantity, setItemQuantity] = useState([]);

    useEffect(() => {
        const values = getValuesQuantityForSelect( quantityMax )
        setItemQuantity( values )
    }, [])

    const getValuesQuantityForSelect = ( val ) => {
        let temp = [];
        for (let index = 1; index <= val; index++) {                    
            temp.push({
                label: `${ index }`,
                value: index
            })
        }
        return temp;
    }

    return (
        <DropDownPicker
            items={itemQuantity}            
            containerStyle={ styles.containerStyle }
            value={ value } 
            setValue={ setValue }                                                                        
            open={open}                        
            setOpen={setOpen}
            dropDownContainerStyle={ styles.dropDownPicker }
            dropDownDirection='BOTTOM'
            style={ styles.dropDownPicker }
            labelStyle={ styles.labelStyle }
            onChangeValue={ val  => setQuantity(val) }
            
        />
    )
}

const styles = StyleSheet.create({
    containerStyle:{
        height: 40,
        width: 100
    },
    dropDownPicker: {
        backgroundColor:  '#fafafa'
    },
    labelStyle:{
        color: '#000'
    }
})
