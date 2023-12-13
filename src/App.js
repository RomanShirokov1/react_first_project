import React from 'react';

import Card from './components/Card';
import Header from './components/Header';
import Cart from './components/Cart';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch("https://657973fa1acd268f9af90a82.mockapi.io/items")
      .then(response => {
        return response.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
    
  }
  console.log(cartItems);
  return (
    <div className="wrapper clear">
      {cartOpened && <Cart items={cartItems} on_close={() => setCartOpened(false)} />}
      <Header on_click_cart={() => setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>  
          <div className="search_block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap justify-between">
          { items.map((item, index) => (
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
