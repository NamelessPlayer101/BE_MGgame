const express = require("express");
const route = express.Router();
const chatService = require("../controllers/chat.controller");

route.post("/", chatService.message)
// api dùng để test báo lỗi
route.get('/hiho', (req, res, next) => {
    let err = new Error('Route not found!')
    err.status = 404
    next(err)
})
// </>

module.exports = route;
