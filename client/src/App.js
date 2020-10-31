import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthenticatedContext from "./AuthenticatedContext";
import Header from "./components/header/Header.component";
import Home from "./components/pages/home/Home.component";
import CreateQuiz from "./components/pages/CreateQuiz/CreateQuiz.component";
import MyAnswers from "./components/pages/my-answers/MyAnswers.component";

function App() {
  const [authentication, setAuthentication] = useState(AuthenticatedContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    console.log(user);
    if (user.token) {
      setAuthentication(true);
      // axiosInstance(user);
      // axios.interceptors.request.use(
      //   function (config) {
      //     const user = localStorage.getItem("user");
      //     if (user) config.headers.Authorization = `Bearer ${user.token}`;

      //     return config;
      //   },
      //   function (error) {
      //     console.log(error);
      //     return Promise.reject(error);
      //   }
      // );
    } else {
      setAuthentication(false);
    }
  }, [authentication]);

  return (
    <div>
      <AuthenticatedContext.Provider
        value={{ authentication, setAuthentication }}
      >
        <Router>
          <Header></Header>
          <Route exact path="/" component={Home} />
          <Route path="/create-quiz" component={CreateQuiz} />
          <Route path="/my-answers" component={MyAnswers} />
        </Router>
      </AuthenticatedContext.Provider>
    </div>
  );
}

export default App;
// https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
