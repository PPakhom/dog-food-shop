import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import Review from "../../components/Review/Review";
import AddReview from "../../components/AddReview/AddReview"
import "./product.css";
import Ctx from "../../Ctx.js"

import Confirmation from "../../components/Modal/Confirmation";
import NoPhoto from "../../templates/Images/no_photo.png"
import { Trash3, StarFill, PencilSquare } from "react-bootstrap-icons";
import { ReactComponent as DeliveryBox } from "../../templates/Icons/delivery-box.svg";
import { ReactComponent as DeliveryCar } from "../../templates/Icons/delivery-car.svg";
import { ReactComponent as Quality } from "../../templates/Icons/quality.svg";
import { priceDiscount, addDaysToDate, ratingTotal, numArrayToWord } from "../../assets/functions";

export default () => {
    // id товара
    const {id} = useParams();
    const [product, setProduct] = useState({});
    // По id товара получаются данные о товаре для отрисовки страницы с товаром
    const {api, user, setGoods, setVisibleGoods, setBasket, PATH} = useContext(Ctx);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [del, setDelete] = useState(false);

    const arrayWords = ['Отзыв', 'Отзыва', 'Отзывов'];
   
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

    useEffect(() => {
        if(del) {
            api.deleteProduct(id)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setGoods(prev => prev.filter(g => g._id !== data._id))
                        setVisibleGoods(prev => prev.filter(el => el._id !== data._id));
                        navigate(`${PATH}catalog`);
                    }
                })
        }
    }, [del]);

    const remove = () => {
        setShow(true);
    }

    const edit = () => {
        navigate(`${PATH}edit/${id}`);
    }

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === id);
            if(test.length) {
                return prev.map(el => {
                    if(el.id === id) {
                        el.cnt++;
                    }
                    return el;
                })
            } else {
                return [...prev, {id: id, cnt: 1}];
            }
        })
    }

    return (
        <div className="product-container">
            <div className="block-link">
                <Link to={PATH + "catalog"} className="btn-back">
                    <i className="fa-solid fa-chevron-left"></i>Назад
                </Link>
                {
                    product && product.author && product.author._id === user._id &&
                    <div className="product__edit">
                        <button 
                            onClick={edit} 
                            className="btn btnEdit" 
                        >
                            <PencilSquare/>
                        </button>
                        <button 
                            onClick={remove} 
                            className="btn btnEdit" 
                        >
                            <Trash3/>
                        </button>
                    </div>
                }

            </div>
            <div className="product place-holder-glow">
                <div className="product__block-left">
                    <h3>
                        {product.name || <div className="place-holder mnw-75"></div>}
                    </h3>
                    <div className="product__header-top">
                        { 
                            product.reviews
                            ? product.reviews.length > 0 && <>
                                <div className="rating">
                                    <StarFill className="rating__star"/>
                                    <div>{`${ ratingTotal(product.reviews) }`}</div>
                                </div>
                                <div className="product__reviews">
                                    <i className="fa fa-comment"></i>
                                    <HashLink to={`${PATH}catalog/${id}#hash-reviews`}>
                                        <div>{`${ numArrayToWord(product.reviews.length, arrayWords) }`}</div>
                                    </HashLink>
                                </div>
                            </>
                            : <div className="place-holder mnw-5"></div>
                        }
                        { 
                            product._id 
                            ? <div>{`Артикул: ${product._id}`}</div>
                            : <div className="place-holder mnw-25"></div>
                        }    
                    </div>
                    <div className="product__img">
                        { 
                            product.discount > 0 && 
                            <span className="product__discount">
                                {`-${product.discount}%`}
                            </span>
                        }
                        { 
                            product.pictures 
                            ? <img src={product.pictures} alt="Изображение товара"/>
                            : <img src={String(NoPhoto)} alt="Изображение товара" className="place-holder"/>
                        } 
                    </div>
                </div>

                <div className="product__block-right">
                    <div className="block-price">
                        { product.price
                            ? <>
                                {
                                    product.discount > 0
                                    ? <div className="price">{(product.price).toFixed(2)} ₽</div>
                                    : <div className="price price__transparent">{(product.price).toFixed(2)} ₽</div>
                                }    
                            </>
                            : <div className="place-holder mnw-25"></div>
                        }
                        { product.price
                            ? <>
                                <div className="price__discount">
                                    {
                                        product.discount > 0
                                        ? <div className="price__red">{priceDiscount(product.price, product.discount).toFixed(2)} ₽</div>
                                        : (product.discount === 0) && <div>{priceDiscount(product.price, product.discount).toFixed(2)} ₽</div>
                                    }
                                </div>
                            </>
                            : <div className="place-holder mnw-25"></div>
                        }
                    </div>
   
                    <div className="product__add__cart">
                        <button className="btn" onClick={buy}>
                            <i className="fa-solid fa-cart-plus"></i>В корзину
                        </button>
                    </div>

                    { 
                        product.stock 
                        ? <h5>{`в наличии: ${product.stock} шт.`}</h5>
                        : <div className="place-holder mnw-25"></div>
                    }
                    { 
                        product.stock 
                        ? <>
                            <div className="block-delivery">
                                <div>
                                    <h5>Самовывоз</h5>
                                    <div>из 1 магизина сегодня</div>
                                    <div>из 5 магазинов и пунктов выдачи завтра и позже</div>
                                </div>
                                <div className="block-delivery__icon"><DeliveryBox/></div>
                            </div>
                            <div className="block-delivery">
                                <div>
                                    <h5>Доставка</h5>
                                    <div>{`послезавтра, ${addDaysToDate(new Date(), 2)} от 300 ₽`}</div>
                                </div>
                                <div className="block-delivery__icon"><DeliveryCar/></div>
                            </div>
                            <div className="block-delivery">
                                <div>
                                    <h5>Гарантия качества</h5>
                                    <div>{`Если вам не понравилось качество\n нашей продукции, мы вернем деньги,\n либо сделаем всё возможное,\n чтобы удовлетворить ваши нужды.`}</div>
                                </div>
                                <div className="block-delivery__icon"><Quality/></div>
                            </div>
                        </>
                        : <div className="place-holder mnw-50"></div>
                    }
                </div>
            </div>

            <div className="product__block-description">
                <div className="description">
                    <h4>
                        {
                            product.description
                            ? `Описание`
                            : <div className="place-holder mnw-25"></div>
                        }
                    </h4>
                    <div>
                        {
                            product.description
                            ? <div>{product.description}</div>
                            : <div className="place-holder mnw-50"></div>
                        }
                    </div>
                </div>
                <div className="product__block-description specification-block">
                    <h4>
                        {
                            product.description
                            ? `Характеристики`
                            : <div className="place-holder mnw-25"></div>
                        }
                    </h4>
                    <div className="specification">
                        {
                            product.wight
                            ? <>
                                <div>Вес</div>
                                <div>{product.wight}</div>
                            </>    
                            : <div className="place-holder mnw-5"></div>
                        }
                        {
                            product.stock
                            ? <>
                                <div>Количество</div>
                                <div>{product.stock} шт.</div>
                            </>    
                            : <div className="place-holder mnw-5"></div>
                        }
                    </div>
                </div>
            </div>    
            <h4 id="hash-reviews">Отзывы</h4>
            {/* id товара  */}
            <AddReview id={id} setProduct={setProduct} />
            <div className="reviews">
                {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => <Review {...el} setProduct={setProduct} key={i}/>).reverse()}
            </div>
            <Confirmation show={show} setShow={setShow} setDelete={setDelete}/>
        </div>
    )
}