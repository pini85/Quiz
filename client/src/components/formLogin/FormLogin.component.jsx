import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthenticatedContext from "../../AuthenticatedContext";
import axios from "axios";
const FormLogin = (props) => {
  const { setAuthentication } = useContext(AuthenticatedContext);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleClick = async () => {
    props.setShowForm(false);
    if (props.type === "new") {
      const fetchUser = await axios.post("/api/users/", {
        formValues,
      });
      setAuthentication(true);
      localStorage.setItem("user", JSON.stringify(fetchUser.data));
      history.push("/");
    } else {
      const fetchUser = await axios.post("/api/users/login", { formValues });

      setAuthentication(true);
      localStorage.setItem("user", JSON.stringify(fetchUser.data));
      history.push("/");
    }
  };
  const handleOnChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  return (
    <div>
      {props.type === "new" && (
        <>
          <label>User name</label>
          <input
            value={formValues.name}
            onChange={(e) => handleOnChange(e)}
            type="text"
            name="name"
          />
        </>
      )}
      <label>Email</label>
      <input
        value={formValues.email}
        onChange={(e) => handleOnChange(e)}
        type="email"
        name="email"
      />
      <label>Password</label>
      <input
        onChange={(e) => handleOnChange(e)}
        type="password"
        autoComplete="on"
        name="password"
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};
export default FormLogin;
