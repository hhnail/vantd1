import './App.css';
import Home from "./page/Home";
import Login from "./page/Login";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        console.log(localStorage.getItem("userLogin"))
    }, [])

    return (<>
        {
            localStorage.getItem("userLogin")
                ? <Home/>
                : <Login/>
        }
    </>)
}

export default App;