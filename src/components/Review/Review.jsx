import React, { useState, useEffect, useContext } from "react";
import { StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./review.css";

import Ctx from "../../Ctx";

import { Trash3 } from "react-bootstrap-icons";
import { dayMonthYearToString } from "../../assets/functions";

export default ({rating, _id, text, author, product, created_at, setProduct}) => {
    const { api, user, setGoods, setVisibleGoods, PATH } = useContext(Ctx);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.getUser(author)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setAvatar(data.avatar);
            })
    }, [])

    const delReview = () => {
        if(author === user._id) {
            api.deleteReview(product, _id)
                .then(res => res.json())
                .then(data => {
                    if(!data.error) {
                        setGoods(prev => [...prev, data]);
                        setProduct(data);
                        navigate(`${PATH}catalog/${product}`);
                    }
            })
        }
    }

    return (
    <div className="review-wrapper1">
        <div className="review-container">
            <div className="review-top">
                <div className="review__user-avatar"><img src={avatar}/></div>
                <div className="review__user-block">
                    <div className="user-name-rating">
                        <div>{name || ""}</div>
                        {/* <div className="rating__star">{setRating(rating)}</div> */}
                        <div className="rating">
                            <StarFill className="rating__star"/>
                            <div>{`${ rating }`}</div>
                        </div>
                    </div>
                    <div>{dayMonthYearToString(created_at)}</div>
                </div>
            </div>
            <div className="review-comments">{text}</div>

            <div className="btn-block">
            { 
                author && author === user._id &&
                <button
                    className="btn btnEdit"
                    onClick={delReview}
                >
                    <Trash3/>
                </button>
            }
            </div>
        </div>
        </div>
    )
}