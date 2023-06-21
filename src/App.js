import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Main from "./main/components/mainComponents/Main";
import {useEffect, useState} from "react";
import {LoginComponent} from "./main/components/loginComponent/LoginComponent";

export default function App() {
    let user = localStorage.getItem('user');

    useEffect(() => {

    }, [user]);

    return (
        <ChakraProvider>
            <div className="App">
                {
                    user === null || user === undefined ?
                        <LoginComponent/>
                        :
                        <Main/>
                }
                </div>
        </ChakraProvider>
    );
}