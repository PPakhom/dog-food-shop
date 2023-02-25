import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product/Product.jsx";
import AddForm from "./pages/AddForm";

import Favorites from "./pages/Favorites/Favorites.jsx";
// import Fake from "./pages/Fake";
import Basket from "./pages/Basket/Basket.jsx";


import {Api} from "./Api";
import Ctx from "./Ctx";

// const PATH = "/";
const PATH = "/dog-food-shop/";

// const smiles = ["^_^", "=)", "O_o", ";(", "^_0", "@_@", "-_-"];

const App = () => {
    let usr = localStorage.getItem("user8");
    if  (usr) {
        usr = JSON.parse(usr);
    }
    const [user, setUser] = useState(usr);
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState(localStorage.getItem("basket8") ? JSON.parse(localStorage.getItem("basket8")) : []);

    useEffect(() => {
        if (token) {
            // загрузить данные с сервера
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, []);

    useEffect(() => {
        setApi(new Api(token));
        let usr = localStorage.getItem("user8");
        if  (usr) {
            usr = JSON.parse(usr);
        }
        setUser(usr);
    }, [token]);

    useEffect(() => {
        if(!user) {
            localStorage.removeItem("token8");
            setToken(null);
            setGoods(products);
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            // загрузить данные с сервера            
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [api]);

    useEffect (() => {
        setVisibleGoods(goods);
    }, [goods])

    useEffect(() => {
        setFavorites(goods.filter(el => {
            // Найти только те товары, в которых свойство likes ([]) включает в себя id моего пользователя
            return el.likes && el.likes.includes(user._id);
        }))
    }, [goods])
    
    useEffect(() => {
        setFavorites(goods.filter(el => {
            // Найти только те товары, в которых свойство likes ([]) включает в себя id моего пользователя
            return el.likes && el.likes.includes(user._id);
        }))
    }, [goods])

    useEffect(() => {
        localStorage.setItem("basket8", JSON.stringify(basket));
    }, [basket]);
    
    return (
        <Ctx.Provider value={{
            user: user,
            setUser: setUser,
            token: token,
            setToken: setToken,
            api: api,
            setApi: setApi,
            modalActive: modalActive,
            setModalActive: setModalActive,
            goods: goods,
            setGoods: setGoods,
            visibleGoods: visibleGoods,
            setVisibleGoods: setVisibleGoods,
            favorites: favorites,
            setFavorites: setFavorites,
            basket,
            setBasket,
            PATH: PATH
        }}>
            <div className="wrapper">
                <Header/>
                <main>
                    <Routes>
                        <Route path={PATH} element={<Home data={!user ? products : visibleGoods}/>}/>
                        <Route path={PATH + "catalog"} element={<Catalog/>}/>
                        <Route path={PATH + "profile"} element={<Profile/>}/>
                        <Route path={PATH + "catalog/:id"} element={<Product/>}/>
                        <Route path={PATH + "add"} element={<AddForm/>}/>
                        <Route path={PATH + "edit/:id"} element={<AddForm/>}/>
                        <Route path={PATH + "favorites"} element={<Favorites/>}/>
                        <Route path={PATH + "basket"} element={<Basket />} />
                   </Routes>
                </main>
                <Footer/>
            </div>
            <Modal/>
        </Ctx.Provider>
    )
}
export default App;