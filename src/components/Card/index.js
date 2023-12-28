import styles from './Card.module.scss';
import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

function Card({ id, onFavorite, on_click_plus, title, image_url, price, favorited = false, loading = false }) { 

    const { isItemAdded } = React.useContext(AppContext); 
    const [isFav, setIsFav] = React.useState(favorited);
    const obj = { id, parent_id: id, title, image_url, price };

    const onClickPlus = () => {
        on_click_plus(obj);
    }

    const onClickFav = () => {
        onFavorite(obj);
        setIsFav(!isFav);
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={180}
                    height={228}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                    <rect x="0" y="100" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="122" rx="3" ry="3" width="93" height="15" />
                    <rect x="0" y="160" rx="8" ry="8" width="80" height="24" />
                    <rect x="118" y="153" rx="8" ry="8" width="32" height="32" />
                </ContentLoader> :
                    <>
                        <div className={styles.favorite} onClick={onClickFav}>
                            {onFavorite && <img
                                src={isFav ? "img/btn_fav.svg" : "img/btn_nonfav.svg"} 
                                alt="Fav"
                            />}
                        </div>
                        <img width="100%" height={135} src={image_url} alt="" />
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} р.</b>
                            </div>
                            {on_click_plus && <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? "img/btn_checked.svg" : "img/btn_plus.svg"}
                                alt="Plus"
                            />}
                        </div>
                    </>
            }

        </div>
    );
}

export default Card;