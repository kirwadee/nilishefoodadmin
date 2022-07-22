import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
    orders : [],
    isError : false,
    isSuccess : false,
    isCreated : false,
    isUpdated : false,
    isDeleted : false,
    isLoading: false,
    message : ''
}

//create a new order action
export const createOrderAction = createAsyncThunk('orders/create',
async(foodData, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await orderService.createOrder(foodData, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//update order action
export const updateOrderAction = createAsyncThunk('orders/update',
async(orderId, foodData, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await orderService.updateOrder(orderId, foodData, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//delete order action
export const deleteOrderAction = createAsyncThunk('orders/delete',
async(orderId, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await orderService.deleteOrder(orderId, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//get all orders action
export const getOrdersAction = createAsyncThunk('orders/all',
async(_, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await orderService.getOrders(token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})




export const orderSlice = createSlice({
    name:'orderslice',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder)=>{
      builder
      .addCase(createOrderAction.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(createOrderAction.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isCreated = true
        state.orders.push(action.payload)
      })
      .addCase(createOrderAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) 
      .addCase(updateOrderAction.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(updateOrderAction.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isUpdated = true
        state.foods.push(action.payload)
      })
      .addCase(updateOrderAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) 
      .addCase(deleteOrderAction.pending, (state) => {
        state.isLoading = true
    })
    .addCase(deleteOrderAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleted = true
        state.orders = state.orders.filter((order) => order._id !== action.payload.id)
    })
    .addCase(deleteOrderAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    .addCase(getOrdersAction.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getOrdersAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
    })
    .addCase(getOrdersAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer