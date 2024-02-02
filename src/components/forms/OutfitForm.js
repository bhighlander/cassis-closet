import { Stack, Card, CardMedia, Autocomplete, Button, FormControl, Select, TextField, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { getAllArticles } from '../../api/articleManager'
import { createColor, getAllColors } from '../../api/colorManager'
import { createOutfit } from '../../api/outfitManager'

const initialState = {
    color: "",
    season: "",
    articles: [],
}

export const OutfitForm = ({ token, outfitObject }) => {
    const navigate = useNavigate()
    const [outfit, setOutfit] = useState({ ...initialState, ...outfitObject })
    const [articles, setArticles] = useState([])
    const [selectedArticles, setSelectedArticles] = useState([])
    const [colors, setColors] = useState([])
    const [newColor, setNewColor] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")

    useEffect(() => {
        getAllArticles(token)
            .then(data => setArticles(data))
        getAllColors(token).then(setColors);
    }
    , [token])

    useEffect(() => {
        if (outfitObject && outfitObject.id) {
            setOutfit(outfitObject);
            setSelectedColor(outfitObject.color.label);
            setSelectedSeason(outfitObject.season);
            setSelectedArticles(outfitObject.articles.map(article => article.id));
        } else {
            setOutfit(initialState);
            setSelectedColor('');
            setSelectedSeason('');
            setSelectedArticles([]);
        }
    }
    , [outfitObject])

    const handleArticleSelection = (articleId) => {
        setSelectedArticles(prev => {
            const newSelected = prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId];
            console.log("Selected Articles:", newSelected);
            return newSelected;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let color = colors.find(c => c.label.toLowerCase() === newColor.toLowerCase());
        if (!color) {
            try {
                color = await createColor({ label: newColor }, token);
                setColors([...colors, color]);
            } catch (error) {
                console.error('Error creating color:', error);
                return; 
            }
        }

        let outfitData = {
            color: color ? color.id : undefined,
            season: selectedSeason,
            articles: selectedArticles,
        }

        try {
            await createOutfit(outfitData, token);
            navigate('/outfits');
        } catch (error) {
            console.error('Error creating outfit:', error);
        }
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
                {outfit.id ? <h2>Edit Outfit</h2> : <h2>Create Outfit</h2>}
            <div className="articleList">
                        {articles?.map(article => {
                            const isSelected = selectedArticles.includes(article.id);
                            return (
                                <Card 
                                    className={`articleCard ${isSelected ? 'selected' : ''}`}
                                    key={article.id}
                                    onClick={() => handleArticleSelection(article.id)}
                                    style={{ border: isSelected ? '2px solid blue' : '' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={article.image}
                                        alt={article.type}
                                    />
                                </Card>
                            );
                        })}
                    </div>
        <FormControl>
                    <Autocomplete 
                        freeSolo
                        onChange={(event, value) => {
                            setOutfit(prev => ({ ...prev, color: value ? value.label : "" }));
                        }}
                        value={colors.find(c => c.label === selectedColor) || null}
                        inputValue={newColor}
                        onInputChange={(event, newInputValue) => {
                            setNewColor(newInputValue);
                        }}
                        options={colors}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                            <TextField {...params} label="Color" variant="outlined" />
                            )}
                        sx = {{ width: 300 }}
                    />
                </FormControl>
                <FormControl>
                <Select
                    name="season"
                    label="Season"
                    onChange={e => setSelectedSeason(e.target.value)}
                    value={selectedSeason}
                    required
                    sx={{ width: 300 }}
                >
                    <MenuItem value="">Select a season</MenuItem>
                    <MenuItem value="spring">Spring</MenuItem>
                    <MenuItem value="summer">Summer</MenuItem>
                    <MenuItem value="fall">Fall</MenuItem>
                    <MenuItem value="winter">Winter</MenuItem>
                </Select>
                </FormControl>
                <Button type="submit">
                    {outfit.id ? <span>Update</span> : <span>Submit</span>}
                </Button>
        </Stack>
        </Form>
        </>
    )
}