import { API_URL } from "../utils/apiConfig";

export const createArticle = async (article, token) => {
    let formData = new FormData();
    formData.append('image', article.image);
    formData.append('color', article.color);
    formData.append('season', article.season);
    formData.append('type', article.type);

    await fetch(`${API_URL}/articles`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Token ${token}`
        }
    });
}