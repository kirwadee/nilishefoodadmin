import axios from "axios"

const API_URL = 'https://nilishecafeadminpanel.herokuapp.com/foods/'

//create new food

const createFood = async(foodData, token) =>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, foodData, config)

    return response.data
};

//delete food
const deleteFood = async (foodId, token) => {
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + foodId, config)

    return response.data
}
//update food
const updateFood = async (foodData, foodId, token) => {
    const config = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + foodId, foodData, config)

    return response.data
}

//get all foods
const getFoods = async () => {
  

  const response = await axios.get(API_URL)

    return response.data
}


const foodService = {
    createFood,
    getFoods,
    deleteFood,
    updateFood,
}

export default foodService

