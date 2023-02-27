import React, {useState, useContext} from "react";
import "./style.css";
import {ReactComponent as CloseIcon} from "../../templates/Icons/bone-close.svg"
import Ctx from "../../Ctx";

import Signup from "./Signup";
import Login from "./Login";

export default () => {
    const [auth, setAuth] = useState(true);
    const {modalActive, setModalActive} = useContext(Ctx);
    let style = {
        display: modalActive && "flex"
    }
    return <div className="modal-container" style={style}>
        <div className="modal">
            <div className="modal-close" onClick={() => setModalActive(false)}><CloseIcon/></div>
            <h2>{auth ? "Войти" : "Регистрация"}</h2>
            {auth
                ?
                <Login change={setAuth} close={setModalActive}/>
                :
                <Signup change={setAuth} close={setModalActive}/>}
        </div>
    </div>
}
