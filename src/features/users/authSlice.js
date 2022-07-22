import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from local storage
const user = JSON.parse(localStorage.getItem('userData'))

const initialState = {
    user:user ? user : null,
    users:[],
    usersNew:[],
    isError:false,
    isSuccess:false,
    isUpdated:false,
    isDeleted:false,
    isLoading:false,
    message:''
}

export const register = createAsyncThunk('auth/register', 
  async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
         error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', 
  async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
         error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', 
async () => {
   return await authService.logout()
});

//get all users action
export const getUsersAction = createAsyncThunk('users/all',
async(_, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await authService.getUsers(token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//get new users action
export const getNewUsersAction = createAsyncThunk('users/new',
async(_, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await authService.getNewUsers(token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//delete user action
export const deleteUserAction = createAsyncThunk('user/delete',
async(userId, thunkAPI) =>{
    try {
      const token = thunkAPI.getState().authslice.user.token
      return await authService.deleteUser(userId, token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//update user action
export const updateUserAction = createAsyncThunk('users/update',
async(userId, userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authslice.user.token
        return await authService.updateUser(userId, userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.users.push(action.payload)
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(getUsersAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUsersAction.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
        })
        .addCase(getUsersAction.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = null
        })
        .addCase(getNewUsersAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNewUsersAction.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.usersNew = action.payload
        })
        .addCase(getNewUsersAction.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.usersNew = null
        })
        
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
        .addCase(deleteUserAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteUserAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.isDeleted = true
            state.users = state.users.filter((user) => user._id !== action.payload.id)
        })
        .addCase(deleteUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateUserAction.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(updateUserAction.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isUpdated = true
            const newUsers = state.users.map((user) => {
                if(user._id === action.payload._id){
                    user.userName = action.payload.userName
                    user.email = action.payload.email
                    user.phone = action.payload.phone
                    
                    return user
                } else {
                    return user
                }
            })
            state.users = newUsers
        
          })
          .addCase(updateUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          }) 
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer