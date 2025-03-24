
import Header from "./components/Header";
import {  useState } from "react";
import { db } from "./data/db";
import { IGuitar } from "./interface/Guitar";
import { Guitar } from "./components/Guitar";


function App() {


  const [data] = useState(db);
  const [cart, setCart] = useState<IGuitar[]>([]);

  function addToCart(item: IGuitar) {
    const guitarExist = cart.find(guitar => guitar.id === item.id);
    if(guitarExist) {
      const newCart = cart.map(guitar => guitar.id === item.id ? {...guitar, quantity: guitar.quantity! + 1} : guitar);
      setCart(newCart);
      return;
    }
    item.quantity = 1;
    setCart([...cart, item]);
  }


  return (
    <>
      <Header cart={cart} />

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
