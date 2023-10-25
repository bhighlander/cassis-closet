import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createArticle } from "../../api/articleManager"
import { Button, FormControl, MenuItem, Select } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const CreateArticleForm = ({ setToken }) => {
    const navigate = useNavigate()
    const [article, setArticle] = useState({
        color: "",
        season: "",
        type: "",
        img_dir: "",
        owner: "",
    })
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")
    const [selectedType, setSelectedType] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        createArticle(article)
            .then(() => {
                navigate('/')
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <FormControl onSubmit={handleSubmit}>
                <Select
                    name="color"
                    onChange={e => setSelectedColor(e.target.value)}
                    value={selectedColor}
                    required
                >
                    <MenuItem value="">Select a color</MenuItem>
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="brown">Brown</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="grey">Grey</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                    <MenuItem value="pink">Pink</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                </Select>
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
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <FormControl
                    name="img_dir"
                    onChange={handleChange}
                    value={article.img_dir}
                    required
                />
                <Button type="submit">Submit</Button>
            </FormControl>
        </>
    )
}