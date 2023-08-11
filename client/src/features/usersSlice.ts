import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { User } from '../utils/User';


interface UsersState {
    users: User[];
    loading: boolean;
}

const initialState: UsersState = {
    users: [],
    loading: false,
};


export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const data = axios.get('http://localhost:3333/users');
    const usersData = (await data).data as User[];
    return usersData || [];
});

export const createUser = createAsyncThunk('users/createUser', async (user: User) => {
    const response = await axios.post('http://localhost:3333/users/register', {...user});
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
    }
});

export const {actions: userActions, reducer: userReducer} = usersSlice;