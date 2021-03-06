import { API_URL } from "../utils/constants";

export const registerApi = async (formData) => {
    try {
        const url = `${API_URL}/auth/local/register`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {        
        return null;
    }
};

export const loginApi = async (formData) => {
    try {
        const url = `${API_URL}/auth/local`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        
        return null;
    }
};

export const getMeApi = async (token) => {
    try {
        const url = `${ API_URL }/users/me`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`  
            } 
        }

        const response = await fetch(url, params)
        const result  = await response.json();

        return result;
    } catch (error) {
        return null
    }
}

export const updateUserApi = async (auth, formData) => {
    try {
        const url = `${ API_URL }/users/${ auth.idUser }`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ auth.token }`
            },
            body: JSON.stringify( formData )
        }    
        const response = await fetch(url, params);
        const result = await response.json();        
        return result;
    } catch (error) {
        return null
    }
}