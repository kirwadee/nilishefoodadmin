import axios from "axios"

const API_URL = 'https://nilishecafeadminpanel.herokuapp.com/orders/'

//create new order

const createOrder = async(foodData, token) =>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, foodData, config)

    return response.data
};

//delete order
const deleteOrder = async (foodId, token) => {
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + foodId, config)

    return response.data
}
//update food
const updateOrder = async (foodData, foodId, token) => {
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + foodId, foodData, config)

    return response.data
}

//get all orders
const getOrders = async (token) => {
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }

  const response = await axios.get(API_URL, config)

    return response.data
}


const orderService = {
    createOrder,
    getOrders,
    deleteOrder,
    updateOrder,
}

export default orderService

