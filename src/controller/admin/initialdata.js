const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");
const User = require("../../models/user");
const Recharge = require("../../models/recharge");

function createCategories(categories, parentId = null) {
	const categoryList = [];
	let category;
	if (parentId == null) {
		category = categories.filter((cat) => cat.parentId == undefined);
	} else {
		category = categories.filter((cat) => cat.parentId == parentId);
	}

	for (let cate of category) {
		categoryList.push({
			_id: cate._id,
			name: cate.name,
			slug: cate.slug,
			parentId: cate.parentId,
			type: cate.type,
			img:cate.categoryImage,
			children: createCategories(categories, cate._id),
		});
	}

	return categoryList;
}

exports.initialData = async (req, res) => {
	const categories = await Category.find({}).exec();
	const products = await Product.find()
		.select("_id name price quantity slug description productPictures category")
		.populate({ path: "category", select: "_id name" })
		.exec();
	const orders = await Order.find({})
		.sort({ createdAt: -1 })
		.populate("items.productId", "name")
		.exec();

	const users= await User.find({}).sort({createdAt:-1}).exec()	
	const recharges = await Recharge.find().sort({ createdAt: -1 });
		
	res.status(200).json({
		categories: createCategories(categories),
		products,
		orders,
		users,
		recharges
	});
};


