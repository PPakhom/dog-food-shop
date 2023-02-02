import React, {useEffect, useState} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

import {Api} from "./Api";

const smiles = ["^_^", "=)", "O_o", ";(", "^_0", "@_@", "-_-"];

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user8"));
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        console.log("Hello");
        console.log(token);
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
        console.log("Change token");
        setApi(new Api(token));
        setUser(localStorage.getItem("user8"));
    }, [token]);

    useEffect(() => {
        if(!user) {
            localStorage.removeItem("token8");
            setToken(null);
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

    return (
        <>
            <div className="container">
                <Header 
                    user={user}
                    setUser={setUser}
                    products={products}
                    setModalActive={setModalActive}
                />
                <main>
                    {/* {user ? <Catalog data={goods}/> : <Home data={smiles}/>} */}
                    {user ? <Catalog data={goods}/> : <Catalog data={products}/>}
                </main>
                <Footer/>
            </div>
            <Modal isActive={modalActive} setState={setModalActive} api={api} setToken={setToken}/>
        </>
    )
}
export default App;