import { size } from "lodash-es";
import { API_URL } from "../utils/constants";

export const isFavoriteApi =  async (auth, idProduct) => {
    try {
        const url = `${ API_URL }/favorites?user=${ auth.idUser }&product=${ idProduct }`;
        const params = {                        
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            }             
        }

        const response = await fetch(url, params)
        const result  = await response.json();

        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const addFavoriteApi =  async (auth, idProduct) => {
    try {
        const url = `${ API_URL }/favorites`;
        const params = {                        
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            },
            body: JSON.stringify({  
                product: idProduct,
                user: auth.idUser
            })     
        }

        const response = await fetch(url, params)
        const result  = await response.json();

        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export const deleteFavoriteApi =  async (auth, idProduct) => {
    try {

        const dataFounded = await isFavoriteApi(auth, idProduct);

        if( size(dataFounded) > 0 ){
            const url = `${ API_URL }/favorites/${ dataFounded[0]?._id }`;
            const params = {                        
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ auth.token }`  
                }                 
            }
    
            const response = await fetch(url, params)
            const result  = await response.json();
    
            return result;

        }

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getFavoriteApi =  async (auth) => {
    try {
        const url = `${ API_URL }/favorites?user=${ auth.idUser }`;
        const params = {                        
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            }             
        }

        const response = await fetch(url, params)
        const result  = await response.json();

        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}