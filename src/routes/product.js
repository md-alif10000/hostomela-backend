const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
	creatProduct,
	getProductsBySlug,
	getProductDetailsById,
	getAllProducts,
	deleteProductById,
	addReview
} = require("../controller/product");


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
	"/product/create",
	requireLogin,
	isAdmin,
	upload.array("productPicture"),
	creatProduct
);

router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);
router.get("/getAllProducts", getAllProducts);
router.delete('/product/deleteProductById',deleteProductById)
router.post("/product/addReview", requireLogin,isUser, addReview);
module.exports = router;
