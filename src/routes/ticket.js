const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const router = express.Router();
const { getTicketByLocation } = require("../controller/ticket");

router.post("/ticket/getTicketByLocation",  getTicketByLocation);

module.exports = router;
