import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import './Login.css'
import { login, reset } from "../../features/users/authSlice";
import { toast } from "react-toastify";




//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const Login = () => {
     
  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //get data from store
  const {user, isSuccess, isLoading, isError, message} = useSelector(state => state.authslice);
  

    //formik form
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: values => {
    
        dispatch(login(values));
      },
      validationSchema: formSchema,
    });
  
    //Redirect
    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
    
      if(isSuccess){
        navigate("/")
      }

      return ()=>{
        dispatch(reset())
      }
    
    }, [isSuccess, isError])

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"lemonchiffon",
        width:"100%"
      }}
    >
   
        <h2 style={{color:"lightblue", marginBottom:5, fontWeight:300}}>
          Miria Dishes AdminAccount
        </h2>
     <form onSubmit={formik.handleSubmit}
      style={{display:"flex", alignItems:"center", flexDirection:"column"}}
     >
      <input
        style={{ padding: 10, marginBottom: 10,  width:"100%", outline:"none"  }}
        placeholder="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        
      />
      <span className="alertError">
          {formik.touched.email && formik.errors.email}
      </span>

      <input
        style={{ padding: 10, marginBottom: 10, width:"100%", outline:"none" }}
        placeholder="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      <span className="alertError">
           {formik.touched.password && formik.errors.password}
      </span>
      <button 
       type="submit"
       style={{ padding: 10, width:"114%", backgroundColor:"lightblue", border:"none", cursor:"pointer", }} 
       disabled={isLoading}>
        Login
      </button>
      </form>
    </div>
  );
};

export default Login;
