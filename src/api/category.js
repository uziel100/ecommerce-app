import { API_URL } from "../utils/constants";


export const getCategoryApi =  async () => {
    try {
        const url = `${ API_URL }/categories`;
        
        const response = await fetch(url)
        const result  = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getProductsByCategoryApi =  async ( category ) => {
    try {
        const url = `${ API_URL }/products?category=${ category }`;        
        const response = await fetch(url)
        const result  = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}