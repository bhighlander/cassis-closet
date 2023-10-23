import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/authManager'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const Register = ({ setToken }) => {
    const [newUser, setNewUser] = useState({
        first_name: '',
        username: '',
        password: '',
        verify_password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        
        if (newUser.password === newUser.verify_password) {
            registerUser(newUser).then((response) => {
                if ("valid" in response && "token" in response) {
                    setToken(response.token);
                    navigate('/');
                } else if ("error" in response) {
                    setErrorMessage(response.error);
                    setIsDialogOpen(true);
                }
            });
            } else {
                setErrorMessage("Passwords do not match");
                setIsDialogOpen(true);
            }
        }

        const handleChange = (e) => {
            const { name, value } = e.target;
            setNewUser(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

    return (
        <>
        <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="first_name" placeholder="Enter first name" onChange={handleChange} value={newUser.first_name} />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} value={newUser.username} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={newUser.password} />
        </Form.Group>
        <Form.Group controlId="formBasicVerifyPassword">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control type="password" name="verify_password" placeholder="Verify Password" onChange={handleChange} value={newUser.verify_password} />
        </Form.Group>
        <Button type="submit" className="btn btn-primary">Register</Button>
    </Form>
        </>
    )
}
