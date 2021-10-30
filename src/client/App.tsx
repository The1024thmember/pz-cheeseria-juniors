import React, { useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import ItemDetailDialog from './Cart/ItemDetailDialog/ItemDetailDialog';
import HistoryRecords from './HistoryRecords/HistoryRecords';
import Dialog from '@material-ui/core/Dialog';
import PopUp from './PopUp/PopUp';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { StringMappingType } from 'typescript';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type PurchaseDataType = {
  id: number;
  date: string;
  goods: CartItemType;
};


const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const getHistoryRecords = async (): Promise<PurchaseDataType[]> => 
  await (await fetch(`api/history`)).json();

const App = () => {
  //open cart
  const [cartOpen, setCartOpen] = useState(false);
  //open cheese dialog
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  //cheese dialog content
  const [dialogItem, setDialogItem] = useState<any>();
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [showHistory, setShowHistory] = useState(false);
  const [noHistoryPrompt, setNoHistoryPrompt] = useState(false);

  //fetch cheese data
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );

  //fetch purchase history data
  const { data:historyRecordsData, isLoading:historyLoading, error:historyError, refetch } = useQuery<PurchaseDataType[]>(
    'history purchases',
    getHistoryRecords,
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleOpenDialog = (viewedItem: CartItemType) => {
    setDialogItem(viewedItem);
    setDialogOpen(true);
  }

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  //Fetch history data, if there are purchase history then open Drawer
  //Otherwise show prompts of no history
  const handleShowHistory = async() => {
    await refetch();
    if ((historyRecordsData||[]).length){
      setShowHistory(true);
    }else{
      setNoHistoryPrompt(true);
    }
  }
  
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  if (historyLoading) return <LinearProgress />;
  if (historyError) return <div>Purchase history fetching error.</div>;

  return (

    <Wrapper>

      {/*---------header-------*/}

      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton 
              onClick = {()=>handleShowHistory()}
              data-cy={`open-history`}
            >
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap data-cy={`close-dialog`}>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton 
              onClick={() => setCartOpen(true)}
              data-cy={`open-cart`}
            >
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      {/*---------shopping cart-------*/}

      <Drawer 
        anchor='right' 
        open={cartOpen} 
        onClose={() => setCartOpen(false)}
        onClick={() => refetch()}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          setCartItems={setCartItems}
        />
      </Drawer>

      {/*---------Cheese Detail Dialog-------*/}

      <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
        <ItemDetailDialog
          item={dialogItem}
          cartItems={cartItems}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Dialog>

      {/*---------Purchase History Drawer-------*/}

      <Drawer anchor='left' open={showHistory} onClose={() => setShowHistory(false)}> 
        <HistoryRecords
          historyRecordsData = {historyRecordsData}
        />
      </Drawer>   

      {/*---------No History Prompt-------*/}
      <PopUp
        open= {noHistoryPrompt}
        onClose = {setNoHistoryPrompt}
        title = {"Patient Zero's Cheeseria"}
        content = {"No purchase history found, popluate your chart with amazing cheese now :) !"}
      />

      {/*---------Cheese Card-------*/}

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item 
              item={item} 
              handleAddToCart={handleAddToCart}
              handleOpenDialog={handleOpenDialog} 
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );
};

export default App;
