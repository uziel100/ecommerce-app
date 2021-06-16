
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, SEARCH_HISTORY } from "../utils/constants";
import { sortArrayByDate } from "../utils/functions";

export const getSearchHistoryApi = async () => {    
    const history = await AsyncStorage.getItem( SEARCH_HISTORY );
    if( !history ) return [];

    const sortHistory = sortArrayByDate( JSON.parse(history) );

    return sortHistory
}

export const updateSearchHistoryApi = async ( search ) => {
    const history = await getSearchHistoryApi();
    
    if(history.length == 5){
        history.pop();
    }
    
    
    history.push( {
        search,
        date: new Date()
    } )    
    await AsyncStorage.setItem( SEARCH_HISTORY, JSON.stringify(history) )
}

export const searchProductApi = async (query) => {
    try {
        const url = `${ API_URL }/products?_q=${ query }&_limit=30`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

