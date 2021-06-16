import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Keyboard, Animated } from "react-native";
import { Searchbar } from "react-native-paper";
import {
    AnimatedIcon,
    animatedTransition,
    animatedTransitionReset,
    arrowAnimation,
    inputAnimation,
    inputAnimationWidth,
} from "./SearchAnimation";
import colors from "../../styles/colors";
import SearchHistory from "./SearchHistory";
import { updateSearchHistoryApi } from "../../api/search";

export default function Search({ currentSearch = "" }) {
    const navigation = useNavigation();
    const route = useRoute();    

    const [searchQuery, setSearchQuery] = useState( currentSearch );
    const [showHistory, setShowHistory] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);

    const onChangeSearch = (query) => setSearchQuery(query);

    const onSearch = async (reuseSearch) => {
        const isReuse = typeof reuseSearch === 'string';        
        closeSearch();

        !isReuse && (await updateSearchHistoryApi(searchQuery));

        if(route.name === "search"){
            navigation.push("search", { query: isReuse? reuseSearch : searchQuery });
        }else{
            navigation.navigate("search", { query: isReuse? reuseSearch : searchQuery });
        }

    };

    const onFocusSearch = () => {
        animatedTransition.start();
        setShowHistory(true);
    };

    const closeSearch = () => {
        animatedTransitionReset.start();
        Keyboard.dismiss();
        setShowHistory(false);
    };

    return (
        <View
            style={styles.container}
            onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
        >
            <View style={styles.containerInput}>
                <AnimatedIcon
                    name="arrow-left"
                    size={20}
                    style={[styles.backArrow, arrowAnimation]}
                    onPress={closeSearch}
                />
                <Animated.View
                    style={[inputAnimation, { width: inputAnimationWidth }]}
                >
                    <Searchbar
                        placeholder="Buscar..."
                        onFocus={onFocusSearch}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        onSubmitEditing={onSearch}
                    />
                </Animated.View>
            </View>
            <SearchHistory
                showHistory={showHistory}
                containerHeight={containerHeight}
                onSearch={ onSearch }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 2,
    },
    containerInput: {
        position: "relative",
        alignItems: "flex-end",
    },
    backArrow: {
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.fontLight,
    },
});
