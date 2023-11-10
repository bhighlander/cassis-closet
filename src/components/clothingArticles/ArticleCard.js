import { Card, CardActionArea, CardMedia } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const ArticleCard = ({ article }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/articles/${article.id}`)
    }

    return (
        <Card className="articleCard">
            <CardActionArea onClick={handleClick}>
            <CardMedia
            component="img"
            height="140"
            image={article.image}
            alt={article.type}
            />
            </CardActionArea>
        </Card>
    )
}