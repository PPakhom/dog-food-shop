import React, {useState} from "react";
import "./style.css";
import {ReactComponent as CloseIcon} from "../../templates/Icons/bone-close.svg"

import Signup from "./Signup";
import Login from "./Login";

export default ({isActive, setState, api, setToken}) => {
    const [auth, setAuth] = useState(true);
    let style = {
        display: isActive && "flex"
    }
    return <div className="modal-container" style={style}>
        <div className="modal">
            <div className="modal-close" onClick={() => setState(false)}><CloseIcon/></div>
            <h2>{auth ? "Войти" : "Регистрация"}</h2>
            {auth
                ?
                <Login change={setAuth} api={api} close={setState} setToken={setToken}/>
                :
                <Signup change={setAuth} api={api} close={setState} setToken={setToken}/>}
        </div>
    </div>
}