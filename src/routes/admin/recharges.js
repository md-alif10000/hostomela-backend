const express = require("express");
const { upload, requireLogin, isAdmin } = require("../../common-middleware");
const {
	getAllRecharges,
	updateRecharge,
} = require("../../controller/admin/recharge");
const router = express.Router();

router.get(
	"/recharge/allRecharge",
	requireLogin,
	isAdmin,
	getAllRecharges
);

router.put("/recharge/update", requireLogin, isAdmin, updateRecharge);

module.exports = router;
