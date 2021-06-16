import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,    
} from "react-native";
import { map } from "lodash";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { getSearchHistoryApi } from "../../api/search";
import colors from "../../styles/colors";

export default function SearchHistory({ showHistory, containerHeight, onSearch }) {
    const [history, setHistory] = useState(null);

    useEffect(() => {
        if (showHistory) {
            (async () => {
                const history = await getSearchHistoryApi();
                setHistory(history);
            })();
        }
    }, [showHistory]);

    return (
        <View
            style={[
                showHistory ? styles.history : styles.hidden,
                { top: containerHeight },
            ]}
        >
            {history &&
                map(history, (item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => onSearch( item.search )}
                    >
                        <View style={styles.historyItem}>
                            <Text style={styles.text}>{item.search}</Text>
                            <AwesomeIcon name="arrow-right" size={16} />
                        </View>
                    </TouchableWithoutFeedback>
                ))}           
        </View>
    );
}

const styles = StyleSheet.create({
    hidden: {
        display: "none",
    },
    history: {
        position: "absolute",
        backgroundColor: colors.bgLight,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    historyItem: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "#ccc",
        width: "100%",                
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        color: "#555",
        fontSize: 16,
        fontWeight: "bold",
    },
});
