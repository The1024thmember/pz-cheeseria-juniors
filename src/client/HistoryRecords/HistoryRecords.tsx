import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useState } from 'react';
// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './HistoryRecords.styles';

type Props = {
  item: any;
};

const HistoryRecords: React.FC<Props> = ({ item }) => {

  return (
    <Wrapper>
        {item.goods[0].title}
    </Wrapper>
  );
};

export default HistoryRecords;
