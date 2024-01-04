import { API_URL } from "../utils/apiConfig";

export const createOutfit = async (outfit, token) => {
    let formData = new FormData();
    formData.append('color', outfit.color);
    formData.append('season', outfit.season);

    outfit.articles.forEach(article => {
        formData.append('articles', article);
    });

    await fetch(`${API_URL}/outfits`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Token ${token}`
        }
    });
}