import React from "react";
import { ScrollView, View } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search/index";
import colors from "../../styles/colors";
import NewProducts from "../../components/Home/NewProducts";
import Banner from "../../components/Home/Banner";
import Category from "../../components/Home/Category";

export default function Home() {
    return (
        <>
            <StatusBar
                backgroundColor={colors.bgSearch}
                barStyle="light-content"
            />
            <Search />
            <ScrollView >                
                <Banner />
                <Category />
                <NewProducts />                
            </ScrollView>
        </>
    );
}

