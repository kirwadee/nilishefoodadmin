import "./productList.css";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteFoodAction, getFoodsAction, reset } from "../../features/foods/foodSlice";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";



export default function ProductList() {
  const dispatch = useDispatch();

  //pull foods from redux store
  const {isDeleted, foods, isLoading, isError, message } = useSelector(state => state.foodslice)

  //When the component mounts dispatch all products to the redux store
  useEffect(()=>{
    if (isError){
      toast.error(message)
    }
    dispatch(getFoodsAction())

    if(isDeleted){
      dispatch(getFoodsAction())
    }
    
    return ()=>{
      dispatch(reset())
    }

   },[dispatch, isError, isDeleted])




  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "description", headerName: "Description", width: 500 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/food/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => dispatch(deleteFoodAction(params.row._id))}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newfood" style={{textDecoration:'none', color:'inherit'}} >
      <Button
       variant="contained"
       sx={{
        align:'left',
        '&.MuiButton-root':{
          width:"200px",
          marginBottom:"20px",
          backgroundColor:"pink",
          textTransform:'none'
        }
       }}
      >
        Add Food
      </Button>
      </Link>
      {isLoading ? (<LoadingComponent />) : foods.length > 0 ? (
        <>
      <DataGrid
        rows={foods}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      </>) : <Typography variant="h6" align="center" >No Foods To Display</Typography> }
    </div>
  );
}
