import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";

import Ctx from "../../Ctx";

import "./addReview.css";

export default ({ id: productId, setProduct }) => {
    const {api, goods, setGoods, setVisibleGoods, PATH} = useContext(Ctx);
    const [active, setActive] = useState(false);
    const [rating, setRating] = useState(1);
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handlerSubmit = (e) => {
        e.preventDefault();
        const body = {
            rating: rating,
            text: text || " ",
        };

        api.addReview(productId, body)
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    setActive(false);
                    setProduct(data);
                    setGoods(prev => [...prev, data]);
                    clear();
                    navigate(`${PATH}catalog/${data._id}`);
                }
            })
    };

    const clear = (e) => {
        setRating(1);
        setText("");
    };

    useEffect(() => {
            // загрузить данные с сервера
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
    }, [goods]);

    return (
        <div>
            <button className={active ? "no-active" : "btn btn-review"} onClick={() => setActive(prev=> !prev)}>
                Добавить отзыв
            </button>
            <Form className={active ? "active" : "no-active"} onSubmit={handlerSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Оценка</Form.Label>
                            <Form.Control 
                                type="number"
                                value={rating} 
                                required
                                onChange={e => setRating(e.target.value)}
                                min="1"
                                max="5" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Отзыв</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={4}
                                value={text}
                                onChange={e => setText(e.target.value)} />
                        </Form.Group>
                        <button className="btn" type="submit">Отправить</button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}