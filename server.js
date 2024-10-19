import express from "express";
import path from "path";
import db from "./src/database/db-connection.js";
import routes from "./src/routes.js";
import layouts from "express-ejs-layouts";
// Using es6 for the project
const __dirname = import.meta.dirname;
// Port for backend server
const PORT = 5000;
// Initializing express
var app = express();

// Connecting Database
db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

// Setting up view engine to ejs
app.set("view engine", "ejs");

// setting views so that while rendering it refers this path
app.set("views", path.join(__dirname, "/public"));

//setting up important variables and functions
app.use(layouts);
app.set("layout", "layouts/main");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

// Starting to listen the server
app.listen(PORT, function () {
  console.log(`Started application on port http://localhost:${PORT}`);
});

export default app;
