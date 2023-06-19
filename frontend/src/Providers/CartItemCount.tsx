import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getCart, getCartItems } from '../features/cart-slice';
import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// type CartContextValue = {
//   count: number ;
//   setUp: React.Dispatch<React.SetStateAction<boolean>>;
//   up:boolean
// };

export const CartContext = createContext<number | null >(null);

function CartItemCount({ children }: { children: React.ReactNode }) {
  const data = useSelector(getCartItems);
  const [count, setCount] = useState(0);
  const { decoded } = useLocalStorage();
  // const [up, setUp]= useState(false);
  const dispatch:AppDispatch = useDispatch()
  const totalCount = data?.reduce((acc, el) => acc + el.quantity, 0);
  useEffect(() => {
    if(decoded?.id ){
      dispatch(getCart(decoded?.id.toString()));
    }
    setCount(totalCount);
  }, [decoded?.id,totalCount,dispatch]);

  return <CartContext.Provider value={count}>{children}</CartContext.Provider>;
}

export function useCartItemCount() {
  return useContext(CartContext);
}

export default CartItemCount;



