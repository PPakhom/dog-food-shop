import React, {useContext} from "react";
import Card from "../components/Card/Card.jsx";
import {Link} from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {EmojiFrown} from "react-bootstrap-icons";
import Ctx from "../Ctx.js"

export default () => {
    const {visibleGoods, user, PATH} = useContext(Ctx);

    const flagHome = false;

    return <div className="form-container">
        {user && <>
            {visibleGoods.length > 0
                ? <>
                    <Row>
                        <Col xs={5} md={5} className="h1 catalog">
                            <div>Каталог товаров</div>
                        </Col>
                    </Row>    



                    {/* <div className="catalog-header">
                        <h1>Каталог товаров</h1>
                    </div> */}
                    <div className="cards">
                        {/* Опасно! Работают профи, не пытайтесь повторить это сами!  */}
                        { 
                            visibleGoods.map((el, i) => 
                            <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                <Card key={"card_" + i} data={el} like={(i + 1) % 2 === 0}  flagHome={flagHome}/>
                            </Link>)
                        }
                    </div>
                </>
                : <div className="empty-block">
                    <EmojiFrown/>
                    <p>Простите, по вашему запросу товаров не найдено</p>
                    <Link to={PATH} className="empty-block__btn-main">На главную</Link>
                </div>
            }
        </>}
        {!user && <div className="empty-block">
            <EmojiFrown/>
            <p>Простите, у вас нет доступа к товарам без авторизации</p>
            <Link to={PATH} className="empty-block__btn-main">На главную</Link>
        </div>}
    </div>
}