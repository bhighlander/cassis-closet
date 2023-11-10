import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArticleById } from "../../api/articleManager"

export const ArticleDetails = ({ token }) => {
    const navigate = useNavigate()
    const { articleId } = useParams()
    const [article, setArticle] = useState({})
    
    useEffect(() => {
        getArticleById(articleId, token)
            .then(article => setArticle(article))
    }, [articleId, token])

    return (
        <div className="articleDetails">
            <img src={article.image} alt={article.type} />
            <h2>{article.season}</h2>
            {article.color && <h2>{article.color.label}</h2>}
            {article.type && <h2>{article.type.label}</h2>}
        </div>
    )
}