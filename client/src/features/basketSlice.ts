import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../utils/Product';

interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

export const addToBasket = createAsyncThunk('basket/addToBasket', async (product: Product) => {
    return product;
});

export const removeFromBasket = createAsyncThunk('basket/removeFromBasket', async (productId: string) => {
    return productId;
  });

export const removeAllFromBasket = createAsyncThunk('basket/removeAllFromBasket', async () => {
    return [];
})

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.items.push(action.payload)     
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeAllFromBasket.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default basketSlice.reducer;