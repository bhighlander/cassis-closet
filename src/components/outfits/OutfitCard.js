import { Card, CardActionArea, CardMedia } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';

export const OutfitCard = ({ outfit }) => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const images = outfit.articles.map(article => article.image);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage, images.length]);

    const handleClick = () => {
        navigate(`/outfits/${outfit.id}`);
    };

    return (
        <Card className="outfitCard">
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={images[currentImage]}
                />
            </CardActionArea>
        </Card>
    );
};
