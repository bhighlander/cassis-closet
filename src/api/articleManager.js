import { API_URL } from "../utils/apiConfig";

export const createArticle = async (article) => {
    const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        body: JSON.stringify(article),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}