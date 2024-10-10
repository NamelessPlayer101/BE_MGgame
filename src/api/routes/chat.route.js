const express = require("express");
const route = express.Router();
const chatService = require("../controllers/chat.controller");

route.post("/", chatService.message)

module.exports = route;
