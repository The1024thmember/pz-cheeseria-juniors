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

  //calculate total price of a purchase history
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  //calculate amount of items a purchase history
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  //show purchase detail
  const [showDetail,setShowDetail] = useState(false);

  return (
    <Wrapper>
    
    {/* ------------ thumbnail of purchased items (only show the first 3) ------------- */}

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

        {/* ------------ detailed info of a purchase history ------------- */}

        <div data-cy={`purchase-items-container`}>
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

        {/* ------------- summary data of a purchase history ------------- */}

        <div className="Summary">
          <div>
            <h5>Total: ${calculateTotal(item.goods)}</h5>
            <h5>Date: {item.date}</h5>
          </div>

          {/* --------- control of show detail/brief info of a purchase history ------- */}

          <Button 
            size="small"
            variant="contained" 
            onClick={()=>setShowDetail(!showDetail)}
            data-cy={`view-detail-history-${item.id}`}
          >
            {showDetail? "Show Less" : "View Detail" }
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Record;
