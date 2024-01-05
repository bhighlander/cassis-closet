import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteOutfit, getOutfitById } from "../../api/outfitManager"
import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material"

export const OutfitDetails = ({ token }) => {
    const navigate = useNavigate()
    const { outfitId } = useParams()
    const [outfit, setOutfit] = useState({ articles: [] });
    const [deleteOutfitModal, setDeleteOutfitModal] = useState(false)
    const [currentImage, setCurrentImage] = useState(0);
    const images = outfit.articles.map(article => article.image);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentImage, images.length]);

    const handleDeleteOutfit = () => {
        handleDeleteOutfitModal()
    }

    const handleDeleteOutfitModal = () => {
        setDeleteOutfitModal(true)
    }

    const handleDeleteOutfitModalClose = (shouldDelete) => {
        if (shouldDelete) {
            deleteOutfit(outfitId, token)
                .then(() => navigate("/closet"))
        }
        setDeleteOutfitModal(false)
    }

    const handleEditOutfit = () => {
        navigate(`/outfit/edit-outfit/${outfit.id}`, { state: { outfit } })
    }

    useEffect(() => {
        getOutfitById(outfitId, token)
            .then(outfit => setOutfit(outfit))
    }, [outfitId, token])

    return (
        <>
        <div className="outfitDetails">
            <img src={images[currentImage]} alt="Clothing Articles" />
            <h2>{outfit.season}</h2>
            {outfit.color && <h2>{outfit.color.label}</h2>}
            <Button variant="primary" onClick={handleEditOutfit}>Edit</Button>
            <Button variant="warning" onClick={handleDeleteOutfit}>Delete</Button>
        </div>
        <Dialog open={deleteOutfitModal} onClose={() => handleDeleteOutfitModalClose(false)}>
            <DialogTitle variant="h6" id="alert-dialog-title">
                Are you sure you want to delete this outfit?
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">
                This action cannot be undone.
            </DialogContentText>

            <DialogActions>
                <Button onClick={() => handleDeleteOutfitModalClose(false)}>Cancel</Button>
                <Button onClick={() => handleDeleteOutfitModalClose(true)} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}