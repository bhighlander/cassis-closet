import { API_URL } from '../utils/apiConfig';

export const getAllTypes = async (token) => {
    const response = await fetch(`${API_URL}/types`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}
