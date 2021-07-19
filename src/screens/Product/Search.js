import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { size } from "lodash";
import StatusBar from "../../components/StatusBar";
import ScreenLoading from "../../components/ScreenLoading";
import SearchBar from "../../components/Search/Search";
import { searchProductApi } from '../../api/search'
import colors from '../../styles/colors'
import ResultNotFound from '../../components/Search/ResultNotFound';
import ProductList from '../../components/Search/ProductList';

export default function Search({ route: { params } }) {
    const { query } = params;

    const [products, setProducts] = useState(null);
    useEffect(() => {
        ( async ()=> {
            setProducts(null);
            const response = await searchProductApi( query );            
            setProducts( response );
        })()
    }, [query])

    return (
        <>
            <StatusBarCustom 
            backgroundColor={colors.bgSearch}
            barStyle="light-content"
             />
            <SearchBar currentSearch={ query } />
            {
                !products
                    ? <ScreenLoading title="Buscando productos..." size="large" />
                    : size( products ) === 0
                        ? <ResultNotFound search={ query } />
                        : <ProductList products={ products } />
            }
            
        </>
    )
}
