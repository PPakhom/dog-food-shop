import React from "react";

export default ({data}) => {
    return (
        <div className={data.className}>
            <div className="ad__text">
                <h2>{data.text1}</h2>
                <p>{data.text2}</p>
            </div>
            <img src={data.picture} alt={data.alt}/>
            <div className="ad__symbol">
                {data.symbol}
            </div>
        </div>
    )    
}   