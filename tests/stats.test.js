const app = require("../src/app");
const Stats = require("../src/models/Stats");
const helper = require("./testUtils");
const supertest = require("supertest");
const Logger = require("../src/config/logger");
const { getYear, getMonth } = require("date-fns");
const should = require("chai").should();

helper.connectToDatabase();

const baseUrl = "/api/stats";

const api = supertest(app);

describe("Retrieving stats from the database", () => {
  test("GET / -> Retrieves stats for the current month", async () => {
    const actualResponse = await api
      .get(baseUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const stats = actualResponse.body;

    stats.should.have.property("_id").with.lengthOf(24);
    stats.should.have.property("month").equal(getMonth(Date.now()));
    stats.should.have.property("year").equal(getYear(Date.now()));
    stats.should.have.property("views").equal(0);
    stats.should.have.property("users").equal(0);
    stats.should.have.property("resources").equal(0);
    stats.should.have.property("events").equal(0);
  });
});

describe("Updating statistics", () => {
  test.todo(
    "POST / Views -> Increments the views for the current month by one",
    async () => {},
  );

  test.todo(
    "POST / Users -> Increments the users for the current month by one",
    async () => {},
  );

  test.todo(
    "POST / Resources -> Increments the resources for the current month by one",
    async () => {},
  );

  test.todo(
    "POST / Events -> Increments the events for the current month by one",
    async () => {},
  );
});
