import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import ShoppingCartContext from "../ShoppingCartContext/ShoppingCartContext";

const FoodDescription = ({ items }) => {
  const { cart, handleCart, removeItemFromCart, updateQuantity } = useContext(
    ShoppingCartContext
  );
  const [item, setItem] = useState(null);
  const params = useParams();

  useEffect(() => {
    const selectedItem = items.find((item) => item.id === params.id);
    setItem(selectedItem);
  }, [params.id, items]);

  useEffect(() => {
    // Actualizar el estado local del artículo cuando cambie el carrito
    if (item) {
      setItem((prevItem) => ({
        ...prevItem,
        inCart: !!cart[item.id], // Comprobar si el artículo está en el carrito
        quantity: cart[item.id]?.quantity || 0, // Obtener la cantidad del carrito
      }));
    }
  }, [cart, item]);

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItemFromCart(item.id);
    }
  };

  if (!item) {
    return <div>Cargando</div>;
  }

  return (
    <div className="justify-center flex mt-5">
      <Card className="max-w-[600px]">
        <CardHeader className="flex justify-center gap-3">
          <Image
            alt="Woman listening to music"
            className="object-cover"
            height={200}
            src={item.img}
          />
        </CardHeader>
        <Divider />
        <CardBody>
          <b className="text-xl mb-2">
            🍕 {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </b>
          <p>{item.desc}</p>
        </CardBody>
        <Divider />
        <CardBody>
          <b className="text-xl mb-2">🍽️ Ingredientes</b>
          {item.ingredients.map((ingredient, index) => (
            <p key={index}>📃 {ingredient}</p>
          ))}
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between items-center">
        <p className="font-medium">💵 Precio: ${item.price}</p>
          <div>
            <Button onClick={handleDecrement}>-</Button>
            <span className="mx-2">{item.quantity}</span>
            <Button onClick={handleIncrement}>+</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FoodDescription;
