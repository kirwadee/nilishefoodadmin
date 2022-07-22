import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OrdersList from "./pages/ordersList/OrdersList";

function App() {
  const {user} = useSelector((state) => state?.authslice);
  
  return (
    <>
    <Router>
      
         <Topbar /> 

            
            <div className="container">
            <Routes> 
              {user && (<>
             <Route path="/" element={<><Sidebar/><Home/></>} />
                
              
              <Route path="/users" element={<UserList />} />
                
              <Route path="/user/:userId" element={<User />} />
                
              <Route path="/newUser" element={<NewUser />} />
                
              <Route path="/foods" element={<ProductList />} />
                
              <Route path="/food/:id" element={<Product />} />
                
              <Route path="/newfood" element={<NewProduct />} />
              <Route path="/orders" element={<OrdersList />} />
              </> )}
               <Route path="/login" element={<Login/>} /> 
              </Routes>
            </div>
           
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;

