import "./userList.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponentU from "../../components/LoadingComponentU";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteUserAction, getUsersAction, reset } from "../../features/users/authSlice";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

export default function UserList() {
  
const dispatch = useDispatch()
  
  const { users, isDeleted, isError, message,isLoading }= useSelector(state => state.authslice);

 

  useEffect(()=>{ 
  if(isError){
    toast.error(message)
  }
  dispatch(getUsersAction())

  if(isDeleted){
    dispatch(getUsersAction())
  }

  return ()=>{
   dispatch(reset())
  }

  },[isError,isDeleted, dispatch])

  

  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "userName",
      headerName: "UserName",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
               onClick={() => dispatch(deleteUserAction(params.row._id))}
        
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList"> 
       <h4>Customers Data</h4>
      <div className="userListWrapper">
      { isLoading ? (
        <>
        <LoadingComponentU />
        </>
      ) : users.length > 0 ? (
        <>
      <DataGrid
        rows ={users}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      /> </>) :<Typography variant="h6">No Users To Display</Typography>
    }

     </div>
    </div>
  );
}
