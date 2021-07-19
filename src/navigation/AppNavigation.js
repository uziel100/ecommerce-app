import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; 
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import AccountStack from "./AccountStack";

import { StyleSheet } from "react-native";
import colors from "../styles/colors";
import ProductStack from "./ProductStack";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        return setIcon(route, focused);
                    },
                })}               
            >
                <Tab.Screen
                    name="home"
                    component={ProductStack}
                    options={{
                        title: "Inicio",
                    }}
                    
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{
                        title: "Favoritos",
                    }}
                />
                <Tab.Screen
                    name="cart"
                    component={Cart}
                    options={{
                        title: "Carrito",
                    }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{
                        title: "Tu cuenta",
                    }}                   
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const setIcon = (route, focused) => {
    let iconName = "";

    switch (route.name) {
        case "home":
            iconName = focused? "home" : "home-outline";
            break;
        case "favorites":
            iconName = focused? "heart": "heart-outline";
            break;
        case "cart":
            iconName = focused? "cart": "cart-outline";
            break;
        case "account":
            iconName = focused? "account": "account-outline";
            break;
        default:
            break;
    }

    return <MaterialCommunityIcons name={iconName} style={styles.icon} />;
};

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark,
    },
    icon: {
        fontSize: 18,
        color: colors.fontLight,
    },
});
