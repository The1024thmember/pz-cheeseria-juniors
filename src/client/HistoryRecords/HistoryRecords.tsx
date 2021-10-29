import { useState } from 'react';
// Types
import { CartItemType } from '../App';
import { PurchaseDataType } from '../App';
// Styles
import { Wrapper } from './HistoryRecords.styles';
//Component
import Record from './Record';

type Props = {
  historyRecordsData: PurchaseDataType[]|any;
};

const HistoryRecords: React.FC<Props> = ({ historyRecordsData }) => {

  return (
    <Wrapper>
      <h2> Your Purchase Records</h2>
      <div className = "container">
        {historyRecordsData?.map((item:any)=>(
            <Record
              item={item}
              key={item.id}
            />
        ))}
      </div>
    </Wrapper>
  );
};

export default HistoryRecords;
