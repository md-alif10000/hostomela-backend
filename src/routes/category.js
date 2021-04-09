const express = require("express");
const { requireLogin, isAdmin } = require("../common-middleware");
const {
	addCategory,
	getCategory,
	updateCategories,
	deleteCategories,
	getSubCategory,
} = require("../controller/category");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post(
	"/category/create",
	requireLogin,
	isAdmin,
	upload.single("categoryImage"),
	addCategory
);
router.get("/category/getcategory", getCategory);
router.post(
	"/category/update",
	upload.array("categoryImage"),
	updateCategories
);
router.post("/category/delete", deleteCategories);
router.get("/subcategory/:parentId", getSubCategory);

module.exports = router;
