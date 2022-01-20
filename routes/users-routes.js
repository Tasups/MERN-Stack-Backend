const express = require("express");
//const res = require('express/lib/response');

const usersControllers = require("../controllers/users-controllers.js");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post("/signup", usersControllers.signup);

router.post("/login", usersControllers.login);

module.exports = router;
