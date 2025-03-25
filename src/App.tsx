
import Header from "./components/Header";
import {  useEffect, useState } from "react";
import { db } from "./data/db";
import { IGuitar } from "./interface/Guitar";
import { Guitar } from "./components/Guitar";


function App() {

  const initialCart = ()=> {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState<IGuitar[]>(initialCart);
  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },[cart]);

  function addToCart(item: IGuitar) {
    const guitarExist = cart.find(guitar => guitar.id === item.id);
    if(guitarExist) {
      const newCart = cart.map(guitar => (guitar.id === item.id && guitar.quantity! < MAX_QUANTITY) ? {...guitar, quantity: guitar.quantity! + 1} : guitar);
      setCart(newCart);
      return;
    }
    item.quantity = 1;
    setCart([...cart, item]);
  }

  function removefromCart(id: number) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id  ));
  }

  function increaseQuantity(id: number) {
    const newCart = cart.map(guitar => (guitar.id === id && guitar.quantity! < MAX_QUANTITY) ? {...guitar, quantity: guitar.quantity! + 1} : guitar);
    setCart(newCart);
  }

  function decreaseQuantity(id: number) {
    const newCart = cart.map(guitar => (guitar.id === id && guitar.quantity! >  MIN_QUANTITY) ? {...guitar, quantity: guitar.quantity! - 1} : guitar);
    setCart(newCart);
  }

  function clearCart() {
    setCart([]);
  }



  return (
    <>
      <Header 
        cart={cart}
        removefromCart={removefromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map( guitar => {
            return <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                    />
          })}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
