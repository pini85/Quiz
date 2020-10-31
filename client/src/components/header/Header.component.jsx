import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthenticationContext from "../../AuthenticatedContext";
import axios from "axios";
import FormLogin from "../formLogin/FormLogin.component";
const Header = (props) => {
  const [isShowForm, setShowForm] = useState(false);
  const [isShowButton, setShowButton] = useState(true);
  const [showLogInOptions, setShowLogInOptions] = useState(false);
  const [type, setType] = useState(false);

  const { authentication, setAuthentication } = useContext(
    AuthenticationContext
  );
  const history = useHistory();

  const handleClick = (type) => {
    if (type === "sign in") {
      setShowButton(!isShowButton);
      setShowLogInOptions(true);
    } else {
      setType(type);
      setShowForm(!isShowForm);
      setShowLogInOptions(false);
    }
  };
  const handleLogOutClick = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "[]");

    if (user) {
      await axios.post("/api/users/logout", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      localStorage.removeItem("user");
      setShowButton(true);
      setAuthentication(false);
      console.log(props);
      history.push("/");
    }
  };
  const containerStyles = {
    height: "8vh",
    backgroundColor: "rgb(237, 237, 237)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  return (
    <div style={containerStyles}>
      <div style={{ marginRight: "1rem" }}>
        {isShowButton && !authentication && (
          <button onClick={() => handleClick("sign in")}>Sign in</button>
        )}
        {}
        {authentication && <button onClick={handleLogOutClick}>Log Out</button>}
        {showLogInOptions && (
          <div>
            <button onClick={() => handleClick("old")}>Existing User</button>
            <button onClick={() => handleClick("new")}>New User</button>
          </div>
        )}
        {isShowForm && (
          <FormLogin setShowForm={setShowForm} type={type}></FormLogin>
        )}
      </div>
    </div>
  );
};
export default Header;
