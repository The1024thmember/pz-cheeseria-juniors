import CartItem from './CartItem/CartItem';
import Button from '@material-ui/core/Button';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const purchaseData =  {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems) 
  }

  const putHistory = async() => (await fetch(`/api/history`, purchaseData)).json()

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
        <Button onClick = {()=> {
          putHistory().then((result)=>{console.log(result)});         
          }} variant="contained"> Purchase  </Button>
      </div>
    </Wrapper>
  );
};

export default Cart;
