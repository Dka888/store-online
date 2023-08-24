import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../utils/Product';
import { Basket, status } from '../utils/Basket';
import axios from 'axios';
import { ProductsInBasket } from '../component/Basket/Baskets';

interface BasketState {
  items: Basket[];
}
const activeUser = localStorage.getItem('loggedInUser');
const { _id } = activeUser ? JSON.parse(activeUser) : '';

const initialState: BasketState = {
  items: [],
};


export const getBasket = createAsyncThunk('basket/getBasket', async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3333/basket/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
})

export const addToBasket = createAsyncThunk('basket/addToBasket', async (product: Product) => {
  try {
    if (activeUser) {
      const newBasket = { userId: _id, productId: product._id };
      const response = await axios.post('http://localhost:3333/basket/add', newBasket);
      const newData = response.data;
      return newData;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const removeFromBasket = createAsyncThunk('basket/removeFromBasket', async (productId: string) => {
  try {
    if (activeUser) {
      const updatingBasket = { userId: _id, productId };
      const response = await axios.patch(`http://localhost:3333/basket/${_id}`, updatingBasket);
      const updatedBasket = response.data;
      return updatedBasket
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  });

export const removeAllFromBasket = createAsyncThunk('basket/removeAllFromBasket', async () => {
    return [];
});

export const changeQuantities = createAsyncThunk('basket/changeQuantity', async (product: ProductsInBasket) => {
  try {
    if (activeUser) {
      const {quantity} = product;
      const updatingBasket = { userId: _id, quantity, productId: product._id };
      const response = await axios.patch(`http://localhost:3333/basket/quantity/${_id}`, updatingBasket);
      const updatedBasket = response.data;
      console.log(updatedBasket)
      return updatedBasket
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasket.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.items.push(action.payload)   
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.items = action.payload;
        state.items = state.items.filter(item => item.status === status.in_Cart);
      })
      .addCase(changeQuantities.fulfilled, (state, action) => {
        const updatedItems = state.items.map(item =>
          item.productId === action.payload.productId ? action.payload : item
        );
        state.items = updatedItems;
      })
      .addCase(removeAllFromBasket.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { actions: basketActions, reducer: basketReducer } = basketSlice;