const app = require("../../src/app");
const Resource = require("../../src/models/Resource");
const helper = require("../testUtils");
const supertest = require("supertest");
const Logger = require("../../src/config/logger");
const { assert } = require("chai");
const should = require("chai").should();
const User = require("../../src/models/User");

helper.connectToDatabase();

const baseUrl = "/api/resources";
const authUser = helper.authUser;

const api = supertest(app);

const resources = [
  {
    _id: "63593b2abe62496acf00f500",
    title: "PDF Title",
    description: "Resource Description",
    resourceType: "website",
    resourceUrl: "https://www.adobe.com",
    poster: "63593b2abe62496acf00f413",
  },
  {
    _id: "63593b2abe62496acf00f501",
    title: "Website Title",
    description: "Resource Description",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com",
    poster: "63593b2abe62496acf00f413",
  },
  {
    _id: "63593b2abe62496acf00f502",
    title: "Youtube Title",
    description: "Resource Description",
    resourceType: "pdf",
    resourceUrl: "https://www.adobe.com",
    poster: "63593b2abe62496acf00f413",
  },
];

beforeAll(async () => {
  await User.deleteMany();
  await Resource.deleteMany();
});

beforeEach(async () => {
  await User.deleteMany();
  await Resource.insertMany(resources);
});

afterEach(async () => {
  await Resource.deleteMany();
  await User.deleteMany();
});

describe("Creating Resources", () => {
  test("Admins can create valid resources", async () => {
    const resource = {
      title: "Test Title",
      description: "Test Description",
      resourceType: "website",
      resourceUrl: "https://www.adobe.com",
    };

    const cookie = await helper.getAdminAuthCookie(api);

    const response = await api
      .post(baseUrl)
      .set("Cookie", [cookie])
      .send(resource)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;

    body.should.have.property("_id").has.length(24);
    body.should.have.property("title").equals(resource.title);
    body.should.have.property("description").equals(resource.description);
    body.should.have.property("resourceType").equals(resource.resourceType);
    body.should.have.property("resourceUrl").equals(resource.resourceUrl);
    body.should.have.property("dateTime");
    body.should.have.property("poster").equals(authUser._id);
  });

  test("Users can create valid resources", async () => {
    const resource = {
      title: "Test Title",
      description: "Test Description",
      resourceType: "website",
      resourceUrl: "https://www.adobe.com",
    };

    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .post(baseUrl)
      .set("Cookie", [cookie])
      .send(resource)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;

    body.should.have.property("_id").has.length(24);
    body.should.have.property("title").equals(resource.title);
    body.should.have.property("description").equals(resource.description);
    body.should.have.property("resourceType").equals(resource.resourceType);
    body.should.have.property("resourceUrl").equals(resource.resourceUrl);
    body.should.have.property("dateTime");
    body.should.have.property("poster").equals(authUser._id);
  });

  test("Invalid resources aren't created", async () => {
    const resource = {
      title: "Test Title",
      description: "Test Description",
      resourceType: "not a valid resource type",
      resourceUrl: "https://www.adobe.com",
    };

    const cookie = await helper.getAdminAuthCookie(api);

    const response = await api
      .post(baseUrl)
      .set("Cookie", [cookie])
      .send(resource)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { body } = response;

    body.should.have.property("message");
  });

  test("Unauthenticated users cannot create  resources", async () => {
    const resource = {
      title: "Test Title",
      description: "Test Description",
      resourceType: "website",
      resourceUrl: "https://www.adobe.com",
    };

    const response = await api.post(baseUrl).send(resource).expect(403);
  });
});

