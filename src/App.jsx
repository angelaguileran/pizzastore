import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./assets/Components/NavBar/NavBar"
import ShopComponents from "./assets/Components/ShopComponents/ShopComponents";
import FoodDescription from "./assets/Components/FoodDescription/FoodDescription";
import pizzaData from "./pizzas.json";

/* useContext parametros */

import ShoppingCart from "./assets/Components/ShoppingCart/ShoppingCart";
import { CartProvider } from './assets/Components/ShoppingCartContext/ShoppingCartContext';

export default function App() {
  const [items, setItems] = useState([])
  useEffect(() => {
    setItems(pizzaData)
  }, []);
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ShopComponents items={items} />} />
          <Route path="/pizza/:id" element={<FoodDescription items={items} />} />
          <Route path="/carrito" element={<ShoppingCart items={items} />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
