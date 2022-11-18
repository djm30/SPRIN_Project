const app = require("../../src/app");
const Event = require("../../src/models/Event");
const User = require("../../src/models/User");
const helper = require("../testUtils");
const supertest = require("supertest");
const Logger = require("../../src/config/logger");
const { assert } = require("chai");
const should = require("chai").should();

helper.connectToDatabase();

const baseUrl = "/api/events";
const authUser = helper.authUser;

const api = supertest(app);

const events = [
    {
        _id: "63593b2abe62496acf00f400",
        title: "Event Title",
        description: "Event Description",
        location: "physical",
        address:
            '{"addressLineOne":"Address","addressLineTwo":"","postCode":"PostCode","townCity":"TownCity"}',
        eventbriteUrl:
            "https://www.eventbrite.com/e/annas-number-at-the-mandela-hall-belfast-tickets-349388870517?aff=ebdssbcitybrowse&keep_tld=1",
        dateTime: "",
    },
    {
        _id: "63593b2abe62496acf00f401",
        title: "Event Title 2",
        description: "Event Description",
        location: "physical",
        address:
            '{"addressLineOne":"Address","addressLineTwo":"","postCode":"PostCode","townCity":"TownCity"}',
        eventbriteUrl:
            "https://www.eventbrite.com/e/annas-number-at-the-mandela-hall-belfast-tickets-349388870517?aff=ebdssbcitybrowse&keep_tld=1",
        dateTime: "",
    },
    {
        _id: "63593b2abe62496acf00f402",
        title: "Event Title 3",
        description: "Event Description",
        location: "online",
        address: "https://meet.google.com",
        eventbriteUrl:
            "https://www.eventbrite.com/e/annas-number-at-the-mandela-hall-belfast-tickets-349388870517?aff=ebdssbcitybrowse&keep_tld=1",
        dateTime: "",
    },
];

beforeAll(async () => {
    await User.deleteMany();
    await Event.deleteMany();
});

beforeEach(async () => {
    await User.deleteMany();
    await Event.insertMany(events);
});

afterEach(async () => {
    await Event.deleteMany();
    await User.deleteMany();
});

describe("Creating Events", () => {
    const event = {
        title: "New Event",
        description: "Event Description",
        location: "online",
        address: "https://meet.google.com",
        eventbriteUrl:
            "https://www.eventbrite.com/e/annas-number-at-the-mandela-hall-belfast-tickets-349388870517?aff=ebdssbcitybrowse&keep_tld=1",
    };

    test("Admins can create events", async () => {
        const cookie = await helper.getAdminAuthCookie(api);

        const response = await api
            .post(baseUrl)
            .set("Cookie", [cookie])
            .send(event)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.property("_id").has.length(24);
        body.should.have.property("title").equals(event.title);
        body.should.have.property("description").equals(event.description);
        body.should.have.property("location").equals(event.location);
        body.should.have.property("address").equals(event.address);
        body.should.have.property("eventbriteUrl").equals(event.eventbriteUrl);
        body.should.have.property("imgUrl").equals("");
        body.should.have.property("dateTime");
    });

    test("Users cannot create events", async () => {
        const cookie = await helper.getUserAuthCookie(api);

        const response = await api
            .post(baseUrl)
            .set("Cookie", [cookie])
            .send(event)
            .expect(403);
    });

    test("Unauthenticated users cannot create events", async () => {
        const response = await api.post(baseUrl).send(event).expect(403);
    });

    test("Invalid event cannot be created", async () => {
        const invalidEvent = { ...event, title: "" };
        const cookie = await helper.getAdminAuthCookie(api);

        const response = await api
            .post(baseUrl)
            .set("Cookie", [cookie])
            .send(invalidEvent)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const { body } = response;

        body.should.have.property("message").equals("Please enter a title!");
    });
});

