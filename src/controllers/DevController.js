const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    // Check if user exists
    let dev = await Dev.findOne({ github_username });
    if(!dev) {
      // Create dev in database
      // Split on comma and trim string
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      }
      // Fetch name, avatar_url and bio from github api
      const response = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = response.data;
      // Write to database
      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async update(req, res) {
    // name, bio, techs, location
    // you are not allowed to update the github_username field
  },

  async destroy(req, res) {

  }

};
