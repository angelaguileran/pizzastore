import React, { useContext } from 'react';
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import ShoppingCartContext from '../ShoppingCartContext/ShoppingCartContext';
import { Link } from 'react-router-dom';

const ShopComponents = ({ items }) => {
  const { cart, handleCart, removeItemFromCart } = useContext(ShoppingCartContext);

  return (
    <div className="flex justify-center mt-6">
      <div className="gap-6 inline-grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} shadow="sm" isPressable className="w-[400px]">
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>🍕 {item.name.charAt(0).toUpperCase() + item.name.slice(1)}</b>
              <p className="text-default-500">${item.price}</p>
              <div>
                <Link to={`/pizza/${item.id}`}>
                  <Button className="m-2">📃</Button>
                </Link>
                <Button className="m-2" onClick={() => {
                  if (cart[item.id]) {
                    removeItemFromCart(item.id);
                  } else {
                    handleCart(item.id);
                  }
                }}>
                  {cart[item.id] ? '❌' : '🛒'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopComponents;
