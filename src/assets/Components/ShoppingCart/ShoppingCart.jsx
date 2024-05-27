import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  CardFooter,
} from "@nextui-org/react";
import ShoppingCartContext from "../ShoppingCartContext/ShoppingCartContext";

const ShoppingCart = ({ items }) => {
  const { cart, removeItemFromCart, updateQuantity } =
    useContext(ShoppingCartContext);
  const cartItems = items.filter((item) => cart[item.id]);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * cart[item.id].quantity;
  }, 0);

  return (
    <div className="flex justify-center mt-5">
      <Card className="max-w-[1000px] min-w-[1000px] w-full ">
        <CardHeader className="flex gap-3">
          <h1 className="text-xl font-bold">🛒 Carrito de compras</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 justify-between"
              >
                <h1 className="text-large font-medium">
                  🍕 {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </h1>

                <p className="text-large font-medium ml-auto">${item.price}</p>


                <div>
                  <div className="flex items-center gap-3">
                    <Button
                      className="m-2"
                      onClick={() => {
                        if (cart[item.id].quantity > 1) {
                          updateQuantity(item.id, cart[item.id].quantity - 1);
                        } else {
                          removeItemFromCart(item.id);
                        }
                      }}
                    >
                      -
                    </Button>
                    <span className="min-w-[20px] text-center">{cart[item.id].quantity}</span>
                    <Button
                      className="m-2"
                      onClick={() =>
                        updateQuantity(item.id, cart[item.id].quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-4xl font-medium text-center m-4">🪰 Carrito vacío 🪰</h1>
          )}
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end">
          <h1 className="text-large font-medium">Total: ${totalPrice}</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShoppingCart;
