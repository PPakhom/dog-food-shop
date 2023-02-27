import React, { useContext, useState } from "react";
import "./card.css"

import {ReactComponent as Icon_heart_solid} from "../../templates/Icons/heartpaw-solid.svg";
import {ReactComponent as Icon_heart_regular} from "../../templates/Icons/heartpaw-regular.svg";
import NoPhoto from "../../templates/Images/no_photo.png"
import { priceDiscount } from "../../utils/functions";

import Ctx from "../../Ctx";

export default ({data, flagHome}) => {
    const {user, setFavorites, api, setGoods, setVisibleGoods, setBasket} = useContext(Ctx);
    const [like, setLike] = useState(data.likes && data.likes.includes(user._id));
    // const [flag, setFlag] = useState(false);

    const update = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // setFlag(true);
        setLike(!like); // false => true
        api.setLike(data._id, like) // false
            .then(res => res.json())
            .then(data => {
                setFavorites(prev => {
                    let arr = prev.filter(el => el._id === data._id);
                    return arr.length > 0 ? 
                        prev.filter(el => el._id !== data._id) : 
                        [...prev, data]
                })
                setGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
                setVisibleGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
            })
    }

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === data._id);
            if(test.length) {
                return prev.map(el => {
                    if(el.id === data._id) {
                        el.cnt++;
                    }
                    return el;
                })
            } else return [...prev, {id: data._id, cnt: 1}]; 
        })
    }
    
    return (
        <div className="card" style={{borderRadius: "1em", justifyContent: "space-between"}}>
            <span className="card__heart" onClick={update}>
                {
                    like
                    ? <Icon_heart_solid/>
                    : <Icon_heart_regular/>
                }
            </span>
    
            {data.discount > 0 && <span className="discount">{`-${data.discount}%`}</span>}
            <div className="card__img"><img src={data.pictures ? data.pictures : String(NoPhoto)} alt={data.name}/></div>
            <div className="block-price">
                {
                    data.discount > 0
                        ? <div className="price">{data.price} ₽</div>
                        : <div className="price price__transparent">{data.price} ₽</div>
                } 
                <div className="price__discount">
                    {
                        data.discount > 0
                        ? <div className="price__red">{priceDiscount(data.price, data.discount).toFixed(2)} ₽</div>
                        : (data.discount === 0) && <div>{priceDiscount(data.price, data.discount).toFixed(2)} ₽</div>
                    }
                </div>
                {data.wight && <div className="wight">{data.wight}</div>}
            </div>
            <div className="name">{data.name}</div>
            { 
                !flagHome && 
                <div className="add__cart">
                    <button className="btn" onClick={buy}>В корзину</button>
                </div>
            }
        </div>
    )
}