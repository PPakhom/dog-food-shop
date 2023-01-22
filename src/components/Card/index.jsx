import React from "react";
import "./index.css"
import {ReactComponent as Icon_heart_solid} from "../../templates/Icons/heartpaw-solid.svg";
import {ReactComponent as Icon_heart_regular} from "../../templates/Icons/heartpaw-regular.svg";

export default ({text, like}) => {
    return <div className="card">
        <span className="card__heart">
            {
                like
                // ? <i className="fa-solid fa-heart"></i>
                // : <i className="fa-regular fa-heart"></i>
                ? <i><Icon_heart_solid/></i>
                : <i><Icon_heart_regular/></i>
            }
        </span>

        {(text.discount && text.discount > 0) && <span className="discount">{`-${text.discount}%`}</span>}
        {(text.pictures) && <img src={text.pictures} alt="Нет изображения"/>}
        {
            text.discount > 0
                ? <span className="price">{text.price} ₽</span>
                : <span className="price price__transparent">{text.price} ₽</span>
        } 
        <span className="price__discount">
            {
                text.discount > 0
                ? <span className="price__red">{text.price - text.price * text.discount / 100} ₽</span>
                : (text.discount) ? <span>{text.price - text.price*text.discount / 100} ₽</span> : ""
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
}