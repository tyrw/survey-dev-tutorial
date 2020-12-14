const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const Test = require("./test.config.js");
const { sequelize } = require("../config/sequelize.js");

const ax = axios.create({
  baseURL: "http://localhost:5000",
});

describe("SurveyResponses endpoints", () => {
  before(async () => {
    // Reset the database before running these tests
    await Test.resetAllTables();

    // Create 2 survey responses
    await sequelize.models.SurveyResponse.create({
      userId: 66,
      data: {
        favoriteColor: "red",
        technology: ["Angular", "TypeScript"],
      },
    });
    await sequelize.models.SurveyResponse.create({
      userId: 77,
      data: {
        favoriteColor: "blue",
        technology: ["React"],
      },
    });

    return Promise.resolve();
  });

  it("POST /survey-responses should create a survey response", async () => {
    const payload = {
      data: {
        favoriteColor: "green",
        technology: ["Vue", "Node.js"],
      },
    };

    // Perform a POST request to /survey-responses
    const { data, status } = await ax.post("/survey-responses", payload);

    // Check that the server returns a 200 status code
    expect(status).to.equal(200);

    // Check that the surveyResponse is returned
    expect(data.id).to.exist;
    expect(data.userId).to.equal(88);
    expect(data.data).to.deep.equal(payload.data);

    // Check that a surveyResponse was created in the database
    const surveyResponse = await sequelize.models.SurveyResponse.findOne({
      where: { id: data.id },
    });
    expect(surveyResponse).to.exist;
    expect(surveyResponse.userId).to.equal(88);
    expect(surveyResponse.data).to.deep.equal(payload.data);

    return Promise.resolve();
  });

  it("GET /survey-responses should return all survey responses", async () => {
    // Perform a GET request to /survey-responses
    const { data, status } = await ax.get("/survey-responses");

    // Check that the server returns a 200 status code
    expect(status).to.equal(200);

    // Check that the surveyResponse array has 3 surveyResponses in it
    expect(data.surveyResponses).to.exist;
    expect(data.surveyResponses.length).to.equal(3);

    // Check that the surveyResponses have the correct structure
    const surveyResponse = data.surveyResponses[0];
    expect(surveyResponse.userId).to.exist;
    expect(surveyResponse.data).to.exist;
    return Promise.resolve();
  });
});
