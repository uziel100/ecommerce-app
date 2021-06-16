import React from "react";
import { ScrollView, View } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search/index";
import colors from "../../styles/colors";
import NewProducts from "../../components/Home/NewProducts";
import Banner from "../../components/Home/Banner";

export default function Home() {
    return (
        <>
            <StatusBar
                backgroundColor={colors.bgDark}
                barStyle="light-content"
            />
            <Search />
            <ScrollView >                
                <Banner />
                <NewProducts />                
            </ScrollView>
        </>
    );
}

