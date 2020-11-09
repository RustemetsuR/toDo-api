const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const users = require("./app/users");
const tasks = require("./app/tasks");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
    await mongoose.connect("mongodb://localhost/toDoList", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false} );
  
    app.use("/users", users);
    app.use("/tasks", tasks);
  
    console.log("Connected to mongo DB");
  
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  };
  
  run().catch(console.log);