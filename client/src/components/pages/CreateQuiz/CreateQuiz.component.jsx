import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSent, setSent] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "[]");
  useEffect(() => {
    const fetchData = async () => {
      console.log(user);

      const data = await axios.get("/api/quiz/questions", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setQuestions(data.data);
    };
    // await axios.post("/api/users/logout", {
    //   headers: { Authorization: `Bearer ${user.token}` },
    // });
    fetchData();
  }, []);

  const handleOnChange = (id, option) => {
    setAnswers([...answers, { question_id: id, answer: option }]);
  };

  const onSubmit = async () => {
    setSent(true);
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    console.log(user.token);
    await axios.post("/api/quiz/my-answers", {
      data: answers,
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  const createLink = () => {
    const id = user.user._id;
    const baseUrl = "answer-quiz/";
    return <Link to={baseUrl + id}>{baseUrl + id}</Link>;
  };

  const displayQuestions = () => {
    return (
      questions &&
      questions.map((question, i) => {
        return (
          <div key={i}>
            <div>{question.question}</div>
            {question.options.map((option, i) => {
              return (
                <React.Fragment key={i}>
                  <label htmlFor={question.question}>
                    {Object.values(option)}
                    <input
                      onChange={() =>
                        handleOnChange(question._id, Object.keys(option)[0])
                      }
                      name={question.question}
                      type="radio"
                      value={Object.values(option)}
                    />
                  </label>
                </React.Fragment>
              );
            })}
          </div>
        );
      })
    );
  };
  return (
    <div>
      <div>{displayQuestions()}</div>
      <button onClick={onSubmit}>Submit answer</button>
      <div>{isSent && createLink()}</div>
    </div>
  );
};
export default CreateQuiz;
