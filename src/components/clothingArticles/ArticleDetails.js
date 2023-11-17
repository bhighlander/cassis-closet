import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteArticle, getArticleById } from "../../api/articleManager"
import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material"

export const ArticleDetails = ({ token }) => {
    const navigate = useNavigate()
    const { articleId } = useParams()
    const [article, setArticle] = useState({})
    const [deleteArticleModal, setDeleteArticleModal] = useState(false)

    const handleDeleteArticle = () => {
        handleDeleteArticleModal()
    }

    const handleDeleteArticleModal = () => {
        setDeleteArticleModal(true)
    }

    const handleDeleteArticleModalClose = (shouldDelete) => {
        if (shouldDelete) {
            deleteArticle(articleId, token)
                .then(() => navigate("/closet"))
        }
        setDeleteArticleModal(false)
    }

    const handleEditArticle = () => {
        navigate(`/articles/edit-article/${article.id}`, { state: { article } })
    }

    useEffect(() => {
        getArticleById(articleId, token)
            .then(article => setArticle(article))
    }, [articleId, token])

    return (
        <>
        <div className="articleDetails">
            <img src={article.image} alt={article.type} />
            <h2>{article.season}</h2>
            {article.color && <h2>{article.color.label}</h2>}
            {article.type && <h2>{article.type.label}</h2>}
            <Button variant="primary" onClick={handleEditArticle}>Edit</Button>
            <Button variant="warning" onClick={handleDeleteArticle}>Delete</Button>
        </div>
        <Dialog open={deleteArticleModal} onClose={() => handleDeleteArticleModalClose(false)}>
            <DialogTitle variant="h6" id="alert-dialog-title">
                Are you sure you want to delete this article?
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">
                This action cannot be undone.
            </DialogContentText>

            <DialogActions>
                <Button onClick={() => handleDeleteArticleModalClose(false)}>Cancel</Button>
                <Button onClick={() => handleDeleteArticleModalClose(true)} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}