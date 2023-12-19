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

  React.useEffect(() => {
    axios.get("https://657973fa1acd268f9af90a82.mockapi.io/items").then(response => {
      setItems(response.data)
    });
    axios.get("https://657973fa1acd268f9af90a82.mockapi.io/cart").then(response => {
      setCartItems(response.data)
    });
    axios.get("https://657d6f08853beeefdb9abd33.mockapi.io/favorite").then(response => {
      setFavItems(response.data)
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://657973fa1acd268f9af90a82.mockapi.io/cart", obj).then(res => setCartItems(prev => [...prev, res.data]));
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
        console.log(obj)
      }
    } catch(error) {
      alert('Не удалось добавить в фавориты')
    }
  }
  console.log(favItems)
  return (
    <div className="wrapper clear">
      {cartOpened && <Cart items={cartItems} on_close={() => setCartOpened(false)} on_remove={onRemoveItem} />}
      <Header on_click_cart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element={
          <Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={onSearch}
            onFavorite={onFavorite}
            onAddToCart={onAddToCart}
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
