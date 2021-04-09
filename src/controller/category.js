const slugify = require("slugify");
const category = require("../models/category");
const Category = require("../models/category");
const mongoose=require('mongoose')
const ObjectID=mongoose.Types.ObjectId()
const shortId=require('shortid')

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
			type:cate.type,
			image:cate.categoryImage,
			children: createCategories(categories, cate._id),
		});
	}

	return categoryList;
}

exports.addCategory = (req, res) => {
	// console.log(req.file)
	console.log(req.body)
	const { name } = req.body;
	const categoryObj = {
		name,
		
		slug:`${slugify(name)}-${shortId.generate()}`,
	};

	let categoryUrl;

	if (req.file) { 
		categoryUrl ="/public/" + req.file.filename;
		categoryObj.categoryImage = categoryUrl;
		// categoryObj.categoryImage=req.file.filename
	}

	if (req.body.parentId) {
		categoryObj.parentId = req.body.parentId;
	}

	// console.log(categoryObj)
	const cat = new Category(categoryObj);

	cat.save((error, category) => {
		if (error) {
			return res.status(400).json({
				error,
			});
		}
		if (category) {
			return res.status(201).json({
				category,
			});
		}
	});
};

exports.getCategory = (req, res) => {
	Category.find({})
	// .select("_id name slug img")
	.exec((error, categories) => {
		if (error) {
			return res.status(400).json({
				error,
			});
		}
		if (categories) {
			const categoryList = createCategories(categories);
			return res.status(200).json({ categoryList });
		}
	});
};

exports.updateCategories = async (req, res) => {
	const { _id, name, parentId, type } = req.body;
	const updatedCategories = [];
	if (name instanceof Array) {
		for (let i = 0; i < name.length; i++) {
			const category = {
				name: name[i],
				type: type[i],
			};
			if (parentId[i] !== "") {
				category.parentId = parentId[i];
			}
			const updatedCategory = await Category.findOneAndUpdate(
				{ _id: _id[i] },
				category,
				{ new: true }
			);

			updatedCategories.push(updatedCategory);
		}
		return res.status(201).json({ updatedCategories: updatedCategories });
	} else {
		const category = { name, parentId, type };
		if (parentId !== "") {
			category.parentId = parentId;
		}
		const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
			new: true,
		});
		return res.status(201).json({ updatedCategory });
	}

	res.status(200).json({ body: req.body });
};

exports.deleteCategories = async (req, res) => {
	const { ids } = req.body.payload;
	const deletedCategories = [];
	for (let i = 0; i < ids.length; i++) {
		const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
		deletedCategories.push(deleteCategory);
	}
	if (deletedCategories.length == ids.length) {
		res.status(202).json({ message: "Categories succesfully removed" });
	} else {
		res.status(400).json({
			message: "Something went wrong",
		});
	}
};

exports.getSubCategory = (req, res) => {
	const parentId = req.params.parentId;

	console.log(parentId)

	Category.find({ parentId}).exec((error, data) => {
		if (error) return res.status(400).json({ error });
		if (data) return res.status(200).json({ data });
	});
};