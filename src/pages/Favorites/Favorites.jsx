import React, {useContext} from "react";
import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import Ctx from "../../Ctx";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";

import { PATH } from "../../utils/functions";

export default () => {
    const { favorites } = useContext(Ctx);
    const paginate = usePagination(favorites, 3);

    const flagHome = false;

    return <>
        {favorites.length > 0 
            ? <>
                <h1>Каталог товаров</h1>
                <Pagination hook={paginate}/>
                <div className="cards">
                    {paginate.setPageData().map((el, i) => <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                        <Card key={"card_" + i} data={el} flagHome={flagHome}/>
                    </Link>)}
                </div>
            </>
            : <div className="empty-block">
                <EmojiFrown/>
                <p>Вы еще не добавили ни одного любимого товара</p>
                <Link to={PATH + "catalog"} className="empty-block__btn-main">В каталог</Link>
            </div>
        }
    </>
}