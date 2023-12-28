import React from 'react';
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from './Cart.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ on_close, on_remove, items = [], opened }) {
    const { cartItems, setCartItems, total_price } = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false)

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("https://657d6f08853beeefdb9abd33.mockapi.io/orders", {
                items: cartItems,
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://657973fa1acd268f9af90a82.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch {
            alert('Ошибка при оформлении заказа');
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.cart_block}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина
                    <img onClick={on_close} className="remove_btn cu-p" src="img/btn_remove.svg" alt="Close" />
                </h2>

                {
                    items.length > 0 ? (
                        <div className="d-flex flex-column flex">
                            <div className={`${styles.items} flex`}>
                                {items.map(obj => (
                                    <div key={obj.id} className="cart_item d-flex align-center mb-20">
                                        <div style={{ backgroundImage: `url(${obj.image_url})` }} className="cart_item_img"></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => on_remove(obj.id)} className="remove_btn" src="img/btn_remove.svg" alt="Remove" />
                                    </div>
                                ))}
                            </div>
                            <div className="total_block">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{total_price} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{(total_price * 0.05).toFixed(2)} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="green_button">Оформить заказ<img src="img/arrow.svg" alt="Arrow" /></button>
                            </div>
                        </div>
                    ) : (
                        <Info
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ номер #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                            image={isOrderComplete ? 'img/order.svg' : 'img/empty_cart.svg'}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Cart;