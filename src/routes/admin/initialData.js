const router = require("express").Router();

const {
	initialData,
	getSubCategory,
} = require("../../controller/admin/initialdata");



router.post("/initialdata",initialData);




module.exports = router;
