import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/users/authSlice";
import "./newUser.css";
import { toast } from "react-toastify";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prevInputs)=>{
       return {...prevInputs, [e.target.name] : e.target.value}}
       )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputs))  
  }

  const {isSuccess, message, isError} = useSelector(state => state.authslice)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      alert("User created successfully")
      navigate('/users')
    }

    return ()=>{
      dispatch(reset())
    }

  },[isError, isSuccess, dispatch])

  return (
    <div className="newUser">
     
      <form className="newUserForm" onSubmit={handleSubmit}>
      <h1 style={{align:"center"}}>New User</h1>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="miri" name="userName" onChange = {handleChange} />
        </div>
      
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="miriammoraa@gmail.com" name="email" onChange = {handleChange} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password" onChange = {handleChange} />
        </div>
        
        <button className="newUserButton" type="submit">
          Create New User
        </button>
      </form>
    </div>
  );
}
