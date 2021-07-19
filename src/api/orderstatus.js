import { API_URL } from "../utils/constants";


export const addOrderStatusApi = async (auth, data) => {
    try {
        const url = `${ API_URL }/orderstatuses`
        const params = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ auth.token }`  
            },
            body: JSON.stringify( data )
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getOrdenStatusApi = async (auth) => {
    try {
        const url = `${ API_URL }/orderstatuses?user=${auth.idUser}`
        const params = {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ auth.token }`  
            }            
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}