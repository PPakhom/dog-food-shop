import React, {useState} from "react";
import Search from "../Search/search"
import "./header.css";

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
    return <header>
        <a className="logo" href="">DogFood</a>
        <Search data={products}/>
        {/* <input type="search" placeholder="Поиск..." className="search"/> */}
        <nav className="menu">
            {/* true && true */}
            {user && <a href="">{user}</a>}
            {!user && <a href="" onClick={logIn}>Войти</a>}
            {user && <a href="" onClick={logOut}>Выйти</a>}
        </nav>
    </header>
}

// <header></header>, <footer></footer>, <main></main>, <section></section>, <nav></nav>, <aside></aside>, <article></article> => div
