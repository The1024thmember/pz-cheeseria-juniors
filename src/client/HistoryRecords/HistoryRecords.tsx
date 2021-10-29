import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useState } from 'react';
// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './HistoryRecords.styles';

type Props = {
  item: CartItemType;
  cartItems: CartItemType[];
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const HistoryRecords: React.FC<Props> = ({ item, cartItems , handleAddToCart, handleRemoveFromCart}) => {
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
        {item.goods[0].title}
    </Wrapper>
  );
};

export default HistoryRecords;
