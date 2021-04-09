const express = require("express");
const { upload, requireLogin, isAdmin } = require("../../common-middleware");
const { addTicket, updateTicket } = require("../../controller/admin/ticket");
const router = express.Router();

router.post("/ticket/addTicket", requireLogin, isAdmin,upload.single('ticketImage'), addTicket);

// router.put("/ticket/updateTicket", requireLogin, isAdmin, updateTicket);

module.exports = router;
