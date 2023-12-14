import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Cart from './components/Cart';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get("https://657973fa1acd268f9af90a82.mockapi.io/items").then(response => {
      setItems(response.data)
    });
    axios.get("https://657973fa1acd268f9af90a82.mockapi.io/cart").then(response => {
      setCartItems(response.data)
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://657973fa1acd268f9af90a82.mockapi.io/cart", obj);
    setCartItems(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    // axios.delete(`https://657973fa1acd268f9af90a82.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id != id))
  }

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Cart items={cartItems} on_close={() => setCartOpened(false)} on_remove={onRemoveItem} />}
      <Header on_click_cart={() => setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>{searchValue ?  `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>  
          <div className="search_block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onSearch} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          { items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
              <Card 
                key={index}
                title = {item.title}
                price = {item.price}
                image_url = {item.image_url}
                on_click_plus =  {(obj) => onAddToCart(obj)}
                on_click_fav =  {() => alert("Добавили в закладки")}
                />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
