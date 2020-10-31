const Questions = require("../models/Questions");
const Answers = require("../models/Answers");
const Results = require("../models/Results");
const User = require("../models/User");
const auth = require("../middleware/auth");

module.exports = async (app) => {
  app.get("/api/quiz/questions", auth, async (req, res) => {
    try {
      const questions = await Questions.find({});
      res.send(questions);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post("/api/quiz/my-answers", auth, async (req, res) => {
    //prevent from answering the same quiz twice. If answers twice redirect to patch?
    console.log("body", req.body.data);
    const answers = new Answers({
      answers: [...req.body.data],
      owner: req.user._id,
    });
    try {
      await answers.save();
      res.status(201).send(answers);
    } catch (e) {
      req.status(400).send(e);
    }
  });

  app.patch("/api/quiz/my-answers", auth, async (req, res) => {
    //todo
  });

  app.get("/api/quiz/my-answers", auth, async (req, res) => {
    try {
      await req.user
        .populate({
          path: "answers",
        })
        .execPopulate();
      res.send(req.user.answers);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // /answer-quiz/api/quiz/answers/5f9d2ffeafa97e6511f340ac
  app.get("/api/quiz/answers/:id", auth, async (req, res) => {
    console.log("hiiiii");
    const id = req.params.id;

    try {
      const question = await Answers.find({ owner: id });
      console.log(question);

      res.send(question);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  app.post("/api/quiz/answers/:id", auth, async (req, res) => {
    const myId = req.params.id;

    const myFriendsAnswers = req.body.answers;
    //can only have one answer quiz
    //create a quiz id tat holds the answers and user id
    try {
      let counter = 0;
      const myAnswers = await Answers.findOne({
        owner: myId,
      });

      myAnswers.answers.forEach((answer, i) => {
        if (answer.answer === myFriendsAnswers[i]) {
          counter++;
        }
      });
      //seperate the friend and the profile with better naming
      //rank/grade/answered grade/rating
      const rating = `${counter}/${answeredFromUser.answers.length}`;
      const answers = new Results({
        answers: [...myAnswers],
        answeredToUserId,
        name: req.user.name,
        result: rating,
        owner: answeredToUserId,
      });
      answers.save();
      res.send(answers);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  app.get("/api/quiz/my-answered-questions", auth, async (req, res) => {
    try {
      const results = await Results.find({ answeredToUserId: req.user._id });

      const answers = results.map((result) => {
        return { name: result.name, result: result.result };
      });

      res.send(answers);
    } catch (e) {
      res.status(500).send(e);
    }
  });
};
