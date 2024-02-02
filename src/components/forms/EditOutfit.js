import { useEffect, useState } from "react"
import { getOutfitById } from "../../api/outfitManager"
import { OutfitForm } from "./OutfitForm"
import { useParams } from "react-router-dom"

export const EditOutfitForm = ({ token }) => {
    const [outfit, setOutfit] = useState({})
    const { outfitId } = useParams()


    useEffect(() => {
        getOutfitById(outfitId, token)
            .then(outfit => setOutfit(outfit))
    }, [outfitId, token])

    return (
        <>
        <OutfitForm token={token} outfitObject={outfit} />
        </>
    )
}