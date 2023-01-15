import React from "react";
import "./index.css"

export default ({text, like}) => {
    // console.log(like);
    return <div className="card">
        <span className="mark">
            {`-${text.discount}%`}
        </span>
        <img src={text.pictures} alt="Нет изображения" />
        {text.name}
        <span className="card__heart">
            {
                like
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            }
        </span>
    </div>
}