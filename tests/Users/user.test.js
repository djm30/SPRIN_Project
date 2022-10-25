const app = require("../../src/app");
const User = require("../../src/models/User");
const helper = require("../testUtils");
const supertest = require("supertest");
const Logger = require("../../src/config/logger");
const { getYear, getMonth } = require("date-fns");
const { assert } = require("chai");
const should = require("chai").should();
const bcrypt = require("bcrypt");

helper.connectToDatabase();

const baseUrl = "/api/users";

const api = supertest(app);

const baseUser = {
  email: "email@mail.com",
  name: "Test User",
  password: "Password123",
  approved: true,
  role: "admin",
};

beforeEach(async () => {
  await User.deleteMany();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Registering Users", () => {
  test("Registering a user with valid credentials", async () => {
    const user = { ...baseUser };
    const response = await api
      .post(baseUrl + "/register")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const recievedUser = response.body;
    recievedUser.name.should.equal(user.name);
    recievedUser.email.should.equal(user.email);
    recievedUser.should.not.have.property("password");
    recievedUser.role.should.equal("admin");
    recievedUser.approved.should.equal(false);
  });

  test("Registering a user with invalid credentials", async () => {
    const user = { ...baseUrl, name: "" };

    const response = await api
      .post(baseUrl + "/register")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const body = response.body;
    body.should.have.property("message");
    console.log(response.body);
  });
});

describe("Logging in User", () => {
  test.skip("Logging in with valid credentials", () => {});
});

describe("Editing Users", () => {
  test.skip("Logging in with valid credentials", () => {});
});

describe("Retrieving Users", () => {
  test.skip("Logging in with valid credentials", () => {});
});

describe("Deleting Users", () => {
  test.skip("Logging in with valid credentials", () => {});
});
