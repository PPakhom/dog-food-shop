import React, {useContext, useState, useEffect} from "react";
import {Image, Button, ButtonGroup} from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";

import "./row.css";

import { priceDiscount } from "../../utils/functions";

import Ctx from "../../Ctx";

export default ({name, pictures, cnt, price, discount, stock, id}) => {
    const {setBasket} = useContext(Ctx);
    const [n, setN] = useState(cnt);
    const [flag, setFlag] = useState(false);
    const [flagOver, setFlagOver] = useState(false);


    const increment = () => {
        if (n < stock) {
            setFlag(true);
            setN(n + 1);
            if (n + 1 === stock) {
                setFlagOver(true);
            } 
        }    
    }
    const decrement = () => {
        setFlag(true);
        setN(n - 1);
        setFlagOver(false);
    }

    const remove = () => {
        setN(0);
        setBasket(prev => prev.filter(el => el.id !== id))
    }

    useEffect(() => {
        if (flag) {
            setBasket(prev => {
                if (n) {
                    return prev.map(el => {
                        if (el.id === id) {
                            el.cnt = n;
                        }
                        return el;
                    })
                } else {
                    return prev.filter(el => el.id !== id);
                }
            })
        }
    }, [n]);

    return <tr className="align-middle">
        <td><Image src={pictures} alt={name} height="100"/></td>
        <td>{name}</td>
        <td>
            <ButtonGroup>
                <Button variant="warning" onClick={decrement}>-</Button>
                <Button variant="light" disabled>{n}</Button>
                <Button variant="warning" onClick={increment}>+</Button>
            </ButtonGroup>
        </td>
        <td><div className={!flagOver ? "basket__stock" : "basket__stock-red"}>{stock - n} шт.</div></td>
        <td>
            <div className="basket__price">
                <div className="price-top">
                {
                    discount > 0 && 
                    <span className="basket__discount">
                        {`-${discount}%`}
                    </span>}
                {
                    discount > 0
                        ? <div className="price">{(price *n).toFixed(2)} ₽</div>
                        : <div className="price price__transparent">{(price *n).toFixed(2)} ₽</div>
                }
                </div>
                <div className="price__discount">
                    {
                        discount > 0
                        ? <div className="price__red">{ (priceDiscount(price, discount)*n).toFixed(2) } ₽</div>
                        : (discount === 0) && <div>{ (priceDiscount(price, discount)*n).toFixed(2) } ₽</div>
                    }
                </div>
            </div>
        </td>
        <td>
        <div className="product__edit">
            <button 
                onClick={remove} 
                className="btn btnEdit" 
            >
                <Trash3/>
            </button>
        </div>
        </td>
    </tr>
}