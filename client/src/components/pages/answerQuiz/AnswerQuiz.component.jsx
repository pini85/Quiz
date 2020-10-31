import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnswerQuiz = () => {
  const [answers, setAnswers] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "[]");

      const data = await axios.get(`/api/quiz/answers/${params.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(data);
    };
    fetchData();
  }, []);
  return <div></div>;
};
export default AnswerQuiz;
