import { useContext } from "react";
import { useHistory,useLocation } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import axios from "../../Axios/axios";
import NavItem from "./NavItems";
import "./NavItem.css";

export default function () {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const loginHandler = async () => {
    try {
      const req = await axios.get("/Oauth/googleOauth");
      const searchParams = new URLSearchParams(location.search);
      localStorage.setItem(
        "loginUrl",
        location.pathname + "?" + searchParams.toString()
      );
      window.location.href = req.data;
    } catch (e) {
      alert("Oops something went wrong try again later")
    }
  };
  const logoutHandler = () => {
    const searchParams = new URLSearchParams(location.search);
    localStorage.setItem("logoutUrl",location.pathname + '?' +  searchParams.toString())
    history.push("/logout");
  };

  const aboutHandler = () => {
    history.push("/about");
  };
  
  return (
    <div className="headerss">
      {auth.isLoggedIn === false ? (
        <>

        </>
      ) : (
        <>
          <NavItem Name="logout" clicked={logoutHandler} />
        </>
      )}
      <NavItem Name="About" clicked={aboutHandler} />
         <a href="https://iftiinhubpricing.click/">
        <NavItem Name="Pricing" />
          </a>
    </div>
  );
}

