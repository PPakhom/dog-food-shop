import React from "react";
import Card from "../components/Card";
import Image from "../templates/Images/dry-dog-food.png"
// import {ReactComponent as Image} from "../templates/Images/dry-dog-food.png"
import Promotion1 from "../templates/Images/reindeer-antlers.jpg"
import Promotion2 from "../templates/Images/training-set.jpg"

export default ({data}) => {
return <>
        <div className="banner">
            <div>
                <h2>Подарок за<br/>первый заказ!</h2>
                <p>Сухой корм для собак</p>
            </div>
            <div className="banner__pic" style={{ backgroundImage: `url(${Image})`}}></div>
            {/* <div className="banner__pic"><Image/></div> */}
            <div className="banner__proc">%</div>
        </div>
        <div className="cards">
            {data.map((el, i) => {
                    console.log(el);
                    return <>
                    {i < 8 && <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>}
                </>    
            })}
        </div>
        <div className="promotion">
            <div className="promotion__card promotion__card__mobile" style={{ backgroundImage: `url(${Promotion1})`}}></div>    
            <div className="promotion__card" style={{ backgroundImage: `url(${Promotion2})`}}></div>
        </div>
        <div className="cards">
            {data.map((el, i) => {
                    console.log(el);
                    return <>
                    {(i > 7 && i < 16 ) && <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>}
                </>    
            })}
        </div>
    </>
}   
        