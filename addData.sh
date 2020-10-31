mongoimport --uri "mongodb+srv://pini85:ykCRsTFDHfLOBYmn@cluster0.as0qx.mongodb.net/quizApp?retryWrites=true&w=majority" --collection questions --drop --file db/questions.json --jsonArray
# //include -- drop before --file (it will overide all data)
