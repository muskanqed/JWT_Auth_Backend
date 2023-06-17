const express = require("express");
const cors = require("cors")
const {_corsOptionsDelegate} = require("./utilities/CorsDelgate")
require("dotenv").config();

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors(_corsOptionsDelegate))  
server.get("/health", (request, response) => {
    const healthchecker = {
      uptime: process.uptime(),
      message: "Fine",
      timestamp: Date.now(),
    };
    try {
      response.send(healthchecker);
    } catch (error) {
      healthchecker.message = error;
      response.status(503).send();
    }
  });

server.listen(port, () => {
    console.log(`App Listening on Port: ${port}`)
})
