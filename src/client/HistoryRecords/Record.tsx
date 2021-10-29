import { useState } from 'react';
// Types
import { CartItemType } from '../App';
import { PurchaseDataType } from '../App';
// Styles
import { Wrapper } from './Record.styles';
//Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

type Props = {
  item: PurchaseDataType|any;
};

const Record: React.FC<Props> = ({ item }) => {

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const [showDetail,setShowDetail] = useState(false);

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={3}>
          {typeof item.goods[0] != 'undefined' 
            ?<img className = "thumbnail" src = {item.goods[0].image} alt = {item.goods[0].title} />
            :<></>
          }
        </Grid>
        <Grid item xs={3}>
          {typeof item.goods[1] != 'undefined' 
            ?<img className = "thumbnail" src = {item.goods[1].image} alt = {item.goods[1].title} />
            :<></>
          }
        </Grid>
        <Grid item xs={3}>
          {typeof item.goods[2] != 'undefined' 
            ?<img className = "thumbnail" src = {item.goods[2].image} alt = {item.goods[2].title} />
            :<></>
          }
        </Grid>     
        <Grid className = "Amount" item xs={3}>
          <h2>{getTotalItems(item.goods)} Items</h2>
        </Grid>
      </Grid>
      <div>
        <div>
          {showDetail &&
            item.goods.map((each:CartItemType)=>{
              return(
                <div className = "Detail">
                  <div>
                    <img className = "thumbnail" src={each.image} alt={each.title} />
                  </div>
                  <div> 
                      <h4>{each.title}</h4>
                      <div>
                          <span>${each.price}{"   "}X{each.amount}</span>
                      </div>
                      <h4>Subtotal: ${each.amount * each.price}</h4>
                  </div>
                </div>
              )})
          }
        </div>        
        <div className="Summary">
          <div>
            <h5>Total: ${calculateTotal(item.goods)}</h5>
            <h5>Date: {item.date}</h5>
          </div>
          <Button 
            size="small"
            variant="contained" 
            onClick={()=>setShowDetail(!showDetail)}
          >
            {showDetail? "Show Less" : "View Detail" }
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Record;
