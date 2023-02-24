import React from "react";
import Card from "../components/Card/Card";
import AdBannerImage1 from "../templates/Images/banner1.jpg"
import AdBannerImage2 from "../templates/Images/banner2.png"
import AdCard1 from "../templates/Images/ad21.png"
import AdCard2 from "../templates/Images/ad22.png"

import Ads from "../components/Ads/Ads";

export default ({data}) => {
    const dataAds = [
        {
            className: "ad",
            background: "linear-gradient(90deg, rgba(62,215,255,1) 0%, rgba(192,192,192,1) 100%)",
            color: "#0b0444",
            textLeftSideTop: `Сделай жизнь\nпитомца интересней!`,
            textLeftSideBottom: "Игрушки для собак",
            picture: String(AdBannerImage1),
            alt: "Приветственный банер 1",
            symbol: ""
        },
        {
            className: "ad",
            background: "linear-gradient(90deg, rgba(150,12,47,1) 0%, rgba(28,212,148,1) 100%)",
            color: "silver",
            textLeftSideTop: `Рога\nсеверного\nоленя`,
            textLeftSideBottom: "от 10 до 30 кг",
            picture: String(AdCard1),
            alt: "Реклама 1",
            symbol: ""
        },
        {
            className: "ad mobile-none",
            backgroundLeftSide: "lightpink",
            backgroundRightSide: "lightblue",
            textLeftSideTop: `Печенья\nс яблоком\n`,
            textLeftSideBottom: "от 340 ₽",
            imageWidth: "90%",
            picture: String(AdCard2),
            alt: "Реклама 2",
            symbol: ""
        },
        {
        className: "ad",
            background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,215,0,1) 100%, rgba(255,255,0,1) 100%)",
            textLeftSideTop: `Подарок за\nпервый заказ!`,
            textLeftSideBottom: "Сухой корм для собак",
            picture: String(AdBannerImage2),
            alt: "Приветственный банер 2",
            symbol: "%"
        }
    ];

    const flagHome = true;

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
                        {i < 6 && <Card key={"card_" + i} data={el} like={(i + 1) % 2 === 0} flagHome={flagHome}/>}
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
                                {(i > 5 && i < 12 ) && <Card key={"card_" + i} data={el} like={(i + 1) % 2 === 0} flagHome={flagHome}/>}
                            </>    
                        })}
                    </div>

            <div className="ads">
                {dataAds.map((el, i) => {
                    return <>
                        {(i === 3 ) && <Ads key={"ads_" + i} data={el}/>}
                    </>    
                })}
            </div>
        </div>
    )    
}   
        