const express = require("express");
const { requireLogin, isAdmin } = require("../../common-middleware/index");
const {
	updateOrder,
	getCustomerOrders,
} = require("../../controller/admin/order.admin");
const router = express.Router();

router.post("/order/update", requireLogin, isAdmin, updateOrder);
router.post(
	"/order/getCustomerOrders",
	requireLogin,
	isAdmin,
	getCustomerOrders
);

module.exports = router;
