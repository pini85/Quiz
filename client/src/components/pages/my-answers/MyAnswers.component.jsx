import React, { useEffect } from "react";
import axios from "axios";

const MyAnswers = () => {
  useEffect(() => {
    const fetchAnswers = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "[]");
      const answers = await axios.get("/api/quiz/my-answers", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(answers.data);
    };
    fetchAnswers();
  }, []);
  return <div>MyAnswers</div>;
};
export default MyAnswers;
