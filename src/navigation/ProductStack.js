import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Product/Home'
import colors from '../styles/colors'
import Product from '../screens/Product/Product';

const Stack = createStackNavigator();

export default function ProductStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.bgLight,
                headerStyle: {
                    backgroundColor: colors.bgDark
                },
                cardStyle:{
                    backgroundColor: colors.bgLight
                }
            }}
        >
            <Stack.Screen 
                name="home"
                component={ Home }
                options={{ headerShown: false } }

            />
             <Stack.Screen 
                name="product-detail"
                component={ Product }
                options={{ headerShown: false } }

            />
            
        </Stack.Navigator>
    )
}
