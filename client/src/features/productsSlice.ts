import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../utils/Product';
import axios from 'axios';


interface ProductState {
    products: Product[];
    loading: boolean;
}

const initialState: ProductState = {
    products: [],
    loading: false,
};


export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const data = axios.get('http://localhost:3333/products');
    const prods: Product[] = (await data).data;
    return prods;
});

export const editProduct = createAsyncThunk('product/editProduct', async (productItem: Product) => {
    const {_id, rating, click} = productItem;
    // const prevData = await axios.get(`http://localhost:3333/products/${_id}`);
    // const data = { ...prevData, rating}
    try {
       const response = await axios.patch(`http://localhost:3333/products/${_id}`, {rating, click});
       const productUpdated = await response.data;
       console.log(productUpdated);
       return productUpdated;
    } catch(e) {
        console.log(e);
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(editProduct.fulfilled, (state, {payload}) => {
                state.products = payload;
            });
    },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;