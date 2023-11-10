import { Card, CardMedia } from "@mui/material"

export const ArticleCard = ({ article }) => {

    return (
        <Card className="articleCard">
            <CardMedia
            component="img"
            height="140"
            image={article.image}
            alt={article.type}
            />
        </Card>
    )
}