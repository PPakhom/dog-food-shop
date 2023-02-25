import React, {useContext, useEffect, useState} from "react";
import Card from "../components/Card/Card.jsx";
import {Link} from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {EmojiFrown, SortNumericDown, SortNumericUp} from "react-bootstrap-icons";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination/";

import Ctx from "../Ctx.js"

export default () => {
    const {visibleGoods, user, PATH} = useContext(Ctx);
    const [sortGoods, setSortGoods] = useState(visibleGoods);
    const paginate = usePagination(sortGoods, 12);
    const flagHome = false;

    const [btnType, setBtnType] = useState("");
    let st = {
        display: "flex",
        gap: "10px"
    }
    const updSort = (e) => {
        let el = e.currentTarget;
        let flag = false;
        if (el.classList.contains("sort")) {
            el.classList.remove("sort");
            setBtnType("");
            flag = true;
        } else {
            el.classList.add("sort");
            setBtnType(el.title);
        }
        if (flag) {
            setSortGoods(visibleGoods);
        } else {
            let data = [...visibleGoods];
            switch (el.title) {
                case "down": 
                    data.sort((a,b) => a.price - b.price);
                    break;
                case "up": 
                    data.sort((a,b) => b.price - a.price);
                    break;
                case "new": 
                    data = data.filter(d => d.tags.includes("new"));
                    break;
                case "sale": 
                    data = data.filter(d => d.discount > 0);
                    break;
            }
            setSortGoods(data);
        }
    }
    useEffect(() => {
        if (sortGoods.length === 0) {
            setSortGoods(visibleGoods);
        }
    }, [visibleGoods]); 




    // const [flagLoad, setFlagLoad] = useState(false);
    // console.log("1", flagLoad);
    // useEffect (() => {
    //     console.log(visibleGoods);
    //     window.onload = function() {
    //         setFlagLoad(true);
    //         console.log("2", flagLoad);
    //     }    
    // }, [visibleGoods])





    return <div className="form-container">
        { 
            user && <>
                { 
                    visibleGoods.length > 0
                    ? <>
                        <Row>
                            <Col xs={5} md={5} className="h1 catalog">
                                <div>Каталог товаров</div>
                            </Col>
                        </Row>    

                        <div style={st}>
                            <button className={`btn ${btnType === "up" ? "sort" : ""}`} title="up" onClick={updSort}><SortNumericUp/> цены</button>
                            <button className={`btn ${btnType === "down" ? "sort" : ""}`} title="down" onClick={updSort}><SortNumericDown/> цены</button>
                            <button className={`btn ${btnType === "new" ? "sort" : ""}`} title="new" onClick={updSort}>Новинки</button>
                            <button className={`btn ${btnType === "sale" ? "sort" : ""}`} title="sale" onClick={updSort}>Скидка</button>
                        </div>
                        <Pagination hook={paginate}/>

                        {/* <div className="catalog-header">
                            <h1>Каталог товаров</h1>
                        </div> */}
                        <div className="cards">
                            {/* Опасно! Работают профи, не пытайтесь повторить это сами!  */}
                            { 
                                // visibleGoods.map((el, i) => 
                                // <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                //     <Card key={"card_" + i} data={el} like={(i + 1) % 2 === 0}  flagHome={flagHome}/>
                                // </Link>)
                            }
                            {
                                paginate.setPageData().map((el, i) => 
                                <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                    <Card key={"card_" + i} data={el} flagHome={flagHome}/>
                                </Link>)
                            }

                        </div>
                    </>
                    : <div className="empty-block">
                        <EmojiFrown/>
                        <p>Простите, по вашему запросу товаров не найдено</p>
                        <Link to={PATH} className="empty-block__btn-main">На главную</Link>
                    </div>

                    // : <>
                    //     {  
                    //         flagLoad
                    //         ? <div className="empty-block">
                    //             <EmojiFrown/>
                    //             <p>Простите, по вашему запросу товаров не найдено</p>
                    //             <Link to={PATH} className="empty-block__btn-main">На главную</Link>
                    //         </div>
                    //         : <div className="empty-block">
                    //             <p>Товары загружаются</p>
                    //         </div>
                    //     }    
                    // </>
                }
            </>
        }
        { 
            !user && <div className="empty-block">
                <EmojiFrown/>
                <p>Простите, у вас нет доступа к товарам без авторизации</p>
                <Link to={PATH} className="empty-block__btn-main">На главную</Link>
            </div>
        }
    </div>
}