import React, {useState} from "react";
import "./style.css";
import {ReactComponent as CloseIcon} from "../../templates/Icons/bone-close.svg"

import Signup from "./Signup";
import Login from "./Login";

export default ({isActive, setState}) => {
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
                <Login change={setAuth}close={setState}/>
                :
                <Signup change={setAuth}close={setState}/>}
        </div>
    </div>
}