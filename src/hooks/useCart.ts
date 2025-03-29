import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import { CartItem, GuitarId, IGuitar } from '../interface/Guitar';

export const useCart = () => {

    
      const initialCart = () : CartItem[]=>   {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
      }
    
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
      const MAX_QUANTITY = 5;
      const MIN_QUANTITY = 1;
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      },[cart]);
    
      function addToCart(item:IGuitar ) {
        const guitarExist = cart.find(guitar => guitar.id === item.id);
        if(guitarExist) {
          const newCart = cart.map(guitar => (guitar.id === item.id && guitar.quantity! < MAX_QUANTITY) ? {...guitar, quantity: guitar.quantity! + 1} : guitar);
          setCart(newCart);
          return;
        }
        const newItem: CartItem = {...item, quantity: 1};
        setCart([...cart, newItem]);
      }
    
      function removefromCart(id: GuitarId) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id  ));
      }
    
      function increaseQuantity(id: GuitarId) {
        const newCart = cart.map(guitar => (guitar.id === id && guitar.quantity! < MAX_QUANTITY) ? {...guitar, quantity: guitar.quantity! + 1} : guitar);
        setCart(newCart);
      }
    
      function decreaseQuantity(id: GuitarId) {
        const newCart = cart.map(guitar => (guitar.id === id && guitar.quantity! >  MIN_QUANTITY) ? {...guitar, quantity: guitar.quantity! - 1} : guitar);
        setCart(newCart);
      }
    
      function clearCart() {
        setCart([]);
      }


          //* State Derivado
    //* Se usa una funcion porque se necesita que se ejecute cada vez que se renderiza el componente
    //* Si se usa un valor, solo se ejecuta una vez
    const isEmpty = useMemo( () => cart.length === 0,[cart]);
    const carTotal = useMemo(() => cart.reduce((acc, guitar) => acc + (guitar.quantity! * guitar.price), 0),[cart]);
    

 return{
    data,
    cart,
    addToCart,
    removefromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    carTotal

 }

}