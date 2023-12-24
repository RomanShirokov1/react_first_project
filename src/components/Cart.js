
function Cart({on_close, on_remove, items = []}) {
    return (
        <div className="overlay">
        <div className="cart_block">
            <h2 className="d-flex justify-between mb-30">
                Корзина
                <img onClick={on_close} className="remove_btn cu-p" src="/img/btn_remove.svg" alt="Close" />
            </h2>

            {
                items.length > 0 ? (
                    <div>
                        <div className="items">
                        {items.map(obj => (
                            <div key={obj.id} className="cart_item d-flex align-center mb-20">
                                <div style={{ backgroundImage: `url(${obj.image_url})` }} className="cart_item_img"></div>
                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => on_remove(obj.id)} className="remove_btn" src="/img/btn_remove.svg" alt="Remove" />
                            </div>
                            ))}
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
                    ) : ( <div className="cart_empty d-flex align-center justify-center flex-column flex">
                <img className="mb-20" width={120} height={120} src="/img/empty_cart.svg" alt="Empty"/>
                <h2>Корзина пустая</h2>
                <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                <button onClick={on_close} className="back_button">
                    <img src="/img/arrow.svg" alt="Arrow"/>
                    Вернуться назад
                </button>
                </div>)
            }
        </div>
        </div>
    );
}

export default Cart;