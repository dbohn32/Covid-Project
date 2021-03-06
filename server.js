// Requiring necessary npm packages
const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
// eslint-disable-next-line prettier/prettier
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
require("dotenv").config({ path: __dirname + "/.env" });

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
global.__basedir = __dirname + "/";

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/axios-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/auth-api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
