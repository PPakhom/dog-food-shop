import React, {useState} from "react";
import Search from "../Search/Search"
import "./header.css";
import Logo from "../../templates/Icons/logo-dogfood.svg";
// import {ReactComponent as Logo} from "../../templates/Icons/logo-dogfood.svg";
import {ReactComponent as Favorites} from "../../templates/Icons/ic-favorites.svg";
import {ReactComponent as Cart} from "../../templates/Icons/ic-cart.svg";
// import {ReactComponent as Logo} from "../../templates/images/logo-dogfood1.svg";

export default ({user, setUser, products}) => {
    // хук состояние [свойство, функция, в качестве аргумента которой передаётся новое значение свойства] = useState(аргумента - изначальное значение свойства)
    // const [user, setUser] = useState(localStorage.getItem("user8"));

    // let user = localStorage.getItem("user8");
    const logIn = (e) => {
        e.preventDefault();
        let name = prompt("Как вас ховут?");
        if (name) {
            localStorage.setItem("user8", name);
            setUser(name);
        }
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user8");
        setUser("");
    }
    return (
        <header>
            <div className="header__top">
                <a className="logo" href="/" title="Магазин корма для собак">
                    <img src={Logo} alt="Логотип DogFood"/>
                    {/* <Logo/> */}
                </a>
                <div className="header__catalog" href=""><button><i className="fa-solid fa-list"></i>Каталог</button></div>
                <Search data={products}/>
                {/* <input type="search" placeholder="Поиск..." className="search"/> */}
                {/* <div className="cart">
                    <a className="icon" href="">
                        <Cart/>
                    </a>        
                </div> */}
                <span className="favorites">
                    <a className="favorites__icon" href="">
                        <Favorites/>
                    </a>        
                </span>
                <span className="cart">
                    <a className="cart__icon" href="">
                        <Cart/>
                    </a>
                </span>        
                <nav className="menu">
                    {/* true && true */}
                    {user && <a href="">{user}</a>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                    {user && <a href="" onClick={logOut}>Выйти</a>}
                </nav>
            </div>
            <div className="header__bottom">
                <h2 className="h2">Крафтовые лакомства для собак</h2>
                <p>Всегда свежие лакомства ручной работы с доставкой на дом по России и Миру</p>
            </div>
        </header>
    )
}

// <header></header>, <footer></footer>, <main></main>, <section></section>, <nav></nav>, <aside></aside>, <article></article> => div
