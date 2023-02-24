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

    return (
        <Ctx.Provider value={{
            user: user,
            token: token,
            api: api,
            modalActive: modalActive,
            goods: goods,
            visibleGoods: visibleGoods,
            setUser: setUser,
            setToken: setToken,
            setApi: setApi,
            setModalActive,
            setGoods,
            setVisibleGoods,
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
                    </Routes>
                </main>
                <Footer/>
            </div>
            <Modal/>
        </Ctx.Provider>
    )
}
export default App;