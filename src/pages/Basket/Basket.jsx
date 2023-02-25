import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Table} from "react-bootstrap";
import {EmojiFrown} from "react-bootstrap-icons";
import "./basket.css";

import { priceDiscount } from "../../assets/functions";

import Ctx from "../../Ctx";
import Row from "../../components/Row/Row";

export default () => {
    const [gds, setGds] = useState([]);
    const {basket, goods, PATH} = useContext(Ctx);

    useEffect(() => {
        let arr = [];
        if (goods.length) {
            basket.forEach(el => {
                arr.push(goods.filter(g => g._id === el.id)[0])
            })
        }
        setGds(arr);
    }, [basket, goods])

    useEffect(() => {
        if(basket.length === 0) {
            localStorage.removeItem("basket8");
        }
    })

    return <div className="basket-container">
        {
            basket.length > 0 && gds.length > 0
            ? <> 
                <Link to={PATH + "catalog"} className="btn-back">
                <i className="fa-solid fa-chevron-left"></i>Назад
                </Link>
                <h1>Корзина</h1>
                {basket.length > 0 && gds.length > 0 && <Table hover>
                    <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Количество</th>
                            <th>В наличии</th>
                            <th>Сумма</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map((el, i) => <Row key={el.id} {...gds[i]} {...el} />)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="text-end fw-bold fs-3">ИТОГО:</td>
                            <td className="fw-bold fs-3">
                                {(basket.reduce((acc, el, i) => {
                                    acc += el.cnt * priceDiscount(gds[i].price, gds[i].discount);
                                    return acc;
                                }, 0)).toFixed(2)}₽
                            </td>
                        </tr>
                    </tfoot>
                </Table>}
            </>
            : <div className="empty-block">
                <EmojiFrown/>
                <p>Вы ещё не добавили ни одного товара в корзину</p>
                <Link to={PATH} className="empty-block__btn-main">На главную</Link>
            </div>
        }
    </div>
}