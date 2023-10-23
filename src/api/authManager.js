import { API_URL } from '../utils/apiConfig';

export const registerUser = async (newUser) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

export const loginUser = async (user) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({username: user.username, password: user.password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}