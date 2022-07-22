
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { toast } from "react-toastify";
import { getUsersAction, reset, updateUserAction } from '../../features/users/authSlice';

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2]
  const dispatch = useDispatch()

  //Pull the user from the redux store with that id
 const targetUser = useSelector(state => state?.authslice?.users?.find((tUser) => tUser._id === userId));

 const {users, isUpdated, isError, message} = useSelector(state => state.authslice)
 

  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  //update user
  const handleUserUpdate = (e)=> {
    e.preventDefault()
    dispatch(updateUserAction(
     userId,
     {
       userName:newUsername,
       phone:newPhone,
       email:newEmail,

       }
     ));
    
  }

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isUpdated){
      alert("Updated successfully")
      dispatch(getUsersAction())
    }

    
    return ()=>{
      dispatch(reset())
    }
  },[isError, isUpdated, dispatch])
  
  
  
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{targetUser?.userName} </span>
              <span className="userShowUserTitle">Student</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{targetUser.userName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{targetUser?.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{targetUser?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">Eldoret | KENYA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={targetUser?.userName}
                  onChange={(e)=>setNewUsername(e.target.value)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={targetUser?.email}
                  className="userUpdateInput"
                  onChange={(e)=>setNewEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={targetUser?.email}
                  className="userUpdateInput"
                  onChange={(e)=>setNewPhone(e.target.value)}
                />
              </div>
             
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton"
                onClick={handleUserUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
