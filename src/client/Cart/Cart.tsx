import React, { useState } from 'react';
import CartItem from './CartItem/CartItem';
import Button from '@material-ui/core/Button';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import PopUp from '../PopUp/PopUp';
type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartItems: any;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, setCartItems }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const cheeseList = (items: CartItemType[]) =>
    items.map((item: CartItemType)=> `${item.title} * ${item.amount}`);

  const purchaseData =  {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems) 
  }

  const putHistory = async() => (await fetch(`/api/history`, purchaseData)).json()

  const handlePurchase = () => {
    putHistory().then((result)=>{
      //show the purchase successful
      setShowPrompt(true);
    });
  }

  const handlePurchaseSuccessful = () =>{
    //empty the cart
    setCartItems([]);
    setShowPrompt(false)
  }

  console.log(cheeseList(cartItems));
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <div className = "checkOut">
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        {cartItems.length 
          ?<Button onClick = {()=> handlePurchase() } variant="contained"> Purchase  </Button>
          :<></>
        }
      </div>
      <PopUp
        open={showPrompt}
        onClose={handlePurchaseSuccessful}
        title = {"Patient Zero's Cheeseria"}
        content = {`Congrats! Your purchase of ${cheeseList(cartItems).join(',')} have been successful. Enjoy :)`}
      />
    </Wrapper>
  );
};

export default Cart;
