import { useEffect, useState } from "react"
import { OutfitCard } from "./OutfitCard"
import { getAllOutfits } from "../../api/outfitManager"

export const OutfitList = ({ token }) => {
    const [outfits, setOutfits] = useState([])

    useEffect(() => {
        getAllOutfits(token)
            .then(data => setOutfits(data))
    }
    , [token])

    return (
        <>
        <h1>My Closet</h1>
        <div className="outfitList">
            {outfits?.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)}
        </div>
        </>
    )
}