import React, { useEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import HomePageImg from "../Assets/images/mid.png";
import Button from "../Components/HomePageButtons/Buttons";
import Stars from "../Components/Stars/Stars";
import Nav from "../Components/Nav/Nav";
import Back from "../Components/Back/Back";
import axios from "../Axios/axios";
import Spinner from "../Components/Spinner/BlogSpinner";
import { AuthContext } from "../context/auth-context";
import Snacker from "../Components/Snacker/Snaker";

function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const auth = useContext(AuthContext);
  const [startSpinner, setSpinner] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fn = async () => {
      if (searchParams.get("code")) {
        const code = searchParams.get("code");

        let data;

        try {
          setSpinner(true);
          data = await axios.post("/Oauth/authenticated", { code: code });
          auth.login(data.data.user, data.data.token);
          if (data.data.Way === "signup") {
            history.push("/updateUser");
          } else {
              history.push(
                localStorage.getItem("loginUrl")
                  ? localStorage.getItem("loginUrl")
                  : "/homepage"
              );
              localStorage.removeItem("loginUrl");
          }
        } catch (e) {
          setError("Oops something went wrong try again later!");
        }
        setSpinner(false);
      }

      if (location.state && location.state.error) {
        setError(location.state.error);
      }
    };
    fn();
  }, []);

  const roomHandler = () => {
    history.push("/rooms");
  };

  const blogHandler = () => {
    history.push("/blogs");
  };

  const profileHandler = () => {
    if (auth.token) {
      return history.push("/me");
    }
    setError("Login Required !");
  };

  const contestHandler = () => {
    if (auth.token) {
      const room = uuid() + "contest";
      history.push({
        pathname: "/newContest",
        search: "?room=" + room,
      });
    }
    setError("Login Required !");
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse, #77B6FF 0%, #171717 100%)",
        }}
      >
        <Stars color="#fff" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Back />
          <Nav />
        </div>
        {startSpinner ? (
          <Spinner />
        ) : (
          <>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{
                minHeight: "80vh",
                boxSizing: "border-box",
              }}
            >
              <img
                src={HomePageImg}
                style={{
                 
                  width: "300px",
                  height: "250px",
                
                }}
              />

              <Button name="EDITZONE" clicked={roomHandler} />
                <a href="https://main--legendary-lebkuchen-f70c57.netlify.app/">
              <Button name="TESTZONE" clicked={profileHandler} />
                </a>
              <a href="https://dynamic-pudding-ef5ae6.netlify.app/">
              <Button name="MOCKZONE" />
               </a>
                <a href="https://iftiinupkeep-production.up.railway.app/">
              <Button name="MONITORZONE" />
               </a>
  <a href="https://iftiinupkeep-production.up.railway.app/">
              <Button name="MEMOZONE" />
               </a>
  <a href="https://iftiinupkeep-production.up.railway.app/">
              <Button name="BOARDZONE" />
               </a>
            </Grid>
          </>
        )}
      </div>
      <Snacker
        open={error !== null}
        severity="error"
        timer={6000}
        message={error}
        onClose={() => setError(null)}
      />
    </>
  );
}

export default HomePage;
