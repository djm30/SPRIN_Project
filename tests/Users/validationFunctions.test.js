const { assert } = require("chai");
const should = require("chai").should();
const { exportedForTesting } = require("../../src/controllers/userController");
const { validateEmail, validateName, validatePassword } = exportedForTesting;

describe("validateEmail()", () => {
  test("With a valid email", () => {});
});

describe("validateName()", () => {});

describe("validatePassword()", () => {});
