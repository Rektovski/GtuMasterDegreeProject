import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Main from "./main/components/mainComponents/Main";
import {useEffect, useState} from "react";
import {LoginComponent} from "./main/components/loginComponent/LoginComponent";

export default function App() {
    const [user, setUser] = useState("");

    const getUser = () => {
        setUser(localStorage.getItem('user'));
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <ChakraProvider>
            <div className="App">
                {
                    user === "otarim" ?
                        <Main/>
                        :
                        <LoginComponent/>
                }
            </div>
        </ChakraProvider>
    );
}