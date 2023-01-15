import React, {useState} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
// import Search from "./components/Search/search"

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

const smiles = ["^_^", "=)", "O_o", ";(", "^_0", "@_@", "-_-"];

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user8"));
    return (
        <div className="container">
            <Header user={user} setUser={setUser} products={products}/>
            <main>
                {/* <Search data={products}/> */}
                {user ? <Catalog data={products}/> : <Home data={smiles}/>}
            </main>
            <Footer/>
        </div>
    )
}
export default App;