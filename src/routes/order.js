const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const router = express.Router();
const {addOrder,getOrders,getOrder} = require("../controller/order");

router.post("/addOrder", requireLogin, isUser, addOrder);
router.get("/getOrders", requireLogin, isUser, getOrders);
router.post("/getOrder", requireLogin, isUser, getOrder);
module.exports = router;
