
import { API_URL } from '../utils/constants'

export const getLastProductApi = async (limit = 20) => {
    try {
        const url = `${ API_URL }/products?_limit=${ limit }&_sort=createAt:DESC`
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getProductApi = async ( idProduct ) => {
    try {
        const url = `${ API_URL }/products/${ idProduct }`
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null
    }
}