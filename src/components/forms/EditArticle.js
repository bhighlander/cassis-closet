import { useEffect, useState } from "react"
import { getArticleById } from "../../api/articleManager"
import { ArticleForm } from "./ArticleForm"
import { useParams } from "react-router-dom"

export const EditArticleForm = ({ token }) => {
    const [article, setArticle] = useState({})
    const { articleId } = useParams()


    useEffect(() => {
        getArticleById(articleId, token)
            .then(article => setArticle(article))
    }, [articleId, token])

    return (
        <>
        <ArticleForm token={token} articleObject={article} />
        </>
    )
}