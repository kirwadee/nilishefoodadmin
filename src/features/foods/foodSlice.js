import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import foodService from "./foodService";

const initialState = {
    foods : [],
    isError : false,
    isFetched : false,
    isCreated : false,
    isUpdated : false,
    isDeleted : false,
    isLoading: false,
    message : ''
}

//create a new food action
export const createFoodAction = createAsyncThunk('foods/create',
async(foodData, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await foodService.createFood(foodData, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//update food action
export const updateFoodAction = createAsyncThunk('foods/update',
async(foodId, foodData, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await foodService.updateFood(foodId, foodData, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//delete food action
export const deleteFoodAction = createAsyncThunk('foods/delete',
async(foodId, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await foodService.deleteFood(foodId, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//get all foods action
export const getFoodsAction = createAsyncThunk('foods/all',
async(_, thunkAPI) =>{
    try {
      return await foodService.getFoods() 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})




export const foodSlice = createSlice({
    name:'foodslice',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder)=>{
      builder
      .addCase(createFoodAction.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(createFoodAction.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isCreated = true
        state.foods.push(action.payload)
      })
      .addCase(createFoodAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) 
      .addCase(updateFoodAction.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(updateFoodAction.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isUpdated = true
        const newfoods = state.foods.map((food) => {
          if(food._id === action.payload.id){
            food.name = action.payload.name
            food.description = action.payload.description
            food.price = action.payload.price
            food.cookingDuration = action.payload.cookingDuration

            return food
          } else {
            return food
          }
        })
        state.foods = newfoods
      })
      .addCase(updateFoodAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) 
      .addCase(deleteFoodAction.pending, (state) => {
        state.isLoading = true
    })
    .addCase(deleteFoodAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleted = true
        state.foods = state.foods.filter((food) => food._id !== action.payload.id)
    })
    .addCase(deleteFoodAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    .addCase(getFoodsAction.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getFoodsAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isFetched = true
        state.foods = action.payload
    })
    .addCase(getFoodsAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    }
})

export const { reset } = foodSlice.actions
export default foodSlice.reducer