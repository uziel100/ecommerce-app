import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Quantity({quantity, setQuantity}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState( 1 );
    return (
        
            <DropDownPicker
                items={[
                    {
                        label: '1',
                        value: 1
                    },
                    {
                        label: '2',
                        value: 2
                    },
                    {
                        label: '3',
                        value: 3
                    }
                ]}            
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
        backgroundColor:  '#fafafa',
        zIndex: 2
    },
    labelStyle:{
        color: '#000'
    }
})
