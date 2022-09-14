const Stats = require("../models/Stats");
const { getYear, getMonth } = require("date-fns");

const getStatByDate = async () => {
  const stat = await Stats.findOne({
    month: getMonth(Date.now()),
    year: getYear(Date.now()),
  });
  return stat ? stat : createNewStat();
};

const createNewStat = async () => {
  const newStat = new Stats({
    month: getMonth(Date.now()),
    year: getYear(Date.now()),
  });
  await newStat.save();
  return newStat;
};

const IncrementViews = async (req, res) => {
  const stat = await getStatByDate();
  stat.views = stat.views + 1;
  await stat.save();
};

const IncrementUsers = async (req, res) => {
  const stat = await getStatByDate();
  stat.users = stat.users + 1;
  await stat.save();
};

const IncrementResources = async (req, res) => {
  const stat = await getStatByDate();
  stat.resources = stat.resources + 1;
  await stat.save();
};

const IncrementEvents = async (req, res) => {
  const stat = await getStatByDate();
  stat.events = stat.events + 1;
  await stat.save();
};

const getStats = async (req, res) => {
  const stats = await getStatByDate();
  res.json(stats);
};

const IncrementViewsEndpoint = async (req, res) => {
  try {
    await IncrementViews();
    res.sendStatus(200);
  } catch (error) {
    // LOG ERROR
    res.sendStatus(500);
  }
};

const IncrementUsersEndpoint = async (req, res) => {
  try {
    await IncrementUsers();
    res.sendStatus(200);
  } catch (error) {
    // LOG ERROR
    res.sendStatus(500);
  }
};

const IncrementResourcesEndpoint = async (req, res) => {
  try {
    await IncrementResources();
    res.sendStatus(200);
  } catch (error) {
    // LOG ERROR
    res.sendStatus(500);
  }
};

const IncrementEventsEndpoint = async (req, res) => {
  try {
    await IncrementEvents();
    res.sendStatus(200);
  } catch (error) {
    // LOG ERROR
    res.sendStatus(500);
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
