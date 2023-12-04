import { Stack, Card, CardMedia, Autocomplete, Button, FormControl, Select, TextField, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { getAllArticles } from '../../api/articleManager'
import { createColor, getAllColors } from '../../api/colorManager'

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
        if (outfit && outfit.id) {
            setOutfit(outfit);
            setSelectedColor(outfit.color);
            setSelectedSeason(outfit.season);
        } else {
            setOutfit(initialState);
            setSelectedColor('');
            setSelectedSeason('');
        }
    }
    , [outfit])

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

        let articleIds = selectedArticles.map(a => a.id);
        let outfitObject = {
            color: color.label,
            season: selectedSeason,
            articleIds: articleIds
        }
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
        <Stack>
            <h1>Outfit Form</h1>
            <div className="articleList">
            {articles?.map(article =>
                <Card className="articleCard" key={article.id}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={article.image}
                    alt={article.type}
                    />
                </Card>
                )}
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