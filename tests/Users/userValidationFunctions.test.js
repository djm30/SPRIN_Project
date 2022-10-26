const { assert } = require("chai");
const should = require("chai").should();
const { exportedForTesting } = require("../../src/controllers/userController");
const { validateEmail, validateName, validatePassword } = exportedForTesting;
const helper = require("../testUtils");
const User = require("../../src/models/User");

helper.connectToDatabase();

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
});

describe("validateEmail()", () => {
  test("Passes with a valid email and no email already existing in the database", async () => {
    let email = "dylan@mail.com";
    const result = await validateEmail(email);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("Fails with an invalid email", async () => {
    let email = "dylanmail.com";
    const result = await validateEmail(email);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Please enter a valid email!");
  });

  test("Fails with email already existing in the database", async () => {
    let email = "dylan@mail.com";
    const userWithEmail = await User.create({
      email,
      name: "Test",
      approved: false,
      password: "TestPassword123",
      role: "user",
    });
    const result = await validateEmail(email);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("User with email already exists!");
  });
});

describe("validateName()", () => {
  test("Passes with a valid name", () => {
    let name = "Dylan Morrison";
    const result = validateName(name);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("Fails with an invalid name of length under 2 characters", () => {
    let name = "D";
    const result = validateName(name);

    result.should.have.property("success").equals(false);
    result.should.have.property("message").equals("Please enter a name!");
  });

  test("Fails with an invalid name of length over 40 characters", () => {
    let name = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOP";
    const result = validateName(name);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Entered name cannot be longer than 40 characters!");
  });
});

describe("validatePassword()", () => {
  test("Passes with a valid password", () => {
    let password = "Password123";
    const result = validatePassword(password);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("Fails with a invalid password - Under 8 characters", () => {
    let password = "Passwo2";
    const result = validatePassword(password);

    console.log(result);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Password must be at least 8 characters");
  });

  test("Fails with an invalid password - No number", () => {
    let password = "Password";
    const result = validatePassword(password);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Password must contain a number");
  });

  test("Fails with an invalid password - No capital letter", () => {
    let password = "password123";
    const result = validatePassword(password);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Password must contain at least one capital letter");
  });
});
