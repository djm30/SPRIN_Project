require("dotenv").config();
const config = require("./config/config");

const app = require("./app");

// connect mongoose to mongodb
// require("./config/mongo")();

// setting up passport take 2

// Endpoints

const port = config.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
