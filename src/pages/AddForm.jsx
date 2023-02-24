import React, {useState, useContext, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Ctx from "../Ctx";

export default () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(100);
    const [wight, setWight] = useState("");
    const [stock, setStock] = useState(10);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [pictures, setPictures] = useState("");

    const { api, setGoods, setVisibleGoods, PATH } = useContext(Ctx);
    const navigate = useNavigate();
    const { id } = useParams();

    const handler = (e) => {
        e.preventDefault();
        let body = {
            name: name || "Название отсутствует",
            price: price || 0,
            wight: wight || "Вес не указан",
            stock: stock || 0, 
            description: description || "Описание отсутствует",
            discount: discount,
            pictures: pictures
        }
        if(id) {
            api.editProduct(id, body)
                .then(res => res.json())
                .then(data => {
                    if(!data.error) {
                        setGoods(prev => prev.filter(el => el._id !== data._id));
                        setVisibleGoods(prev => [...prev, data]);
                        clear();
                        navigate(`${PATH}catalog/${data._id}`);
                    }
                })
        } else {
            api.addProduct(body)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setGoods(prev => [...prev, data]);
                        clear();
                        navigate(`${PATH}catalog/${data._id}`);
                    }
                })
        }    
    }

    const clear = (e) => {
        setName("");
        setPrice(100);
        setWight("");
        setDiscount(0);
        setStock(10);
        setDescription("");
        setPictures("");
    }

    useEffect(() => {
        if(id)
            api.getProduct(id)
                .then(res => res.json())
                .then(data => {
                    setName(data.name)
                    setPrice(data.price)
                    setWight(data.wight)
                    setStock(data.stock)
                    setDescription(data.description)
                    setDiscount(data.discount)
                    setPictures(data.pictures)
                })
    }, [id]);

    return <div className="form-container">
        <Link to={id ? `${PATH}catalog/${id}` : `${PATH}catalog`} className="btn-back">
            <i className="fa-solid fa-chevron-left"></i>Назад
        </Link>
        <Row>
            <Col xs={5} md={5} className="h1">
                {
                    id 
                    ? <div>Редактировать товар</div>
                    : <div>Добавить товар</div>
                }
            </Col>
        </Row>
        <Form onSubmit={handler}>
            <Row style={{gap: "2em", marginRight: "-1.5em"}}>
                <Col xs={12} md={5} className="form-col">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Название товара</Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="price">Цена</Form.Label>
                        <Form.Control
                            id="price"
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            step="10"
                            min={0}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="wight">Вес</Form.Label>
                        <Form.Control
                            id="wight"
                            type="text"
                            value={wight}
                            placeholder="100 г"
                            onChange={e => setWight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="discount">Скидка</Form.Label>
                        <Form.Select
                            id="discount"
                            value={discount}
                            onChange={e => setDiscount(e.target.value)}
                        >
                            <option value={0}>Без скидки</option>
                            <option value={5}>5%</option>
                            <option value={10}>10%</option>
                            <option value={15}>15%</option>
                            <option value={20}>20%</option>
                            <option value={25}>25%</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="stock">Количество</Form.Label>
                        <Form.Control
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                            min={0}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className="form-col">
                    <div className="form-preview mb-2" style={{
                        backgroundImage: pictures ? 
                            `url(${pictures})` : 
                            "url(https://www.chanchao.com.tw/images/default.jpg)"
                    }}/>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pictures">Изображение</Form.Label>
                        <Form.Control
                            id="pictures"
                            type="url"
                            value={pictures}
                            onChange={e => setPictures(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Описание</Form.Label>
                        <Form.Control
                            id="description"
                            as="textarea" 
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant={"warning"} type="submit">
                        { id ? "Изменить" : "Добавить"}
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
}