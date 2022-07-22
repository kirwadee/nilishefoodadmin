import "./sidebar.css";
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyleIcon className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Add User
              </li>
            </Link>
            <Link to="/foods" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Foods
              </li>
            </Link>
            <Link to="/newfood" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Add Food
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
       
      </div>
    </div>
  );
}
