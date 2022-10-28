const app = require("../../src/app");
const Stats = require("../../src/models/Stats");
const User = require("../../src/models/User");
const helper = require("../testUtils");
const supertest = require("supertest");
const Logger = require("../../src/config/logger");
const { getYear, getMonth } = require("date-fns");
const { assert } = require("chai");
const should = require("chai").should();

helper.connectToDatabase();

const baseUrl = "/api/stats";

const api = supertest(app);

beforeEach(async () => {
  await Stats.deleteMany();
  await User.deleteMany();
});

afterEach(async () => {
  await Stats.deleteMany();
  await User.deleteMany();
});

describe("Retrieving stats from the database", () => {
  test("GET / -> Retrieves stats for the current month for an admin user", async () => {
    const cookie = await helper.getAdminAuthCookie(api);

    const actualResponse = await api
      .get(baseUrl)
      .set("Cookie", [cookie])
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

  test("GET / -> Does not retrieve stats for a user", async () => {
    const cookie = await helper.getUserAuthCookie(api);

    const actualResponse = await api
      .get(baseUrl)
      .set("Cookie", [cookie])
      .expect(403);
  });

  test("GET / -> Does not retrieve stats for the current month for an unauthenticated user", async () => {
    const actualResponse = await api.get(baseUrl).expect(403);
  });
});

describe("Updating statistics", () => {
  test("POST / Views -> Increments the views for the current month by one", async () => {
    const response = await api.post(baseUrl + "/views").expect(204);

    const cookie = await helper.getAdminAuthCookie(api);
    const updatedResponse = await api.get(baseUrl).set("Cookie", [cookie]);
    const updatedStats = updatedResponse.body;

    assert.equal(updatedStats.views, 1);
  });

  test("POST / Users -> Increments the users for the current month by one", async () => {
    const response = await api.post(baseUrl + "/users").expect(204);

    const cookie = await helper.getAdminAuthCookie(api);
    const updatedResponse = await api.get(baseUrl).set("Cookie", [cookie]);
    const updatedStats = updatedResponse.body;

    assert.equal(updatedStats.users, 1);
  });

  test("POST / Resources -> Increments the resources for the current month by one", async () => {
    const response = await api.post(baseUrl + "/resources").expect(204);

    const cookie = await helper.getAdminAuthCookie(api);
    const updatedResponse = await api.get(baseUrl).set("Cookie", [cookie]);
    const updatedStats = updatedResponse.body;

    assert.equal(updatedStats.resources, 1);
  });

  test("POST / Events -> Increments the events for the current month by one", async () => {
    const response = await api.post(baseUrl + "/events").expect(204);

    const cookie = await helper.getAdminAuthCookie(api);
    const updatedResponse = await api.get(baseUrl).set("Cookie", [cookie]);
    const updatedStats = updatedResponse.body;

    assert.equal(updatedStats.events, 1);
  });
});
