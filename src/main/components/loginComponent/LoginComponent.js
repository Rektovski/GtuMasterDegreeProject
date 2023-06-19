import "../../styles/loginComponentStyle.css";
import {useContext, useState} from "react";
import {Button, Container} from "@chakra-ui/react";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

export const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authorization = async (event) => {
        event.preventDefault();
        if(password === "CISDEPARTMENT"){
            localStorage.setItem("user", username);
        }
        window.location.reload();
    }

    return (
        <>
            <div className={'centeredLogin'}>
                <Container>
                    <Form onSubmit={authorization}>
                        <FormGroup className={'my-2'}>
                            <FormLabel>Username:</FormLabel>
                            <FormControl
                                placeholder={'მომხმარებელი'}
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                            />
                        </FormGroup>
                        <FormGroup className={'my-2'}>
                            <FormLabel>Password:</FormLabel>
                            <FormControl
                                placeholder={'პაროლი'}
                                type={'password'}
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </FormGroup>
                        <div className={'d-flex justify-content-end'}>
                            <Button variant={'primary'} type={'submit'}>Sign in</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    )
}