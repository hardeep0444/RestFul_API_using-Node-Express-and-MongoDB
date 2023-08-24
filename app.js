const express = require("express"); //Importing the Express Module (framework for building web applications in Node.js.This module provides a set of functions and tools to help you define routes, handle HTTP requests and responses, and manage middleware.)

const app = express(); //This line creates an instance of the Express application

const mongoose = require("mongoose"); // uses the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB.

const bodyParser = require("body-parser"); //imports the body-parser middleware module. The body-parser module is used to parse the body of incoming HTTP requests

require("dotenv/config");

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connection established with MongoDB");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Home page!");
});

// Middleware
app.use(bodyParser.json()); //bodyParser.json(): This is a specific middleware function provided by the body-parser module. It is used to parse JSON data from the request body.

// Organizing routes using middleware allows you to separate different parts of your application's functionality.
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes); // mounting the postRoutes middleware at the /posts route. This means that any request that starts with /posts will be handled by the postRoutes middleware.This allows you to compartmentalize different parts of your application's functionality and handle them separately.

app.listen(3000, () => {
  console.log("Listeing on http://localhost:3000");
}); //The listen() method binds the server to a specific port and starts listening for incoming HTTP requests.
