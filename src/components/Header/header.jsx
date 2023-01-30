import React, {useState} from "react";
import Search from "../Search/Search"
import "./header.css";
// import Logo from "../../templates/Icons/logo-dogfood.svg";
import {ReactComponent as Logo} from "../../templates/Icons/logo-dogfood.svg";
import {ReactComponent as Favorites} from "../../templates/Icons/ic-favorites.svg";
import {ReactComponent as Cart} from "../../templates/Icons/ic-cart.svg";
// import {ReactComponent as Logo} from "../../templates/images/logo-dogfood1.svg";

export default ({user, setUser, products, setModalActive}) => {
    // хук состояние [свойство, функция, в качестве аргумента которой передаётся новое значение свойства] = useState(аргумента - изначальное значение свойства)
    // const [user, setUser] = useState(localStorage.getItem("user8"));

    // let user = localStorage.getItem("user8");
    const logIn = (e) => {
        e.preventDefault();
// тут
        let name = prompt("Как вас зовут?");
        if (name) {
            localStorage.setItem("user8", name);
            setUser(name);
        }
// конец        
        // setModalActive(prev => !prev);
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user8");
        setUser("");
    }
    return (
        <header>
            <div className="header__top">
                <span className="logo">
                    <a className="logo__icon" href="/" title="Магазин корма для собак">
                        {/* <img src={Logo} alt="Логотип DogFood"/> */}
                        <Logo/>
                    </a>
                </span>
                <div className="header__catalog" href=""><button><i className="fa-solid fa-list"></i>Каталог</button></div>
                <Search data={products}/>
                {/* <input type="search" placeholder="Поиск..." className="search"/> */}
                {/* <div className="cart">
                    <a className="icon" href="">
                        <Cart/>
                    </a>        
                </div> */}
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
                    {user && <a href="">{user}</a>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                    {user && <a href="" onClick={logOut}>Выйти</a>}
                </nav>
            </div>
            <div className="header__bottom">
                <h2 className="h2">Крафтовые<br/>лакомства для<br/>собак</h2>
                <p>Всегда свежие лакомства ручной работы<br/>с доставкой на дом по России и Миру</p>
            </div>
        </header>
    )
}

// <header></header>, <footer></footer>, <main></main>, <section></section>, <nav></nav>, <aside></aside>, <article></article> => div
