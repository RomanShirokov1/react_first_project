import styles from './Card.module.scss';
import React from 'react';

function Card({on_click_fav, on_click_plus, title, image_url, price}) {
    const [isAdded, setIsAdded] = React.useState();

    const onClickPlus = () => {
        on_click_plus({title, image_url, price});
        setIsAdded(!isAdded);
    }
     
    return (
        <div className={styles.card}>
            <div className={styles.favoriteq} onClick={on_click_fav}>
                <img src="/img/btn_nonfav.svg" alt="NonFav" />
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