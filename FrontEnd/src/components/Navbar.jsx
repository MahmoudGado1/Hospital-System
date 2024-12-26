import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
      setShow(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const goToLogin = () => {
    navigate("/login");
    setShow(false)
  };



  return (
    <div className="navbar">
      <nav className="container">
        <div className="logo">ZeeCare</div>
        <div className={!show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(false)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(false)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              Login
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow((prev) => !prev)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
