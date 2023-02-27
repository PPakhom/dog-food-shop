import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Search from "../Search/Search"
import "./header.css";
import Ctx from "../../Ctx";

import { PATH } from "../../utils/functions";

import { ReactComponent as Logo } from "../../templates/Icons/logo-dogfood.svg";
import { PlusCircle } from "react-bootstrap-icons";

export default () => {
    const {user, setModalActive, favorites, basket} = useContext(Ctx);
 
    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
    }
    return (
        <header>
            <div className="header__top">
                <span className="logo">
                    <Link className="logo__icon" to={PATH} title="Магазин корма для собак">
                        <Logo/>
                    </Link>
                </span>
                <div className="header__catalog">
                    <Link to={PATH + "catalog"} className="btn-catalog" title="Каталог">Каталог</Link>
                </div>
                <Search/>
                <nav className="menu">
                        { 
                        user && <>
                            <div className="header__icons">
                                <Link to={PATH + "add"} title="Добавить товар">
                                    <PlusCircle style={{fontSize: "20px"}}/>
                                </Link>

                                <div className="favorites">
                                    <Link to={PATH + "favorites"} className="badge-link" title="Избранное">
                                        <i className="fa-solid fa-heart"></i>
                                        <Badge bg="light" text="dark">
                                            {favorites.length}
                                        </Badge>
                                    </Link>
                                </div>

                                <div className="cart">
                                    <Link to={PATH + "basket"} className="badge-link" title="Корзина">
                                        <i className="fa-solid fa-cart-plus"></i>
                                        <Badge bg="light" text="dark">
                                            {basket.reduce((acc, el) => acc + el.cnt, 0)}
                                        </Badge>
                                    </Link>
                                </div>        
                            </div>
                        </>
                        }
                    {user && user.name && <Link to={PATH + "profile"} title="Личный кабинет">{user.name}</Link>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                </nav>
            </div>
            <div className="header__bottom">
                <h2 className="h2">Крафтовые<br/>лакомства для<br/>собак</h2>
                <p>Всегда свежие лакомства ручной работы<br/>с доставкой на дом по России и Миру</p>
            </div>
        </header>
    )
}
