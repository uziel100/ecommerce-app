import { API_URL, TOKEN } from '../utils/constants';


export const getAddressApi = async (auth) => {
    try {
        const url = `${ API_URL }/addresses?user=${ auth.idUser }`
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            },
        }
        const response = await fetch( url, params );
        const result = await response.json();
        return result
    } catch (error) {  
        console.log(error)
        return null;
    }
}

export const getOneAddressApi = async (auth, idAddress) => {
    try {
        const url = `${ API_URL }/addresses/${ idAddress }`
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            },
        }
        const response = await fetch( url, params );
        const result = await response.json();
        return result
    } catch (error) {  
        console.log(error)
        return null;
    }
}

export const addAddressApi = async (auth, formData) => {
    try {
        const url = `${ API_URL }/addresses`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            },
            body: JSON.stringify( formData )
        }
        const response = await fetch( url, params );
        const result = await response.json();
        return result
    } catch (error) {  
        console.log(error)
        return null;
    }
}

export const updateAddressApi = async (auth, formData) => {
    try {
        const url = `${ API_URL }/addresses/${ formData._id }`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            },
            body: JSON.stringify( formData )
        }
        const response = await fetch( url, params );
        const result = await response.json();
        return result
    } catch (error) {  
        console.log(error)
        return null;
    }
}

export const deleteAddressApi = async (auth, idAddress) => {
    try {
        const url = `${ API_URL }/addresses/${ idAddress }`
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`  
            },            
        }
        const response = await fetch( url, params );
        const result = await response.json();
        return result
    } catch (error) {  
        console.log(error)
        return null;
    }
}