
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

export const updateProductStockApi = async ( auth, products ) => {
    try {
        for (const product of products) {
            const data = await getProductApi(product._id);            
            const url = `${ API_URL }/products/${ product._id }`
            const params = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ auth.token }`  
                },
                body: JSON.stringify({
                    stock: data.stock - product.quantity
                })      
            }
            await fetch(url, params);                        
        }
        return true;
    } catch (error) {
        console.log(error)
        return null
    }
}

