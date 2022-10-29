const { assert } = require("chai");
const should = require("chai").should();
const {
  validateTitle,
  validateDescription,
  validateLocation,
  validateAddress,
  validateDateTime,
  validateEventbriteUrl,
} = require("../../src/validation/Event");
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
    const result = validateLocation(location);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("'phsyical' is a valid location", () => {
    const location = "physical";
    const result = validateLocation(location);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("other strings are not valid locations", () => {
    const location = "notavalidlocation";
    const result = validateLocation(location);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals(
        "Please enter a valid input for location ('online' or 'physical')",
      );
  });
});

describe("validateAddress()", () => {
  describe("When the location is 'online'", () => {
    const location = "online";
    test("Passes with a valid URL", () => {
      const url = "https://meet.google.com/khc-sxnp-hxm";
      const result = validateAddress(location, url);

      result.should.have.property("success").equals(true);
      result.should.have.property("message").equals("");
    });
    test("Fails with an invalid URL that doesn't begin with HTTPS", () => {
      const url = "http://meet.google.com/khc-sxnp-hxm";
      const result = validateAddress(location, url);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("Please ensure URL begins with https");
    });
    test("Fails with an invalid URL", () => {
      const url = "https://";
      const result = validateAddress(location, url);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("Please provide a valid URL");
    });
  });

  describe("When the location is 'physical'", () => {
    const location = "physical";
    test("Passes with a valid address object", () => {
      const address = JSON.stringify({
        addressLineOne: "30 Street",
        addressLineTwo: "",
        postCode: "BTX YYY",
        townCity: "Belfast",
      });
      const result = validateAddress(location, address);

      result.should.have.property("success").equals(true);
      result.should.have.property("message").equals("");
    });

    test("Fails with an invalid address object", () => {
      const address = JSON.stringify({
        addressLineTwo: "",
        postCode: "BTX YYY",
        townCity: "Belfast",
      });
      const result = validateAddress(location, address);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("addressLineOne is a required field");
    });

    test("Fails with an a valid address object with empty values", () => {
      const address = JSON.stringify({
        addressLineOne: "",
        addressLineTwo: "",
        postCode: "BTX YYY",
        townCity: "Belfast",
      });

      const result = validateAddress(location, address);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("addressLineOne is a required field");
    });
  });
});

describe("validateEventbriteUrl()", () => {
  test("Passes with a valid eventbrite url", () => {
    const url =
      "https://www.eventbrite.com/e/festival-of-the-dead-belfast-tickets-388714795417?aff=ebdssbcitybrowse&keep_tld=1";
    const result = validateEventbriteUrl(url);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("Fails with an invalid url", () => {
    const url = "https://www.eventbrite.com/";
    const result = validateEventbriteUrl(url);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Please enter a valid eventbrite link!");
  });
  test("Fails with an empty url", () => {
    const url = "";
    const result = validateEventbriteUrl(url);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Please enter a valid eventbrite link!");
  });
});
