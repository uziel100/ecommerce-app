import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import Account from "../screens/Account";
import { StyleSheet } from "react-native";
import colors from "../styles/colors";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: (routerStatus) => {
                        return setIcon(route, routerStatus);
                    },
                })}               
            >
                <Tab.Screen
                    name="home"
                    component={Home}
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
                    component={Account}
                    options={{
                        title: "Tu cuenta",
                    }}                   
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const setIcon = (route, routerStatus) => {
    let iconName = "";

    switch (route.name) {
        case "home":
            iconName = "home";
            break;
        case "favorites":
            iconName = "heart";
            break;
        case "cart":
            iconName = "shopping-cart";
            break;
        case "account":
            iconName = "user";
            break;
        default:
            break;
    }

    return <AwesomeIcon name={iconName} solid style={styles.icon} />;
};

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark,
    },
    icon: {
        fontSize: 20,
        color: colors.fontLight,
    },
});