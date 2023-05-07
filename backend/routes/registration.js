const express = require("express");

const registrationController = require("../controller/registration");

const router = express.Router();

router.post('/submit', registrationController.postRegistration);

router.get('/users-data', registrationController.getUsersData);

module.exports = router;