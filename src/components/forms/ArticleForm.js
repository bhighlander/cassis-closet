import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createArticle } from "../../api/articleManager"
import { createColor, getAllColors } from "../../api/colorManager"
import { Autocomplete, Button, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material"
import { Form } from "react-bootstrap"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { createType, getAllTypes } from "../../api/typeManager"

export const CreateArticleForm = ({ token }) => {
    const navigate = useNavigate()
    const [article, setArticle] = useState({
        color: "",
        season: "",
        type: "",
        image: null,
    })
    const [colors, setColors] = useState([])
    const [newColor, setNewColor] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")
    const [types, setTypes] = useState([])
    const [newType, setNewType] = useState("")

    useEffect(() => {
        getAllColors(token).then(setColors);
        getAllTypes(token).then(setTypes);
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault()

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

        const articleData = {
            ...article,
            color: color.id,
            season: selectedSeason,
            type: type.id,
        };

        try {
            await createArticle(articleData, token);
            navigate('/');
        } catch (error) {
            console.error('Error creating article:', error);
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
                <h2>Create Article</h2>
                <Form.Label htmlFor="color">Color</Form.Label>
                <FormControl>
                    <Autocomplete 
                        freeSolo
                        onChange={(event, value) => {
                            setArticle(prev => ({ ...prev, color: value ? value.label : "" }));
                        }}
                        value={colors}
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
                        value={types}
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
                        required
                    />
                </Button>
                <Button type="submit">Submit</Button>
                </Stack>
            </Form>
        </>
    )
}