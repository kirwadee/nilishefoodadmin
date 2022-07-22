import "./widgetSm.css";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getNewUsersAction, reset } from "../../features/users/authSlice";
import { toast } from "react-toastify";


export default function WidgetSm() {

  const dispatch = useDispatch()
  
  const {usersNew, message, isError} = useSelector(state => state.authslice)


  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    dispatch(getNewUsersAction())

    return () => {
      dispatch(reset())
    }
   }, [isError, dispatch])


  
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {usersNew?.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user?.image ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.userName}</span>
            </div>
            <button className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
