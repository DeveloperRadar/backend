require("dotenv").config();
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const { setupWebSocket } = require("./websocket");

const { MONGO_USER, MONGO_PASS, MONGO_DATABASE } = process.env;

// Connect to MONGO_DB
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-psh5r.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();
const server = http.Server(app);
setupWebSocket(server);
// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(routes);

server.listen(3333, () => {
  console.log(`App is listening at http://localhost:3333`);
});
