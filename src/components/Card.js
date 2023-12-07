function Card() {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/btn_nonfav.svg" alt="NonFav" />
            </div>
            <img width={133} height={112} src="/img/sneakers/1.jpg" alt="" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>12 999 р.</b>
                </div>
                <button className="button">
                    <img width={11} height={11} src="/img/btn_plus.svg" alt=" " />
                </button>
            </div>
        </div>
    );
}

export default Card;