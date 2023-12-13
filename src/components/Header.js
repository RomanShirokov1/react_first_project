function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.png" alt="" />
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5g">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li onClick={props.on_click_cart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="" />
                    <span>1205 руб.</span>
                </li>
                <li className="mr-30">
                    <img width={18} height={18} src="/img/favorite.svg" alt="" />
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg" alt="" />
                </li>
            </ul>
        </header>
    );
}

export default Header;