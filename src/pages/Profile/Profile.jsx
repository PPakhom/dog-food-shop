import React, { useContext, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { PencilSquare, XSquare, CheckSquare } from "react-bootstrap-icons";
import "./profile.css";

import Ctx from "../../Ctx";

export default () => {
    const {user, setUser, api, PATH} = useContext(Ctx);
    const [nameFlag, setNameFlag] = useState(false);
    const [name, setName] = useState(user.name);
    const [textFlag, setTextFlag] = useState(false);
    const [text, setText] = useState(user.about);
    const [imgFlag, setImgFlag] = useState(false);
    const [img, setImg] = useState(user.avatar);
    const navigate = useNavigate();
 
    const updUser = () => {
        api.updateUser({
            name: name,
            about: text
        })
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
                setUser(data);
                localStorage.setItem("user8", JSON.stringify(data));
                setNameFlag(false);
                setTextFlag(false);
            }
        })
    }

    const updImg = () => {
        api.updateUser({avatar: img}, true)
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
                setUser(data);
                localStorage.setItem("user8", JSON.stringify(data));
                setImgFlag(false);
            }
        })
    }

    const logOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("user8");
        navigate(PATH);
    }

    return <div className="user-container">
        <Link to={`${PATH}catalog`} className="btn-back">
            <i className="fa-solid fa-chevron-left"></i>Назад
        </Link>
        <Row>
            <Col xs={5} md={5} className="h1">
                <div>Личный кабинет</div>
            </Col>
        </Row>

        <Row style={{gap: "2em"}}>
            <Col xs={12} md={6} className="form-col">
                <div className="user__avatar">
                    <img src={user.avatar} alt="Аватар" />
                    {!imgFlag 
                        ? <div className="user__btnEdit">
                            <button className="btn btnEdit" onClick={() => setImgFlag(true)}>
                                <PencilSquare/>
                            </button>
                        </div>
                        : <div className="user__btnEdit">
                            <input type="text" value={img} required
                                onChange={e => setImg(e.target.value)}
                            />
                            <div className="user__btnEdit">
                                <button className="btn btnEdit" onClick={updImg}>
                                    <CheckSquare/>
                                </button>
                            </div>    
                            <div className="user__btnEdit">
                                <button className="btn btnEdit" onClick={() => {
                                    setImg(user.avatar);
                                    setImgFlag(false);
                                }}>
                                    <XSquare/> 
                                </button>
                            </div>
                        </div>   
                    }
                </div>
            </Col>
            <Col xs={12} md={5} className="form-col">
                <div className="about-user">
                    {!nameFlag 
                    ? <div className="user-block">
                        <div>
                            <span className="user-name">Имя: </span>
                            <span>{name}</span>
                        </div>
                        <div className="user__btnEdit">
                            <button className="btn btnEdit" onClick={() => setNameFlag(true)}>
                            <PencilSquare/>
                            </button>
                        </div>    
                      </div>
                    : <div className="user-block">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        <div className="user__btnEdit">
                            <button className="btn btnEdit" onClick={updUser}>
                                <CheckSquare/>
                            </button>
                        </div>    
                        <div className="user__btnEdit">
                                <button className="btn btnEdit" onClick={() => {
                                    setName(user.name);
                                    setNameFlag(false);
                                }}>
                                    <XSquare/> 
                                </button>
                        </div>        
                    </div>
                    }
                    <div>
                        <span className="user-text">Почта: </span><a href={`mailto:${user.email}`}>{user.email}</a>
                    </div>
                    <div className="profile__info">
                        {!textFlag 
                        ? <div className="user-block">
                           <span className="user-text">О себе: </span><span>{text}</span>
 
                           <div className="user__btnEdit">
                                <button className="btn btnEdit" onClick={() => setTextFlag(true)}>
                                    <PencilSquare/>
                                </button>
                            </div>    
                          </div>
                        : <div className="user-block">
                            <input type="text" value={text} onChange={e => setText(e.target.value)} />
                            <div className="user__btnEdit">
                                <button className="btn btnEdit" onClick={updUser}>
                                    <CheckSquare/>
                                </button>
                            </div>    
                            <div className="user__btnEdit">
                                <button className="btn btnEdit" onClick={() => {
                                setText(user.about);
                                setTextFlag(false);
                            }}>
                                    <XSquare/> 
                                </button>
                            </div>        
                        </div>
                        }
                    </div>
                </div>
            </Col>
        </Row>
        <div>
        <a href="" className="btn-back" onClick={logOut}>Выйти из аккаунта</a>
        </div>
    </div>
}