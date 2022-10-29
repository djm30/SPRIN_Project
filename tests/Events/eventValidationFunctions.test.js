const { assert } = require("chai");
const should = require("chai").should();
const { exportedForTesting } = require("../../src/controllers/eventController");
const {
  validateTitle,
  validateDescription,
  validateLocation,
  validateAddress,
  validateEventbriteUrl,
} = exportedForTesting;
const helper = require("../testUtils");

describe("validateTitle()", () => {
  test("Passes with a valid title", () => {
    const title = "Test Event Title";

    const result = validateTitle(title);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("Fails with an invalid title with length 0", () => {
    const title = "";

    const result = validateTitle(title);

    result.should.have.property("success").equals(false);
    result.should.have.property("message").equals("Please enter a title!");
  });
});

describe("validateDescription()", () => {
  test("Passes with a valid description", () => {
    const description = "Event Description";

    const result = validateDescription(description);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("Fails with an invalid description with length 0", () => {
    const description = "";

    const result = validateDescription(description);

    result.should.have.property("success").equals(false);
    result.should.have.property("message").equals("Please enter a title!");
  });

  test("Fails with an invalid description with length over 240", () => {
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. ";

    const result = validateDescription(description);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Please keep the description under 240 characters!");
  });
});

describe("validateLocation())", () => {
  test("'online' is a valid location", () => {
    const location = "online";
    const result = validateTitle(location);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("'phsyical' is a valid location", () => {
    const location = "phsycical";
    const result = validateTitle(location);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("other strings are not valid locations", () => {
    const location = "phsycical";
    const result = validateTitle(location);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
});

describe("validateAddress()", () => {
  test.todo("Invalid");
});

describe("validateEventbriteUrl()", () => {
  test.todo("Invalid");
});
