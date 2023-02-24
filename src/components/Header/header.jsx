import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Search from "../Search/Search"
import "./header.css";
import Ctx from "../../Ctx";

import {ReactComponent as Logo} from "../../templates/Icons/logo-dogfood.svg";
import {ReactComponent as Favorites} from "../../templates/Icons/ic-favorites.svg";
// import {ReactComponent as Cart} from "../../templates/Icons/ic-cart.svg";
import {PlusCircle} from "react-bootstrap-icons";

export default () => {
    // const {user, setUser, setModalActive, PATH} = useContext(Ctx);
    const {user, setModalActive, PATH} = useContext(Ctx);
 
    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
    }
    // const logOut = (e) => {
    //     e.preventDefault();
    //     localStorage.removeItem("user8");
    //     setUser("");
    // }
    return (
        <header>
            <div className="header__top">
                <span className="logo">
                    <Link className="logo__icon" to={PATH} title="Магазин корма для собак">
                        <Logo/>
                    </Link>
                </span>
                <div className="header__catalog">
                    <Link to={PATH + "catalog"} className="btn-catalog">Каталог</Link>
                </div>
                <Search/>
                <nav className="menu">
                    <div className="header__icons">
                        {user && <Link to={PATH + "add"}><PlusCircle style={{fontSize: "20px"}}/></Link>}
                        <div className="favorites">
                            <a className="favorites__icon" href="">
                            <i className="fa-solid fa-heart"></i>
                            </a>        
                        </div>
                        <div className="cart">
                            <a className="cart__icon" href="">
                                <i className="fa-solid fa-cart-plus"></i>
                            </a>
                        </div>        
                    </div>
                    {user && user.name && <Link to={PATH + "profile"}>{user.name}</Link>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                    {/* {user && <a href="" onClick={logOut}>Выйти</a>} */}
                </nav>
            </div>
            <div className="header__bottom">
                <h2 className="h2">Крафтовые<br/>лакомства для<br/>собак</h2>
                <p>Всегда свежие лакомства ручной работы<br/>с доставкой на дом по России и Миру</p>
            </div>
        </header>
    )
}