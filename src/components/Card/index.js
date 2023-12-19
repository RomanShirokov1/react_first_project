import styles from './Card.module.scss';
import React from 'react';

function Card({id, onFavorite, on_click_plus, title, image_url, price, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState();
    const [isFav, setIsFav] = React.useState(favorited);

    const onClickPlus = () => {
        on_click_plus({title, image_url, price});
        setIsAdded(!isAdded);
    }

    const onClickFav = () => {
        onFavorite({id, title, image_url, price});
        setIsFav(!isFav);
    }
     
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFav}>
                <img src={isFav ? "/img/btn_fav.svg" : "/img/btn_nonfav.svg"} alt="Fav" />
            </div>
            <img width={133} height={112} src={image_url} alt="" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} р.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn_checked.svg" : "/img/btn_plus.svg"} alt="Plus" />
            </div>
        </div>
    );
}

export default Card;