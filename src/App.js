import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favItems, setFavItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get("https://657973fa1acd268f9af90a82.mockapi.io/cart"),
          axios.get("https://657d6f08853beeefdb9abd33.mockapi.io/favorite"),
          axios.get("https://657973fa1acd268f9af90a82.mockapi.io/items"),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavItems(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parent_id) === Number(obj.id));
    try {
      if (findItem)  {
        setCartItems((prev) => prev.filter(item => Number(item.parent_id) !== Number(obj.id)));
        await axios.delete(`https://657973fa1acd268f9af90a82.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post("https://657973fa1acd268f9af90a82.mockapi.io/cart", obj);
        setCartItems(prev => prev.map(item => {
          if (item.parent_id === data.parent_id) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;  
        }));
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  }

  const onRemoveItem = async (id) => {
    try {
      axios.delete(`https://657973fa1acd268f9af90a82.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении');
      console.error(error);
    }
  }

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const onFavorite = async (obj) => {
    try {
      if (favItems.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://657d6f08853beeefdb9abd33.mockapi.io/favorite/${obj.id}`);
        setFavItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post("https://657d6f08853beeefdb9abd33.mockapi.io/favorite", obj);
        setFavItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
      console.error(error);
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parent_id) === Number(id));
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favItems,
      isItemAdded,
      onFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper clear">
        <Cart
          items={cartItems}
          on_close={() => setCartOpened(false)}
          on_remove={onRemoveItem}
          opened={cartOpened}
        />

        <Header on_click_cart={() => setCartOpened(true)} />

        <Routes>
          <Route path="" element={
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

          <Route path="favorites" element={
            <Favorites />
          }
            exact
          />

          <Route path="orders" element={
            <Orders />
          }
            exact
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
