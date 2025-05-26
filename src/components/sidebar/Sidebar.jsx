import { Link } from "react-router-dom";

const Sidebar = () => {
  return(
  <div>
    <Link to='/addproduct'>Add products</Link>
    <Link to='/listproduct'>List products</Link>
  </div>)
};

export default Sidebar;
