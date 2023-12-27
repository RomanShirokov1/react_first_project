import AppContext from '../context';
import React from 'react';

export const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const total_price = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return { cartItems, setCartItems, total_price };
};