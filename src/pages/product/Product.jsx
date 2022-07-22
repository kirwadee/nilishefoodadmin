import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFoodsAction, reset, updateFoodAction } from "../../features/foods/foodSlice";
import { toast } from "react-toastify";





export default function Product() {
  const location = useLocation();
  const foodId = location.pathname.split("/")[2];

  //Find the targeted product from the redux store after comparing it with its params id
  const food = useSelector((state) => state.foodslice.foods.find((food) => food._id === foodId));
  //store the product in a useState hook
  // const [fetchedProduct, setFetchedProduct] = useState(food);

 const { isUpdated, isError, message} = useSelector(state => state.foodslice)
 
  const dispatch = useDispatch();

  

  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCook, setNewCook] = useState(null);



  const handleFoodUpdate = (e)=>{
    e.preventDefault();
     dispatch(
      updateFoodAction(
         foodId,
        {
         name:newName,
         category:newCat,
         price:newPrice,
         description:newDesc,
         cookingDuration:newCook
        }));
  }

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    
    if(isUpdated){
      dispatch(getFoodsAction())
    }

    return ()=>{
      dispatch(reset())
    }

  },[dispatch, isError, isUpdated])


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newfood">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={food?.image} alt="" className="productInfoImg" />
            <span className="productName">{food?.name}</span>
          </div>
          <div className="productInfoBottom">
            
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Food Name</label>
            <input 
             type="text"
             placeholder={food?.name}
             onChange={(e) => setNewName(e.target.value)}
              />
            <label>Food Description</label>
            <input 
             type="text"
             placeholder={food?.descprition}
             onChange={(e) => setNewDesc(e.target.value)}
              />
            <label>Price</label>
            <input
             type="text"
             placeholder={food?.price}
             onChange={(e)=>setNewPrice(e.target.value)}
              />
            <label>Category</label>
            <input
             type="text"
             placeholder={food?.category}
             onChange={(e)=>setNewCat(e.target.value)}
              />
            <label>Cooking Duration</label>
            <input
             type="text"
             placeholder={food?.cookingDuration}
             onChange={(e)=>setNewCook(e.target.value)}
              />
           
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={food?.image} alt="" className="productUploadImg"  />
             
            </div>
            <button  className="productButton"
             onClick={handleFoodUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