describe("Retrieving Resources", () => {
  test("Logged in user can retrieve a list of resources", async () => {
    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .get(baseUrl)
      .set("Cookie", [cookie])
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.length(3);
    body[0]._id.should.equal(resources[0]._id);
    body[1]._id.should.equal(resources[1]._id);
    body[2]._id.should.equal(resources[2]._id);
  });
  test("Not logged in in user can retrieve a list of resources", async () => {
    const response = await api
      .get(baseUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.length(3);
    body[0]._id.should.equal(resources[0]._id);
    body[1]._id.should.equal(resources[1]._id);
    body[2]._id.should.equal(resources[2]._id);
  });
  test("Logged in user can retrieve a single  resource", async () => {
    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .get(`${baseUrl}/${resources[0]._id}`)
      .set("Cookie", [cookie])
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.property("_id").equals(resources[0]._id);
    body.should.have.property("title").equals(resources[0].title);
    body.should.have.property("description").equals(resources[0].description);
    body.should.have.property("resourceType").equals(resources[0].resourceType);
    body.should.have.property("resourceUrl").equals(resources[0].resourceUrl);
    body.should.have.property("poster").equals(resources[0].poster);
  });
  test("Not logged in user can retrieve a single resource", async () => {
    const response = await api
      .get(`${baseUrl}/${resources[0]._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.property("_id").equals(resources[0]._id);
    body.should.have.property("title").equals(resources[0].title);
    body.should.have.property("description").equals(resources[0].description);
    body.should.have.property("resourceType").equals(resources[0].resourceType);
    body.should.have.property("resourceUrl").equals(resources[0].resourceUrl);
    body.should.have.property("poster").equals(resources[0].poster);
  });

  test("Request for single resource with a ID that doesn't exist returns not found", async () => {
    const response = await api
      .get(`${baseUrl}/63593b2abe62496acf00f360`)
      .expect(404);
  });

  test("Request for a single resource with an invalid ID returns a 400", async () => {
    const response = await api
      .get(`${baseUrl}/thisisnotavalidmongoose}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have
      .property("message")
      .equals("Please provide a valid ObjectID");
  });
});

describe("Editing Resources", () => {
  test("Admins can edit any resource", async () => {
    const resourceToUpdate = { ...resources[0], title: "Updated Title" };
    const cookie = await helper.getAdminAuthCookie(api);

    const response = await api
      .put(`${baseUrl}/${resourceToUpdate._id}`)
      .set("Cookie", [cookie])
      .send(resourceToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.property("_id").equals(resourceToUpdate._id);
    body.should.have.property("title").equals("Updated Title");
    body.should.have
      .property("description")
      .equals(resourceToUpdate.description);
    body.should.have
      .property("resourceType")
      .equals(resourceToUpdate.resourceType);
    body.should.have
      .property("resourceUrl")
      .equals(resourceToUpdate.resourceUrl);
    body.should.have.property("poster").equals(resourceToUpdate.poster);

    assert.notEqual(authUser._id, resourceToUpdate.poster);
  });
  test("Users can edit their own resource", async () => {
    const resource = await Resource.create({
      title: "New Title",
      description: "New Description",
      resourceType: "website",
      resourceUrl: "https://google.com",
      poster: authUser._id,
    });

    const resourceToUpdate = {
      title: "Updated Title",
      description: resource.description,
      resourceType: resource.resourceType,
      resourceUrl: resource.resourceUrl,
    };

    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .put(`${baseUrl}/${resource._id}`)
      .set("Cookie", [cookie])
      .send(resourceToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.property("_id").equals(resource._id.toString());
    body.should.have.property("title").equals("Updated Title");
    body.should.have
      .property("description")
      .equals(resourceToUpdate.description);
    body.should.have
      .property("resourceType")
      .equals(resourceToUpdate.resourceType);
    body.should.have
      .property("resourceUrl")
      .equals(resourceToUpdate.resourceUrl);
    body.should.have.property("poster").equals(authUser._id);
  });

  test("Users cannot edit resources belonging to others", async () => {
    const resourceToUpdate = {
      ...resources[0],
      title: "Updated Title",
    };

    const cookie = await helper.getUserAuthCookie(api);

    const response = await api
      .put(`${baseUrl}/${resources[0]._id}`)
      .set("Cookie", [cookie])
      .send(resourceToUpdate)
      .expect(403);
  });

  test("Unauthenticated users cannot edit resources", async () => {
    const resourceToUpdate = {
      ...resources[0],
      title: "Updated Title",
    };

    const response = await api
      .put(`${baseUrl}/${resources[0]._id}`)
      .send(resourceToUpdate)
      .expect(403);
  });
  test("Updating a resource with invalid data fails", async () => {
    const resourceToUpdate = { ...resources[0], title: "" };
    const cookie = await helper.getAdminAuthCookie(api);

    const response = await api
      .put(`${baseUrl}/${resourceToUpdate._id}`)
      .set("Cookie", [cookie])
      .send(resourceToUpdate)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { body } = response;
    body.should.have.property("message");
  });
});

describe("Deleting Resources", () => {
  test("Admins can delete any resource", async () => {
    const cookie = await helper.getAdminAuthCookie(api);

    assert.notEqual(authUser._id, resources[0].poster);
    const response = await api
      .delete(`${baseUrl}/${resources[0]._id}`)
      .set("Cookie", [cookie])
      .expect(204);

    const resourceFromDb = await Resource.findById(resources[0]._id);
    assert.isNull(resourceFromDb);
  });

  test("Users can delete their own resource", async () => {
    const resource = await Resource.create({
      title: "New Title",
      description: "New Description",
      resourceType: "website",
      resourceUrl: "https://google.com",
      poster: authUser._id,
    });

    const cookie = await helper.getUserAuthCookie(api);

    assert.notEqual(authUser._id, resources[0].poster);
    const response = await api
      .delete(`${baseUrl}/${resource._id.toString()}`)
      .set("Cookie", [cookie])
      .expect(204);

    const resourceFromDb = await Resource.findById(resource._id.toString());
    assert.isNull(resourceFromDb);
  });

  test("Users cannot delete other resources", async () => {
    const cookie = await helper.getUserAuthCookie(api);

    assert.notEqual(authUser._id, resources[0].poster);
    const response = await api
      .delete(`${baseUrl}/${resources[0]._id}`)
      .set("Cookie", [cookie])
      .expect(403);

    const resourceFromDb = await Resource.findById(resources[0]._id);
    assert.isNotNull(resourceFromDb);
  });
  test("Unauthenticated users cannot delete resources", async () => {
    const response = await api
      .delete(`${baseUrl}/${resources[0]._id}`)
      .expect(403);

    const resourceFromDb = await Resource.findById(resources[0]._id);
    assert.isNotNull(resourceFromDb);
  });

  test("204 Response code when a resource has already been deleted", async () => {
    await Resource.findByIdAndDelete(resources[0]._id);

    const resourceFromDb = await Resource.findById(resources[0]._id);
    assert.isNull(resourceFromDb);

    const cookie = await helper.getAdminAuthCookie(api);

    assert.notEqual(authUser._id, resources[0].poster);
    const response = await api
      .delete(`${baseUrl}/${resources[0]._id}`)
      .set("Cookie", [cookie])
      .expect(204);
  });
});
