import React from "react";
import Card from "../components/Card/Card";
import AdBannerImage from "../templates/Images/dry-dog-food.png"
import AdCard1 from "../templates/Images/ad21.png"
import AdCard2 from "../templates/Images/ad22.png"

import Ads from "../components/Ads/Ads";

export default ({data}) => {
    const dataAds = [
        {
            className: "ad",
            text1: `Подарок за\nпервый заказ!`,
            text2: "Сухой корм для собак",
            picture: String(AdBannerImage),
            alt: "Приветственный банер",
            symbol: "%"
        },
        {
            className: "ad",
            text1: `Рога\nсеверного\nоленя`,
            text2: "от 10 до 30 кг",
            picture: String(AdCard1),
            alt: "Реклама 1",
            symbol: ""
        },
        {
            className: "ad mobile-none",
            text1: `Печенья\nс яблоком\n`,
            text2: "от 340 ₽",
            picture: String(AdCard2),
            alt: "Реклама 2",
            symbol: ""
        }
    ];

    return (
        <div className="main-page">
            <div className="ads">
                {dataAds.map((el, i) => {
                    return <>
                        {(i === 0 ) && <Ads key={"ads_" + i} data={el}/>}
                    </>    
                })}
            </div>
     
            <div className="cards">
                {data.map((el, i) => {
                        return <>
                        {i < 6 && <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>}
                    </>    
                })}
            </div>
     
            <div className="ads">
                {dataAds.map((el, i) => {
                    return <>
                        {(i > 0 && i <3) && <Ads key={"ads_" + i} data={el}/>}
                    </>    
                })}
            </div>
    
            <div className="cards">
                {data.map((el, i) => {
                        return <>
                        {(i > 5 && i < 12 ) && <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>}
                    </>    
                })}
            </div>
        </div>
    )    
}   
        