import { API_URL } from "../utils/apiConfig";

export const createOutfit = async (outfit, token) => {
    await fetch(`${API_URL}/outfits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(outfit)
    });
}

export const getAllOutfits = async (token) => {
    const response = await fetch(`${API_URL}/outfits`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export const getOutfitById = async (outfitId, token) => {
    const response = await fetch(`${API_URL}/outfits/${outfitId}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export const deleteOutfit = async (outfitId, token) => {
    await fetch(`${API_URL}/outfits/${outfitId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`
        }
    });
}