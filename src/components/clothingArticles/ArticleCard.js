import { Card, CardMedia } from "@mui/material"

export const ArticleCard = ({ article }) => {

    return (
        <Card className="articleCard" sx={{ height: 200, width: 200}}>
            <CardMedia
            component="img"
            height="140"
            image={article.image}
            alt={article.type}
            />
        </Card>
    )
}