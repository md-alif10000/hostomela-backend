const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const router = express.Router();
const {
	addItemToCart,
	getCartItems,
	removeCartItems,
} = require("../controller/cart");

router.post("/user/cart/addtocart", requireLogin, isUser, addItemToCart);
router.get("/user/cart/getCartItems", requireLogin, isUser, getCartItems);
router.post("/user/cart/removeItem", requireLogin, isUser, removeCartItems);
module.exports = router;
