import './App.css';
import Home from "./page/Home";
import Login from "./page/Login";
import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import StaffDesktop from "./page/StaffDesktop";

function App() {

    useEffect(() => {
        console.log(localStorage.getItem("userLogin"))
    }, [])

    return (<div style={{
        overflowX: 'hidden',
    }}>
        {/* TODO 路由，，，，*/}
        {/*<Routes>*/}
        {/*    <Route path="/" element={*/}
        {/*        localStorage.getItem("userLogin")*/}
        {/*            ? <Home/>*/}
        {/*            : <Login/>*/}
        {/*    }/>*/}
        {/*</Routes>*/}
        <Home/>
    </div>)
}

export default App;