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
const baseUser = helper.baseUser;
const authUser = helper.authUser;

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany();
});

beforeEach(async () => {
  await User.deleteMany();
  await User.create(baseUser);
});

afterAll(async () => {
  await User.deleteMany();
});

describe("Registering Users", () => {
  test("Registering a user with valid credentials", async () => {
    const user = { ...baseUser, email: "newemail@mail.com" };
    const response = await api
      .post(baseUrl + "/register")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const recievedUser = response.body;
    recievedUser.name.should.equal(user.name);
    recievedUser.email.should.equal(user.email);
    recievedUser.should.not.have.property("password");
    recievedUser.role.should.equal("user");
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
  });
});

describe("Logging in User", () => {
  test("Logging in with valid credentials", async () => {
    const loginCredentials = {
      email: baseUser.email,
      password: baseUser.password,
    };
    const response = await api
      .post(`${baseUrl}/login`)
      .send(loginCredentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const body = response.body;
    body.should.have.property("id").have.length(24);
    body.should.have.property("role").equal("user");
    body.should.have.property("sessionID");
  });

  test("Logging in with invalid email", async () => {
    const loginCredentials = {
      email: "notarealemail@mail.com",
      password: baseUser.password,
    };
    const response = await api
      .post(`${baseUrl}/login`)
      .send(loginCredentials)
      .expect(401);
  });
  test("Logging in with invalid password", async () => {
    const loginCredentials = {
      email: baseUser.email,
      password: "notthesamepassword",
    };
    const response = await api
      .post(`${baseUrl}/login`)
      .send(loginCredentials)
      .expect(401);
  });
});

describe("Editing Users", () => {
  test("Editing user as that user", async () => {
    const cookie = await helper.getUserAuthCookie(api);
    const updatedUser = { ...authUser, name: "New Test Name" };

    const response = await api
      .put(`${baseUrl}/${authUser._id}`)
      .set("cookie", cookie)
      .send(updatedUser)
      .expect(200);
    console.log(response);
  });

  test.skip("Editing user as an admin", async () => {});
});

describe("Retrieving Users", () => {
  test.skip("Logging in with valid credentials", () => {});
});

describe("Deleting Users", () => {
  test.skip("Logging in with valid credentials", () => {});
});
