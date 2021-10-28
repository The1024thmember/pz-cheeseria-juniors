import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useState } from 'react';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './ItemDetailDialog.styles';

type Props = {
  item: CartItemType;
  cartItems: CartItemType[];
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const ItemDetailDialog: React.FC<Props> = ({ item, cartItems , handleAddToCart, handleRemoveFromCart}) => {
  var amount = 0
  for (let i = 0; i < cartItems.length; i++ ){
    if (cartItems[i].id === item.id){
      amount = cartItems[i].amount;
    }
  }

  const [numberOfItem, setnumberOfItem] = useState<number>(amount);

  // update the current selected item number to cart
  const updateCart = () => {

    // if reduce the number of selected item
    if (amount - numberOfItem > 0){
      for (let i = 0; i< amount - numberOfItem; i++){
        handleRemoveFromCart(item.id);
      }     
    }else{ // if add the number of selected item
      for (let i = 0; i< numberOfItem - amount; i++){
        handleAddToCart(item);
      }
    }
  }

  // show the number of selected item, if not click the cart icon, change won't submit
  const handleRemoveItem = () => {
    if (numberOfItem > 0){
      setnumberOfItem(numberOfItem-1);
    }
  }

  const handleAddItem = () => {
    setnumberOfItem(numberOfItem+1)
  }

  return (
    <Wrapper>
      <div className = {"innerContainer"}>
        <div>
          <div className = {'title'}>
            <h2>{item.title}</h2>
          </div>
          <h5 className = {"category"}>{item.category.toUpperCase()}</h5>
          <img src={item.image} alt={item.title} />
        </div>
        <div>
          <div className = {"description"}>
            <p >
              {item.description}
            </p>
          </div>
          <h2 className = {"price"}>${item.price}</h2>
          <span className = {"itemCounter"}>
            <h5>QUANTITY</h5>
            <Button onClick={()=>handleRemoveItem()}>
              <RemoveIcon />
            </Button>
            <p>{numberOfItem}</p>
            <Button onClick={()=>handleAddItem()} >
              <AddIcon />    
            </Button>
          </span>
        </div>
      </div>
        
      <div className = {"footer"}>
        <div>
          <p >Sum Of This Item</p>
          <h3 className = {"price"}>${item.price*numberOfItem}</h3>
        </div>
        <Button 
          onClick={()=>updateCart()}
        >
          <AddShoppingCartIcon color="action"/>
          <p>Save</p>
        </Button>
      </div>
    </Wrapper>
  );
};

export default ItemDetailDialog;
