import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favItems, setFavItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get("https://657973fa1acd268f9af90a82.mockapi.io/cart");
      const favoritesResponse = await axios.get("https://657d6f08853beeefdb9abd33.mockapi.io/favorite");
      const itemsResponse = await axios.get("https://657973fa1acd268f9af90a82.mockapi.io/items");

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavItems(favoritesResponse.data);
      setItems(itemsResponse.data);

    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://657973fa1acd268f9af90a82.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post("https://657973fa1acd268f9af90a82.mockapi.io/cart", obj).then(res => setCartItems(prev => [...prev, res.data]));
      }
    } catch (error) {
      alert('Ошибка при запросе данных ;(');
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://657973fa1acd268f9af90a82.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const onFavorite = async (obj) => {
    try {
      if (favItems.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://657d6f08853beeefdb9abd33.mockapi.io/favorite/${obj.id}`);
      } else {
        const { data } = await axios.post("https://657d6f08853beeefdb9abd33.mockapi.io/favorite", obj);
        setFavItems((prev) => [...prev, data]);
      }
    } catch(error) {
      alert('Не удалось добавить в фавориты')
    }
  }
  return (
    <div className="wrapper clear">
      {cartOpened && <Cart items={cartItems} on_close={() => setCartOpened(false)} on_remove={onRemoveItem} />}
      <Header on_click_cart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element={
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={onSearch}
            onFavorite={onFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        }
          exact
        />

        <Route path="/favorites" element={
          <Favorites
            items={favItems}
            onFavorite={onFavorite}
          />
        }
          exact
        />
      </Routes>

    </div>
  );
}

export default App;
