
function Cart({on_close, items = []}) {
    return (
        <div className="overlay">
        <div className="cart_block">
            <h2 className="d-flex justify-between mb-30">
                Корзина
                <img onClick={on_close} className="remove_btn cu-p" src="/img/btn_remove.svg" alt="Close" />
            </h2>
            <div className="items">
                { items.map(obj => (
                    <div className="cart_item d-flex align-center mb-20">
                        <div style={{ backgroundImage: `url(${obj.image_url})` }} className="cart_item_img"></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">{obj.title}</p>
                            <b>{obj.price} руб.</b>
                        </div>
                        <img className="remove_btn" src="/img/btn_remove.svg" alt="Remove" />
                    </div>
                ))
            }
            </div>
            <div className="total_block">
                <ul>
                    <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>21 498 руб.</b>
                    </li>
                    <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>1074 руб.</b>
                    </li>
                </ul>
                <button className="green_button">Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>
            </div>
        </div>
        </div>
    );
}

export default Cart;