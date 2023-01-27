import React from "react";
import "./card.css"
import {ReactComponent as Icon_heart_solid} from "../../templates/Icons/heartpaw-solid.svg";
import {ReactComponent as Icon_heart_regular} from "../../templates/Icons/heartpaw-regular.svg";

export default ({text, like}) => {
    // const priceDiscount = () => {
    //     if (text.discount) {
    //         return text.price - text.price * text.discount / 100;
    //     }
    //     updateText("");
    //     setSearchData(data);
    // }
    return (
        <div className="card">
            <span className="card__heart">
                {
                    like
                    // ? <i className="fa-solid fa-heart"></i>
                    // : <i className="fa-regular fa-heart"></i>
                    ? <Icon_heart_solid/>
                    : <Icon_heart_regular/>
                }
            </span>
    
            {(text.discount > 0) && <span className="discount">{`-${text.discount}%`}</span>}
            {(text.pictures) && <div className="card__img"><img src={text.pictures} alt="Изображение товара"/></div>}
            {
                text.discount > 0
                    ? <span className="price">{text.price} ₽</span>
                    : <span className="price price__transparent">{text.price} ₽</span>
            } 
            <span className="price__discount">
                {
                    text.discount > 0
                    ? <span className="price__red">{text.price - text.price * text.discount / 100} ₽</span>
                    : (text.discount === 0) && <span>{text.price - text.price * text.discount / 100} ₽</span>
                }
            </span>
            {text.wight && <span className="wight">{text.wight}</span>}
            {
                (text.name)
                ? <>
                      <span className="name">{text.name}</span>
                      <div className="add__cart"><button>В корзину</button></div> 
                  </>
                : <span className="name">{text}</span>
            } 
        </div>
    )
}