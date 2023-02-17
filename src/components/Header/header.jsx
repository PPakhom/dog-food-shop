import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Search from "../Search/Search"
import "./header.css";
import Ctx from "../../Ctx";

import {ReactComponent as Logo} from "../../templates/Icons/logo-dogfood.svg";
import {ReactComponent as Favorites} from "../../templates/Icons/ic-favorites.svg";
import {ReactComponent as Cart} from "../../templates/Icons/ic-cart.svg";

export default ({goods, searchGoods, setModalActive}) => {
    const {user, setUser} = useContext(Ctx);
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
                    <Link className="logo__icon" to="/" title="Магазин корма для собак">
                        <Logo/>
                    </Link>
                </span>
                <div className="header__catalog">
                    <Link to="/catalog" className="button">Каталог</Link>
                </div>
                <Search data={goods} searchGoods={searchGoods}/>
                <div className="header__icons">
                <div className="favorites">
                    <a className="favorites__icon" href="">
                        <Favorites/>
                    </a>        
                </div>
                <div className="cart">
                    <a className="cart__icon" href="">
                        <Cart/>
                    </a>
                </div>        
                </div>
                <nav className="menu">
                    {user && <Link to="/profile">{user}</Link>}
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