import React from "react";
import "./footer.css";
import {ReactComponent as Logo} from "../../templates/Icons/logo-dogfood.svg";

export default () => {
    const year = new Date().getFullYear();
    return (
        <footer>
                <div className="footer__mobile">
                    <div className="footer__group">
                        <span className="logo">
                            <a className="logo__icon" href="/" title="Магазин корма для собак">
                            <Logo/>
                            </a>
                        </span>
                    </div>
                    <p>© "Интернет-магазин DogFood", {year}</p>
                </div>
                <div className="footer__group">
                        <a href="#">Каталог</a>
                        <a href="#">Акции</a>
                        <a href="#">Новости</a>
                        <a href="#">Отзывы</a>
                </div>
                <div className="footer__group">
                        <a href="#">Оплата и доставка</a>
                        <a href="#">Часто спрашивают</a>
                        <a href="#">Обратная связь</a>
                        <a href="#">Контакты</a>
                </div>
                <div className="footer__mobile">
                    <div className="footer__contacts">
                        <h3>
                            Мы на связи<br/>
                            <a href="tel:74950000000">+7 (495) 000-00-00</a>
                        </h3>
                        <a href="mailto:dogfood.ru@gmail.com">dogfood.ru@gmail.com</a>
                    </div>
                    <div className="footer__socialnetwork">
                        <a className="telegram" href="/" title="Телеграм">
                            <i className="fa-brands fa-telegram"></i>
                        </a>
                        <a className="whatsapp" href="/" title="Whatsapp">
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                        <a className="viber" href="/" title="Viber">
                            <i className="fa-brands fa-viber"></i>
                        </a>
                        <a className="instagram" href="/" title="Инстаграм">
                            <i className="fa-brands fa-square-instagram"></i>
                        </a>
                        <a className="vk" href="/" title="ВКонтакте">
                            <i className="fa-brands fa-vk"></i>
                        </a>
                    </div>    
                </div>
        </footer>
    )
}
