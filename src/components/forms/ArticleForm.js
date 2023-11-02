import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createArticle } from "../../api/articleManager"
import { Autocomplete, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { FormControl } from '@mui/base'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Form } from "react-bootstrap"
import { getAllColors } from "../../api/colorManager"

export const CreateArticleForm = ({ token }) => {
    const navigate = useNavigate()
    const [article, setArticle] = useState({
        color: "",
        season: "",
        type: "",
        image: null,
    })
    const [colors, setColors] = useState([])
    const [selectedColor, setSelectedColor] = useState(null)
    const [newColor, setNewColor] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")
    const [selectedType, setSelectedType] = useState("")

    useEffect(() => {
        getAllColors(token)
            .then(colors => {
                setColors(colors)
            })

    }, [article, token])


    const handleSubmit = (e) => {
        e.preventDefault()

        createArticle(article, token)
            .then(() => {
                navigate('/')
            })
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
                <FormControl>
                <Autocomplete
                    name="color"
                    freeSolo
                    value={selectedColor}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setSelectedColor({
                                label: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            setSelectedColor({
                                label: newValue.inputValue,
                            });
                        } else {
                            setSelectedColor(newValue);
                        }
                    }}
                    inputValue={newColor}
                    onInputChange={(event, newInputValue) => {
                        setNewColor(newInputValue);
                    }}
                    options={colors}
                    getOptionLabel={(option) => {
                        return typeof option === 'string' ? option : option.label;
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Color" variant="outlined" />}
                />
                </FormControl>
                <FormControl>
                <Select
                    name="season"
                    onChange={e => setSelectedSeason(e.target.value)}
                    value={selectedSeason}
                    required
                >
                    <MenuItem value="">Select a season</MenuItem>
                    <MenuItem value="spring">Spring</MenuItem>
                    <MenuItem value="summer">Summer</MenuItem>
                    <MenuItem value="fall">Fall</MenuItem>
                    <MenuItem value="winter">Winter</MenuItem>
                </Select>
                </FormControl>
                <FormControl>
                <Select
                    name="type"
                    onChange={e => setSelectedType(e.target.value)}
                    value={selectedType}
                    required
                >
                    <MenuItem value="">Select a type</MenuItem>
                    <MenuItem value="top">Top</MenuItem>
                    <MenuItem value="bottom">Bottom</MenuItem>
                    <MenuItem value="shoes">Shoes</MenuItem>
                    <MenuItem value="accessory">Accessory</MenuItem>
                </Select>
                </FormControl>
                
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>

                <FormControl
                    name="image"
                    onChange={handleImageChange}
                    value={article.image}
                    required
                />

                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}