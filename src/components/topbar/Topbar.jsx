import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { logout, reset } from "../../features/users/authSlice";

export default function Topbar() {

   const {user} = useSelector(state => state.authslice)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onLogout = ()=>{
    dispatch(logout());
    dispatch(reset());
    
   }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
          <span className="logo">Nilishe Cafe Admin Panel</span>
          </Link>
        </div>
        <div className="topRight">
         {user ?
          <>
             <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
            <button onClick={onLogout}
             style={{backgroundColor:"red", border:"none", borderRadius:"10px", padding:"3px", cursor:"pointer",
            marginLeft:"10px"}}
            >
              Logout
            </button>
          </div>
          <Avatar className="topAvatar"  >
            {user.userName}
          </Avatar>
         </> : (
              <Link to="/login">
               <button style={{padding:"7px",textDecoration:"none", color:"black",
                           backgroundColor:"lightskyblue", width:"110px", border:"none", borderRadius:"10px" }}>
                Login
                </button>
               </Link>)
               }
        </div>
      </div>
    </div>
  );
}
