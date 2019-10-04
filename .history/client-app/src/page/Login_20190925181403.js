import React, { useState } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

        return (
            <div className="FullContent">
                <div><h1>Login</h1></div>
                <Form className="form-content" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="formHorizontalEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            required
                            type="email" 
                            placeholder="Email" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input your email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formHorizontalPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            required 
                            type="password" 
                            placeholder="Password" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Check
                        label="Remember Me"
                        />
                    </Form.Group>
                    <Button type="submit">Sign in</Button>

                    <Button onClick={window.location.replace("https://127.0.0.1:5000/login/facebook")}>Sign in with FaceBook</Button>
                </Form>
            </div>


        )
}
export default Login;