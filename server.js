require("dotenv").config({ path: "./api/.env" });
const jwt = require("jsonwebtoken");
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
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const verified = jwt.verify(token, process.env.RSA_PUBLIC_KEY, {
      algorithm: "RS256",
    });
    const surveyResponse = await sequelize.models.SurveyResponse.create({
      userId: verified.userId,
      data: req.body.data,
    });
    return res.send(surveyResponse);
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
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
