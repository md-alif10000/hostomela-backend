const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const router = express.Router();
const { getGiftCards, createGiftCard } = require("../controller/giftCard");

router.get("/giftCard/getAllGiftCard", getGiftCards);
router.post("/giftCard/createGiftCard", createGiftCard);

module.exports = router;
