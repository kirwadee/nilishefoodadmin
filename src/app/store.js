import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import  authReducer from '../features/users/authSlice';
import foodReducer from '../features/foods/foodSlice';
import orderReducer from '../features/orders/orderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authslice:authReducer,
    foodslice:foodReducer,
    orderslice:orderReducer
  },
});
