import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Main from "./main/components/mainComponents/Main";
import {useEffect} from "react";
import {LoginComponent} from "./main/components/loginComponent/LoginComponent";
import HackingPage from "./main/components/hackingPage/HackingPage";

export default function App() {
    let user = localStorage.getItem('user');

    useEffect(() => {

    }, [user]);

    return (
        <ChakraProvider>
            <div className="App">
                {
                    localStorage.getItem('pcAuthorized') === null ? <HackingPage/>
                        : user === null || user === undefined ?
                            <LoginComponent/>
                            :
                            <Main/>
                }
            </div>
        </ChakraProvider>
    );
}