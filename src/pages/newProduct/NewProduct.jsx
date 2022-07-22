import { useState } from "react";
import "./newProduct.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createFoodAction, reset } from "../../features/foods/foodSlice";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { toast } from "react-toastify";
import app from "../../firebase";
import { Alert, Button } from "@mui/material";


export default function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({});

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState()
  const[perc, setPerc] = useState(null)
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file)
    setSelectedFile(file)
    setFileInputState(e.target.value)
  }

  const handleChange = (e) => {
    setInputs((prevInputs) => {
      return { ...prevInputs, [e.target.name]: e.target.value };
    });
  };

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if(!selectedFile) return;

      const fileName = new Date().getTime() + selectedFile.name
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);


    uploadTask.on('state_changed', 
   (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPerc(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const data = ({...inputs, image:downloadURL})
      dispatch(createFoodAction(data))
      setInputs({})
      setFileInputState('')
      setPreviewSource('')
    });
  }
);
    

    

  };

  



  const {isCreated} = useSelector(state => state.foodslice)

  useEffect(()=>{
    if(isCreated){
      toast.success('Food Created Successfully')
     navigate('/foods', {replace : true}) 
    }
    return ()=>{
      dispatch(reset())
    }
  },[isCreated, dispatch, navigate])


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Food</h1>
      <form className="addProductForm" onSubmit={handleFormSubmit} >
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="fileInput"
            name="image"
            value={fileInputState}
            onChange={handleFileInputChange}
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Meat"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input
            type="text"
            name="category"
            placeholder="breakfast"
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Cooking Duration</label>
          <input
            type="number"
            name="cookingDuration"
            placeholder="breakfast"
            onChange={handleChange} />
        </div>
        <Button
            variant="contained" 
           type="submit" 
           disabled = {perc !== null && perc < 100}
          >
          Create Food
        </Button>
      </form>
     { previewSource && (
      <img src={previewSource} alt="chosen" style={{height:'300px'}} />
     ) }
    </div>
  );
}
