import { useEffect, useState } from "react"
import { ArticleCard } from "./ArticleCard"
import { getAllArticles } from "../../api/articleManager"

export const ArticleList = ({ token }) => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles(token)
            .then(data => setArticles(data))
    }
    , [token])

    return (
        <>
        <h1>My Closet</h1>
        <div className="articleList">
            {articles?.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
        </>
    )
}