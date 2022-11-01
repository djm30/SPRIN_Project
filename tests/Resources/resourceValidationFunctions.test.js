const { assert } = require("chai");
const should = require("chai").should();

const {
  validateTitle,
  validateDescription,
  validateResourceType,
  validateResourceUrl,
  validateFile,
} = require("../../src/validation/Resource");
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

describe("validateResourceType()", () => {
  test("'pdf' is a valid resource type", () => {
    const resourceType = "pdf";
    const result = validateResourceType(resourceType);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("'website' is a valid resource type", () => {
    const resourceType = "website";
    const result = validateResourceType(resourceType);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("'youtube' is a valid resource type", () => {
    const resourceType = "youtube";
    const result = validateResourceType(resourceType);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });

  test("Other strings are not valid resouce types", () => {
    const resourceType = "test";
    const result = validateResourceType(resourceType);

    result.should.have.property("success").equals(false);
    result.should.have
      .property("message")
      .equals("Please provide a valid resource type");
  });
});

describe("validateResourceUrl()", () => {
  describe("Youtube Links", () => {
    test("Passes with a valid youtube video url", () => {
      const url = "https://www.youtube.com/watch?v=jfKfPfyJRdk";
      const result = validateResourceUrl("youtube", url);

      result.should.have.property("success").equals(true);
      result.should.have.property("message").equals("");
    });

    test("Fails with an empty youtube url", () => {
      const url = "";
      const result = validateResourceUrl("youtube", url);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("Please provide a valid YouTube url");
    });
  });

  describe("Website Links", () => {
    test("Passes with a valid website url", () => {
      const url = "https://website.com";
      const result = validateResourceUrl("website", url);

      result.should.have.property("success").equals(true);
      result.should.have.property("message").equals("");
    });

    test("Fails with an empty website url", () => {
      const url = "";
      const result = validateResourceUrl("website", url);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("Please provide a valid URL");
    });

    test("Fails with a website that doesn't use HTTPS", () => {
      const url = "http://www.website.com";

      const result = validateResourceUrl("website", url);

      result.should.have.property("success").equals(false);
      result.should.have
        .property("message")
        .equals("Please ensure URL begins with https");
    });
  });

  test("Passes when resource type is pdf", () => {
    const url = "";
    const result = validateResourceUrl("pdf", url);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
});

describe("ValidateFile", () => {
  test("Fails with an undefined file", () => {
    const file = undefined;
    const result = validateFile(file);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("Passes with a file extension of pdf", () => {
    const file = { filename: "file.pdf" };
    const result = validateFile(file);

    result.should.have.property("success").equals(true);
    result.should.have.property("message").equals("");
  });
  test("Fails with a file extension other than pdf", () => {
    const invalidFile = { filename: "invalid.png" };
    const result = validateFile(invalidFile);

    result.should.have.property("success").equals(false);
    result.should.have.property("message").equals("Please upload a pdf file");
  });
  test("Fails with an invalid file object", () => {
    const result = validateFile({});

    result.should.have.property("success").equals(false);
    result.should.have.property("message").equals("Please upload a pdf file");
  });
});
