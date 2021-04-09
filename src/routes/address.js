const { addAddress, getAddress } = require("../controller/address");
const { requireLogin,  isUser } = require("../common-middleware");
const router = require("express").Router();

router.post("/user/address/create", requireLogin, isUser, addAddress);
router.get("/user/getaddress", requireLogin, isUser, getAddress);

module.exports = router;
