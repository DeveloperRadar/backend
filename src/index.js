require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const { MONGO_USER, MONGO_PASS, MONGO_DATABASE } = process.env;

// Connect to MONGO_DB
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-psh5r.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();
// Middlewares
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log(`App is listening at http://localhost:3333`);
});
