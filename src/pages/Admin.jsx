import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Addproduct from "../components/addproduct/Addproduct";
import Listproduct from "../components/listproduct/Listproduct";
import './Admin.css'

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<Addproduct/>} />
        <Route path="/listproduct" element={<Listproduct/>} />
      </Routes>
    </div>
  );
};

export default Admin;
