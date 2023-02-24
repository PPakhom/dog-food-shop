import React from "react";
import "./ads.css";

export default ({data}) => {
    return (
        <div className={data.className} style={{
                background: data.background
            }}>
            <div className="ad__text" style={{
                    background: data.backgroundLeftSide,
                    color: data.color
                }}>
                <h2>{data.textLeftSideTop}</h2>
                <p>{data.textLeftSideBottom}</p>
            </div>
            <div className="ad__img" style={{
                    background: data.backgroundRightSide,
                    color: data.color
                }}>
                <img src={data.picture} alt={data.alt} style={{
                    height: data.imageWidth
                }}/>
                <div className="ad__symbol">
                    {data.symbol}
                </div>
            </div>
        </div>
    )    
}   