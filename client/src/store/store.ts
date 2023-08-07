import { configureStore } from '@reduxjs/toolkit';
import { basketReducer } from '../features/basketSlice';
import { productsReducer } from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    products: productsReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;