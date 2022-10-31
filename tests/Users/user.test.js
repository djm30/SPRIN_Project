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

    const { body } = response;
    body.should.have.property("name").equals("New Test Name");
    body.should.have.property("email").equals(authUser.email);
  });

  test("Editing user as an admin", async () => {
    const cookie = await helper.getAdminAuthCookie(api);
    const updatedUser = { ...baseUser, name: "New Test Name" };

    const response = await api
      .put(`${baseUrl}/${baseUser._id}`)
      .set("cookie", cookie)
      .send(updatedUser)
      .expect(200);

    const { body } = response;
    body.should.have.property("name").equals("New Test Name");
    body.should.have.property("email").equals(baseUser.email);
  });

  test("Editing user while logged in as a different user returns a 403", async () => {
    // Get user auth cookie is for a different user, not the base user
    const cookie = helper.getUserAuthCookie(api);
    const updatedUser = { ...baseUser, name: "New Test Name" };

    const response = await api
      .put(`${baseUrl}/${baseUser._id}`)
      .set("cookie", cookie)
      .send(updatedUser)
      .expect(403);
  });

  test("Editing user while not logged in returns a 403", async () => {
    const updatedUser = { ...baseUser, name: "New Test Name" };

    const response = await api
      .put(`${baseUrl}/${baseUser._id}`)
      .send(updatedUser)
      .expect(403);
  });
});

describe("Retrieving Users", () => {
  describe("All Users", () => {
    test("Admin can retrieve all users", async () => {
      const cookie = await helper.getAdminAuthCookie(api);

      const response = await api
        .get(`${baseUrl}`)
        .set("cookie", cookie)
        .expect(200);

      const { body } = response;
      assert.isArray(body);
      assert.lengthOf(body, 2);
    });

    test("User cannot retrieve all users", async () => {
      const cookie = await helper.getUserAuthCookie(api);

      const response = await api
        .get(`${baseUrl}`)
        .set("cookie", cookie)
        .expect(403);
    });

    test("Unauthenticated user cannot retrieve all users", async () => {
      const response = await api.get(`${baseUrl}`).expect(403);
    });
  });

  describe("Single user by ID", () => {
    test("Admin can retrieve their own details", async () => {
      const cookie = await helper.getAdminAuthCookie(api);

      const response = await api
        .get(`${baseUrl}/${authUser._id}`)
        .set("cookie", cookie)
        .expect(200);

      const { body } = response;
      body.should.have.property("_id").equals(authUser._id);
      body.should.have.property("email").equals(authUser.email);
      body.should.have.property("name").equals(authUser.name);
    });
    test("Admin can retrieve deatils of another user", async () => {
      const cookie = await helper.getAdminAuthCookie(api);

      const response = await api
        .get(`${baseUrl}/${baseUser._id}`)
        .set("cookie", cookie)
        .expect(200);

      const { body } = response;
      body.should.have.property("_id").equals(baseUser._id);
      body.should.have.property("email").equals(baseUser.email);
      body.should.have.property("name").equals(baseUser.name);
    });

    test("User can retrieve their own deatils ", async () => {
      const cookie = await helper.getUserAuthCookie(api);

      const response = await api
        .get(`${baseUrl}/${authUser._id}`)
        .set("cookie", cookie)
        .expect(200);

      const { body } = response;
      body.should.have.property("_id").equals(authUser._id);
      body.should.have.property("email").equals(authUser.email);
      body.should.have.property("name").equals(authUser.name);
    });
    test("User cannot retrieve deatils of another user", async () => {
      const cookie = await helper.getUserAuthCookie(api);

      const response = await api
        .get(`${baseUrl}/${baseUser._id}`)
        .set("cookie", cookie)
        .expect(403);
    });
    test("Unauthenticated user cannot retrieve deatils of another user", async () => {
      const response = await api.get(`${baseUrl}/${baseUser._id}`).expect(403);
    });
  });
});

describe("Deleting Users", () => {
  test("Admin can delete their account", async () => {
    const cookie = await helper.getAdminAuthCookie(api);

    const response = await api
      .delete(`${baseUrl}/${authUser._id}`)
      .set("cookie", cookie)
      .expect(204);

    const deletedUser = await User.findById(authUser._id);
    assert.isNull(deletedUser);
  });

  test("Admin can delete the account of another user", async () => {
    const cookie = await helper.getAdminAuthCookie(api);

    const response = await api
      .delete(`${baseUrl}/${baseUser._id}`)
      .set("cookie", cookie)
      .expect(204);

    const deletedUser = await User.findById(baseUser._id);
    assert.isNull(deletedUser);
  });

  test("User can delete their account", async () => {
    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .delete(`${baseUrl}/${authUser._id}`)
      .set("cookie", cookie)
      .expect(204);

    const deletedUser = await User.findById(authUser._id);
    assert.isNull(deletedUser);
  });

  test("User cannot delete the account of another user", async () => {
    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .delete(`${baseUrl}/${baseUser._id}`)
      .set("cookie", cookie)
      .expect(403);

    const deletedUser = await User.findById(baseUser._id);
    assert.isNotNull(deletedUser);
  });

  test("Unauthenticated user cannot delete the account of another user", async () => {
    const response = await api.delete(`${baseUrl}/${baseUser._id}`).expect(403);

    const deletedUser = await User.findById(baseUser._id);
    assert.isNotNull(deletedUser);
  });

  test("Same response code when a user has already been updated", async () => {
    const cookie = await helper.getAdminAuthCookie(api);

    // Deleting user from database
    await User.findByIdAndDelete(baseUser.id);

    // Trying to call the delete method
    const response = await api
      .delete(`${baseUrl}/${baseUser._id}`)
      .set("cookie", cookie)
      .expect(204);

    const deletedUser = await User.findById(baseUser._id);
    assert.isNull(deletedUser);
  });
});
