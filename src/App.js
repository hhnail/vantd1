import './App.css';
import Home from "./page/Home";
import Login from "./page/Login";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        console.log(localStorage.getItem("userLogin"))
    }, [])

    return (<div style={{
        overflowX: 'hidden',
    }}>
        {
            localStorage.getItem("userLogin")
                ? <Home/>
                : <Login/>
        }
    </div>)
}

export default App;