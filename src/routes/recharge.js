const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const router = express.Router();
const { addRecharge, getRecharges } = require("../controller/recharge");

router.post("/addRecharge", requireLogin, isUser, addRecharge);
router.get("/getRecharges", requireLogin, isUser, getRecharges);

module.exports = router;
