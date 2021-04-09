const express = require("express");
const {
	requireSignin,
	adminMiddleware,
} = require("../../common-middleware/index");
const {
	updateOrder,
	getCustomerOrders,
} = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(
	"/order/update",
	//  requireLogin, adminMiddleware,
	updateOrder
);
router.post(
	"/order/getCustomerOrders",
	// requireLogin,
	// adminMiddleware,
	getCustomerOrders
	// ()=>{
	//     return hello
	// }
);

module.exports = router;
