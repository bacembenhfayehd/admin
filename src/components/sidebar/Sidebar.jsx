import { Link } from "react-router-dom";
import "./Sidebar.css";
import add from '../../assets/Product_Cart.svg'
import list from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/listproduct" style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={list} alt="" />
          <p>List products</p>
        </div>
      </Link>
      <Link to="/addproduct" style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={add} alt="" />
          <p>Add product</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
