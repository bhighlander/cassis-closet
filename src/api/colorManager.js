import { API_URL } from '../utils/apiConfig';

export const getAllColors = async (token) => {
    const response = await fetch(`${API_URL}/colors`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export const createColor = async (color, token) => {
    await fetch(`${API_URL}/colors`, {
        method: 'POST',
        body: JSON.stringify(color),
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        }
    });
}