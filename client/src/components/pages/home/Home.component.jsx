import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthenticatedContext from "../../../AuthenticatedContext";
const Home = () => {
  const { authentication } = useContext(AuthenticatedContext);
  const styleContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <div style={styleContainer}>
      <h1>Welcome to Quiz</h1>
      {authentication && (
        <>
          <div style={{ margin: "3rem" }}>
            <Link to="/create-quiz">
              <h3>Answer Quiz</h3>
            </Link>
          </div>
          <div>
            <Link to="/score-board">
              <h3>See friends answers</h3>
            </Link>
          </div>
          <div>
            <Link to="/my-answers">
              <h3>Your answers</h3>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
