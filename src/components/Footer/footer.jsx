import React from "react";
import "./footer.css";
import Logo from "../../templates/Icons/logo-dogfood.svg";

export default () => {
    const year = new Date().getFullYear();
    return <footer>
        <div className="footer__container">
            <div className="footer__group">
                    <a className="logo" href="/" title="Магазин корма для собак">
                        <img src={Logo} alt="DogFood"/>
                    </a>
                    <div className="footer__copyright">© "Интернет-магазин DogFood", {year}</div>
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
            <div className="footer__group footer__mobile__network">
                <h3>Мы на связи</h3>
                    <h3>
                        <a href="tel:74959999999">+8 (999) 00-00-00</a>
                    </h3>
                    <a href="mailto:dogfood.ru@gmail.com">dogfood.ru@gmail.com</a>
                <div className="socialnetwork">
                    <i className="fa-brands fa-telegram"></i>
                    <i className="fa-brands fa-skype"></i>
                    <i className="fa-solid fa-phone-volume"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-vk"></i>
                </div>    
                <div className="footer__mobile__copyright">© "Интернет-магазин DogFood", {year}</div>
            </div>
        </div>   
    </footer>
}
// © => &copy;
// &nbsp; - неразбиваемый пробел