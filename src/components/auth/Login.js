import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginUser } from '../../api/authManager'
import { Button, Form } from 'react-bootstrap'

export const Login = ({ setToken }) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()
    const [isUnsuccessfull, setIsUnsuccessfull] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        
        loginUser(user).then((response) => {
            if ("valid" in response && "token" in response) {
                setToken(response.token);
                setIsUnsuccessfull(false);
                navigate('/');
            } else {
                setIsUnsuccessfull(true);
            }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} value={user.username} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={user.password} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Login
        </Button>
        </Form>
        {
            isUnsuccessfull ? <p>Invalid username or password</p> : ''
        }
        </>
    )
}
