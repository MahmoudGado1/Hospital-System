/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Login from "./components/Login";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import AddNewAdmin from "./components/AddNewAdmin";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated,setAdmin } = useContext(
    Context
  );
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin(false); 
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
