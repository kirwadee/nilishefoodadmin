import axios from 'axios'

const API_URL_R = 'https://nilishecafeadminpanel.herokuapp.com/users/register/'
const API_URL_L = 'https://nilishecafeadminpanel.herokuapp.com/users/login/'
const API_URL = 'https://nilishecafeadminpanel.herokuapp.com/users/'
const API_URL_N = 'https://nilishecafeadminpanel.herokuapp.com/users/?new=true'


//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL_R, userData)

    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL_L, userData)

    if(response.data){
        localStorage.setItem('userData', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('userData')
}

//get all users
const getUsers = async(token)=>{
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(API_URL, config)
    return response.data
}

//delete user
const deleteUser = async(userId, token)=>{
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.delete(API_URL + userId, config)
    return response.data
}

//update user
const updateUser = async(userId, userData, token)=>{
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(API_URL + userId, userData, config)
    return response.data
}

//get 5 new users
const getNewUsers = async(token)=>{
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(API_URL_N, config)
    return response.data
}

const authService = {
    register,
    login,
    logout,
    getUsers,
    getNewUsers,
    deleteUser,
    updateUser
}

export default authService