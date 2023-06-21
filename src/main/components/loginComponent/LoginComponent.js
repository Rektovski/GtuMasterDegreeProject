import "../../styles/loginComponentStyle.css";
import React, {useRef, useState} from "react";
import {Button, Container} from "@chakra-ui/react";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {GiPoliceBadge} from "react-icons/gi";
import axios from "axios";
import {UserAPI} from "../APIServers/UserAPI";

const defaultForm = {
    username: "",
    password: "",
    userId: "",
    signature: "",
};

export const LoginComponent = () => {
    const [loginRegistration, setLoginRegistration] = useState("login");
    const [userForm, setUserForm] = useState(defaultForm);

    const handleChange = (e) => {
        setUserForm({...userForm, [e.target.name]: e.target.value});
    };

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPos, setPrevPos] = useState({x: 0, y: 0});

    const startDrawing = (e) => {
        setIsDrawing(true);
        setPrevPos(getMousePos(e));
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const {x, y} = getMousePos(e);

        ctx.strokeStyle = "blue"; // Set line color to blue
        ctx.beginPath();
        ctx.moveTo(prevPos.x, prevPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        setPrevPos({x, y});
    };

    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const saveSignatureInForm = () => {
        const canvas = canvasRef.current;
        userForm.signature = canvas.toDataURL("image/png");
    };

    const registerNewUser = async (event) => {
        event.preventDefault();
        saveSignatureInForm();
        let userExists = false;
        await axios
            .get(UserAPI)
            .then((response) => {
                const userData = response.data;
                userExists = userData.some((item) => {
                    return (
                        userForm.userId === item.userId ||
                        (userForm.username === item.username && userForm.password === item.password)
                    );
                });
            })
            .catch((error) => console.error("Error while authorization: " + error));
        if (userExists) {
            window.location.reload();
        } else {
            await axios
                .post(UserAPI, userForm)
                .then((response) => console.log("API Got new User"))
                .catch((error) => console.error("Error while adding new user: " + error));

            setUserForm(defaultForm);
            setLoginRegistration("login");
        }
    };

    const login = async (event) => {
        event.preventDefault();
        let userExists = false;
        await axios
            .get(UserAPI)
            .then((response) => {
                const userData = response.data;
                userExists = userData.some((item) => {
                    return (
                        userForm.userId === item.userId ||
                        (userForm.username === item.username && userForm.password === item.password)
                    );
                });
            })
            .catch((error) => console.error("Error while authorization: " + error));
        if (userExists) {
            localStorage.setItem("user", userForm.username);
            localStorage.setItem('userId', userForm.userId);
            setUserForm(defaultForm);
        }
        window.location.reload();
    };

    return (
        <>
            <div
                className={`${
                    loginRegistration === "registration"
                        ? "centeredLoginRegistration"
                        : "centeredLogin"
                }`}
            >
                <Container>
                    <Form
                        className={`${
                            loginRegistration === "registration"
                                ? "formSpaceRegistration"
                                : "formSpace"
                        }`}
                        onSubmit={loginRegistration === "login" ? login : registerNewUser}
                    >
                        <div className={"formIconSpace"}>
                            <GiPoliceBadge className={"formIcon"} size={40}/>
                            <div className={"formTitle"}>
                                <h1>E</h1>
                                <h6>Laboratory</h6>
                            </div>
                        </div>
                        <FormGroup className={"my-2"}>
                            <FormLabel>Username:</FormLabel>
                            <FormControl
                                placeholder={"მომხმარებელი"}
                                name="username"
                                value={userForm.username}
                                onChange={handleChange}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className={"my-2"}>
                            <FormLabel>Password:</FormLabel>
                            <FormControl
                                placeholder={"პაროლი"}
                                type={"password"}
                                name="password"
                                value={userForm.password}
                                onChange={handleChange}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className={"my-2"}>
                            <FormLabel>ID:</FormLabel>
                            <FormControl
                                placeholder={"ს/ნ"}
                                type={"password"}
                                name="userId"
                                value={userForm.userId}
                                onChange={handleChange}
                                required={true}
                            />
                        </FormGroup>
                        {loginRegistration === "registration" && (
                            <>
                                <div>
                                    Signature:
                                    <div>
                                        <canvas
                                            ref={canvasRef}
                                            width={534}
                                            height={221}
                                            onMouseDown={startDrawing}
                                            onMouseUp={stopDrawing}
                                            onMouseMove={draw}
                                            className={"signatureCanvas"}
                                        />
                                        <div>
                                            <Button
                                                variant={"primary"}
                                                type={"submit"}
                                                onClick={saveSignatureInForm}
                                            >
                                                გაგზავნა
                                            </Button>
                                            <Button
                                                variant={"primary"}
                                                type={"button"}
                                                onClick={clearCanvas}
                                            >
                                                გასუფთავება
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className={"d-flex justify-content-end"}>
                            {loginRegistration === "login" && (
                                <Button variant={"primary"} type={"submit"}>
                                    შესვლა
                                </Button>
                            )}
                            {loginRegistration !== "login" && (
                                <Button
                                    variant={"primary"}
                                    type={"button"}
                                    onClick={() => {
                                        setLoginRegistration('login');
                                        setUserForm(defaultForm);
                                    }}
                                >
                                    უკან დაბრუნება
                                </Button>
                            )}
                            {loginRegistration !== "registration" && (
                                <Button
                                    variant={"primary"}
                                    type={"button"}
                                    onClick={() => {
                                        setLoginRegistration("registration");
                                        setUserForm(defaultForm);
                                    }}
                                >
                                    რეგისტრაცია
                                </Button>
                            )}
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
};
