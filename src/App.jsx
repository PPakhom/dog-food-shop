import React, {useState} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

const smiles = ["^_^", "=)", "O_o", ";(", "^_0", "@_@", "-_-"];

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user8"));
    const [modalActive, setModalActive] = useState(false);
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
                    {/* <Search data={products}/> */}
                    {user ? <Catalog data={products}/> : <Home data={smiles}/>}
                </main>
                <Footer/>
            </div>
            <Modal isActive={modalActive} setState={setModalActive}/>
        </>
    )
}
export default App;