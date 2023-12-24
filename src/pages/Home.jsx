import Card from '../components/Card';

function Home({ items, searchValue, cartItems, setSearchValue, onSearch, onFavorite, onAddToCart, isLoading }) {

    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                on_click_plus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onFavorite(obj)}
                added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                loading={isLoading}
                {...item}
            />
        ));
    }

    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search_block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    <input onChange={onSearch} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;