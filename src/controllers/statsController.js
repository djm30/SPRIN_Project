const Stats = require("../models/Stats");
const { getYear, getMonth } = require("date-fns");
const Logger = require("../config/logger");

// Gets stats for the current month and year
const getStatByDate = async () => {
    const stat = await Stats.findOne({
        month: getMonth(Date.now()),
        year: getYear(Date.now()),
    });
    // If no stat record exists for the current month and year, create one
    return stat ? stat : createNewStat();
};

// Creates a new stat record in the database for the current month and year
const createNewStat = async () => {
    const newStat = new Stats({
        month: getMonth(Date.now()),
        year: getYear(Date.now()),
    });
    await newStat.save();
    return newStat;
};

// Increments the views stat by 1
const IncrementViews = async () => {
    const stat = await getStatByDate();
    stat.views = stat.views + 1;
    await stat.save();
};

// Increments the users when a new user has been registered stat by 1
const IncrementUsers = async () => {
    const stat = await getStatByDate();
    stat.users = stat.users + 1;
    await stat.save();
};

// Increments the resources stat by 1 when a new resource has been created
const IncrementResources = async () => {
    const stat = await getStatByDate();
    stat.resources = stat.resources + 1;
    await stat.save();
};

// Increments the events stat by 1 when a new event has been created
const IncrementEvents = async () => {
    const stat = await getStatByDate();
    stat.events = stat.events + 1;
    await stat.save();
};

// Gets all stats
const getStats = async (req, res) => {
    const stats = await getStatByDate();
    res.json(stats);
};

// Endpoints for the above functions
const IncrementViewsEndpoint = async (req, res) => {
    try {
        await IncrementViews();
        res.sendStatus(204);
    } catch (error) {
        Logger.error(error);
        throw error;
    }
};

const IncrementUsersEndpoint = async (req, res) => {
    try {
        await IncrementUsers();
        res.sendStatus(204);
    } catch (error) {
        Logger.error(error);
        throw error;
    }
};

const IncrementResourcesEndpoint = async (req, res) => {
    try {
        await IncrementResources();
        res.sendStatus(204);
    } catch (error) {
        Logger.error(error);
        throw error;
    }
};

const IncrementEventsEndpoint = async (req, res) => {
    try {
        await IncrementEvents();
        res.sendStatus(204);
    } catch (error) {
        Logger.error(error);
        throw error;
    }
};

module.exports = {
    IncrementViews,
    IncrementUsers,
    IncrementResources,
    IncrementEvents,
    getStats,
    IncrementViewsEndpoint,
    IncrementUsersEndpoint,
    IncrementResourcesEndpoint,
    IncrementEventsEndpoint,
};
