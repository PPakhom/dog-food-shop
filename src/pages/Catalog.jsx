import React from "react";
import Card from "../components/Card/Card";
import AdBannerImage from "../templates/Images/dry-dog-food.png"
import AdCard1 from "../templates/Images/reindeer-antlers.jpg"
import AdCard2 from "../templates/Images/training-set.jpg"
// import Promotion1 from "../templates/Images/reindeer-antlers.jpg"
// import Promotion2 from "../templates/Images/training-set.jpg"

export default ({data}) => {
    return (
        <div className="main-page">
            <div className="ad-banner">
                <div>
                    <h2>Подарок за<br/>первый заказ!</h2>
                    <p>Сухой корм для собак</p>
                </div>
                {/* <div className="ad-banner__pic" style={{ backgroundImage: `url(${Image})`}}></div> */}
                <div className="ad-banner__img" style={{ backgroundImage: `url(${AdBannerImage})`}}></div>
                {/* <img className="ad-banner__img" src={AdBannerImage} /> */}
                <div className="ad-banner__proc">%</div>
            </div>
     
            <div className="cards">
                {data.map((el, i) => {
                        return <>
                        {i < 6 && <Card key={"card_" + i} text={el} like={(i + 1) % 2 === 0}/>}
                    </>    
                })}
            </div>
     
            {/* <div className="ads">
                <div className="ad ads__mobile" style={{ backgroundImage: `url(${AdCard1})`}}></div>    
                <div className="ad" style={{ backgroundImage: `url(${AdCard2})`}}></div>
            </div> */}

            <div className="ads">
                <div className="ad ads__mobile"><img src={AdCard1} alt="Реклама 1"/></div>
                <div className="ad"><img src={AdCard2} alt="Реклама 2"/></div>
            </div>




            {/* <div className="promotion">
                <div className="promotion__card promotion__card__mobile" style={{ backgroundImage: `url(${Promotion1})`}}></div>    
                <div className="promotion__card" style={{ backgroundImage: `url(${Promotion2})`}}></div>
            </div> */}
    
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
        