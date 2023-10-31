import { API_URL } from '../utils/apiConfig';

export const getAllColors = async (token) => {
    const response = await fetch(`${API_URL}/colors`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}
