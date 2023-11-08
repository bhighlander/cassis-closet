import { API_URL } from '../utils/apiConfig';

export const getAllTypes = async (token) => {
    const response = await fetch(`${API_URL}/types`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export const createType = async (type, token) => {
    const response = await fetch(`${API_URL}/types`, {
        method: 'POST',
        body: JSON.stringify(type),
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}