const connection = "mongodb://127.0.0.1:27017/quiz";
mongoose.connect(connection, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
