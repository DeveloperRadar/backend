const { Router } = require("express");
const routes = Router();

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

routes.get("/", (req, res) => {
  res.json({ message: "Hello, Omnistack10!"});
});

// /devs
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

// search
routes.get("/search", SearchController.index);
module.exports = routes;
