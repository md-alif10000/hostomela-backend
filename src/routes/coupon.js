const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const {
	addCoupon,
	getAllCoupon,
	updateCoupon,
	deleteCoupon,
} = require("../controller/admin/coupon");
const { validateCoupon } = require("../controller/coupon");
const router = express.Router();

router.post("/coupon/addCoupon", requireLogin, isAdmin, addCoupon);

router.post("/coupon/validateCoupon", requireLogin, isUser, validateCoupon);

router.get("/coupon/allCoupon", requireLogin, isAdmin, getAllCoupon);
router.put("/coupon/updateCoupon", requireLogin, isAdmin, updateCoupon);
router.delete("/coupon/deleteCoupon", requireLogin, isAdmin, deleteCoupon);

module.exports = router;
