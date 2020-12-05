require("dotenv").config({ path: "./api/.env" });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const { sequelize } = require("./api/config/sequelize.js");

app.all(["/survey-responses", "/results"], (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/survey-responses", async (req, res) => {
  return res.send("Coming soon");
});

app.get("/survey-responses", async (req, res) => {
  const surveyResponses = await sequelize.models.SurveyResponse.findAll();
  return res.send({ surveyResponses });
});

app.get("/results", async (req, res) => {
  return res.send("Results");
});

app.get("/status", async (req, res) => {
  return res.send("ok");
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`✅  Backend listening on port ${port}`)
);

module.exports = server;
