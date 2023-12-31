import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createArticle, updateArticle } from "../../api/articleManager"
import { createColor, getAllColors } from "../../api/colorManager"
import { Autocomplete, Button, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material"
import { Form } from "react-bootstrap"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { createType, getAllTypes } from "../../api/typeManager"

const initialState = {
    color: "",
    season: "",
    type: "",
    image: null,
}

export const ArticleForm = ({ token, articleObject }) => {
    const navigate = useNavigate()
    const [article, setArticle] = useState({ ...initialState, ...articleObject })
    const [colors, setColors] = useState([])
    const [newColor, setNewColor] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState("")
    const [newType, setNewType] = useState("")

    useEffect(() => {
        getAllColors(token).then(setColors);
        getAllTypes(token).then(setTypes);
    }, [token]);

    useEffect(() => {
        if (articleObject && articleObject.id) {
            setArticle(articleObject);
            setSelectedColor(articleObject.color.label);
            setSelectedSeason(articleObject.season);
            setSelectedType(articleObject.type.label);
        } else {
            // Reset to initial state if creating a new article
            setArticle(initialState);
            setSelectedColor('');
            setSelectedSeason('');
            setSelectedType('');
        }
    }, [articleObject]);
    

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
    
        let type = types.find(t => t.label.toLowerCase() === newType.toLowerCase());
        if (!type) {
            try {
                type = await createType({ label: newType }, token);
                setTypes([...types, type]);
            } catch (error) {
                console.error('Error creating type:', error);
                return; 
            }
        }
    
        let articleData = {
            color: color ? color.id : undefined,
            season: selectedSeason,
            type: type ? type.id : undefined,
        };

        if (article.image instanceof File) {
            articleData.image = article.image;
        } else {
            articleData.image = undefined;
        }
    
        try {
            if (article.id) {
                await updateArticle(article.id, articleData, token);
                console.log('Article updated successfully');
            } else {
                await createArticle(articleData, token);
                console.log('Article created successfully');
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving article:', error);
        }
    }
    

    const handleImageChange = (e) => { 
        setArticle(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={2}>
                {article.id ? <h2>Edit Article</h2> : <h2>Create Article</h2>}
                <FormControl>
                    <Autocomplete 
                        freeSolo
                        onChange={(event, value) => {
                            setArticle(prev => ({ ...prev, color: value ? value.label : "" }));
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
                <FormControl>
                    <Autocomplete 
                        freeSolo
                        onChange={(event, value) => {
                            setArticle(prev => ({ ...prev, type: value ? value.label : "" }));
                        }}
                        value={types.find(t => t.label === selectedType) || null}
                        inputValue={newType}
                        onInputChange={(event, newInputValue) => {
                            setNewType(newInputValue);
                        }}
                        options={types}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                            <TextField {...params} label="Type" variant="outlined" />
                            )}
                        sx = {{ width: 300 }}
                    />
                </FormControl>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: 170 }}>
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                <Button type="submit">
                    {article.id ? <span>Update</span> : <span>Submit</span>}
                </Button>
                </Stack>
            </Form>
        </>
    )
}