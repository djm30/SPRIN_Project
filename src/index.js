const User = require("./models/User");
const passport = require("passport");
const authorize = require("./middleware/auth");
require("dotenv").config();

const app = require("./app");

// connect mongoose to mongodb
require("./config/mongo")();

// setting up passport take 2

// Endpoints
app.get("/", (req, res) => {
  // const sess = req.session;
  // sess.hithere = "Hello";
  // console.log(sess);
  res.send("Hello World");
});

// app.post("/login", passport.authenticate("local"), (req, res) => {
//   res.status(200).json({
//     id: req.user._id,
//     role: req.user.role,
//     sessionID: req.sessionID,
//   });
// });

// app.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const user = await User.create({ name, email, password });
//     if (role) user.role = role;
//     await user.save();
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.get("/protected", authorize("admin"), (req, res) => {
  console.log(req.session);
  // checking if user is logged in, thanks to passport
  if (req.isAuthenticated()) {
    // Getting session
    const sess = req.session;
    // Appending somethhing new to the session
    sess.pageViews = sess.pageViews ? sess.pageViews + 1 : 1;
    // logging user object appended to session from passport
    console.log(req.user);
    res.send("hi there");
  } else res.status(401).send("fuck outta here");
});

// app.post("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       res.status(500).send("Sorry, something went wrong");
//     }
//   });
//   res.status(200).send("Logged out");
// });

const port = require("./config/config").PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