describe("Retrieving Events", () => {
    test("Admins can retrieve all events", async () => {
        const cookie = await helper.getAdminAuthCookie(api);

        const response = await api
            .get(baseUrl)
            .set("Cookie", [cookie])
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.length(3);
        body[0]._id.should.equal(events[0]._id);
        body[1]._id.should.equal(events[1]._id);
        body[2]._id.should.equal(events[2]._id);
    });
    test("Admins can retrieve single events", async () => {
        const cookie = await helper.getAdminAuthCookie(api);

        const response = await api
            .get(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.property("_id").equals(events[0]._id);
        body.should.have.property("title").equals(events[0].title);
        body.should.have.property("description").equals(events[0].description);
        body.should.have.property("location").equals(events[0].location);
        body.should.have.property("address").equals(events[0].address);
        body.should.have
            .property("eventbriteUrl")
            .equals(events[0].eventbriteUrl);
        body.should.not.have.property("imgUrl");
        body.should.have.property("dateTime");
    });

    test("Users can retrieve all events", async () => {
        const cookie = await helper.getUserAuthCookie(api);

        const response = await api
            .get(baseUrl)
            .set("Cookie", [cookie])
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.length(3);
        body[0]._id.should.equal(events[0]._id);
        body[1]._id.should.equal(events[1]._id);
        body[2]._id.should.equal(events[2]._id);
    });

    test("Users can retrieve single events", async () => {
        const cookie = await helper.getUserAuthCookie(api);

        const response = await api
            .get(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.property("_id").equals(events[0]._id);
        body.should.have.property("title").equals(events[0].title);
        body.should.have.property("description").equals(events[0].description);
        body.should.have.property("location").equals(events[0].location);
        body.should.have.property("address").equals(events[0].address);
        body.should.have
            .property("eventbriteUrl")
            .equals(events[0].eventbriteUrl);
        body.should.not.have.property("imgUrl");
        body.should.have.property("dateTime");
    });

    test("Unauthenticated users can retrieve all events", async () => {
        const response = await api
            .get(baseUrl)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.length(3);
        body[0]._id.should.equal(events[0]._id);
        body[1]._id.should.equal(events[1]._id);
        body[2]._id.should.equal(events[2]._id);
    });

    test("Unauthenticated users can retrieve single events", async () => {
        const response = await api
            .get(`${baseUrl}/${events[0]._id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.property("_id").equals(events[0]._id);
        body.should.have.property("title").equals(events[0].title);
        body.should.have.property("description").equals(events[0].description);
        body.should.have.property("location").equals(events[0].location);
        body.should.have.property("address").equals(events[0].address);
        body.should.have
            .property("eventbriteUrl")
            .equals(events[0].eventbriteUrl);
        body.should.not.have.property("imgUrl");
        body.should.have.property("dateTime");
    });
});

describe("Editing Events", () => {
    const updatedEvent = { ...events[0], title: "Updated Title" };
    test("Admins can edit events", async () => {
        const cookie = await helper.getAdminAuthCookie(api);

        const response = await api
            .put(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .send(updatedEvent)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const { body } = response;
        body.should.have.property("_id").equals(events[0]._id);
        body.should.have.property("title").equals(updatedEvent.title);
        body.should.have.property("description").equals(events[0].description);
        body.should.have.property("location").equals(events[0].location);
        body.should.have.property("address").equals(events[0].address);
        body.should.have
            .property("eventbriteUrl")
            .equals(events[0].eventbriteUrl);
        body.should.not.have.property("imgUrl");
        body.should.have.property("dateTime");
    });

    test("Users cannot edit events", async () => {
        const cookie = await helper.getUserAuthCookie(api);

        const response = await api
            .put(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .send(updatedEvent)
            .expect(403);
    });

    test("Unauthenticated users cannot edit events", async () => {
        const response = await api
            .put(`${baseUrl}/${events[0]._id}`)
            .send(updatedEvent)
            .expect(403);
    });

    test("Editing events with invalid information will return 400", async () => {
        const cookie = await helper.getAdminAuthCookie(api);
        const invalidUpdatedEvent = { ...updatedEvent, title: "" };
        const response = await api
            .put(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .send(invalidUpdatedEvent)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const { body } = response;

        body.should.have.property("message").equals("Please enter a title!");
    });
});

describe("Deleting Events", () => {
    test("Admins can delete events", async () => {
        const cookie = await helper.getAdminAuthCookie(api);

        assert.isNotNull(await Event.findById(events[0]._id));

        const response = await api
            .delete(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .expect(204);

        assert.isNull(await Event.findById(events[0]._id));
    });

    test("Users cannot delete events", async () => {
        const cookie = await helper.getUserAuthCookie(api);

        assert.isNotNull(await Event.findById(events[0]._id));

        const response = await api
            .delete(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .expect(403);

        assert.isNotNull(await Event.findById(events[0]._id));
    });
    test("Unauthenticated users cannot delete events", async () => {
        assert.isNotNull(await Event.findById(events[0]._id));

        const response = await api
            .delete(`${baseUrl}/${events[0]._id}`)
            .expect(403);

        assert.isNotNull(await Event.findById(events[0]._id));
    });

    test("204 Response code when a resource has already been deleted", async () => {
        const cookie = await helper.getAdminAuthCookie(api);

        await Event.findByIdAndDelete(events[0]._id);
        assert.isNull(await Event.findById(events[0]._id));

        const response = await api
            .delete(`${baseUrl}/${events[0]._id}`)
            .set("Cookie", [cookie])
            .expect(204);
    });
});
