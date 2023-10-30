import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createArticle } from "../../api/articleManager"
import { Button, MenuItem, Select } from "@mui/material"
import { FormControl } from '@mui/base'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Form } from "react-bootstrap"

export const CreateArticleForm = ({ token }) => {
    const navigate = useNavigate()
    const [article, setArticle] = useState({
        color: "1",
        season: "1",
        type: "1",
        image: null,
    })
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")
    const [selectedType, setSelectedType] = useState("")

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
                <h2>Create Article</h2>
                <Form.Label htmlFor="color">Color</Form.Label>
                <FormControl>
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