const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");
const { ObjectId } = require("mongodb");
exports.creatProduct = (req, res) => {
	const { name, quantity, description, price, category } = req.body;

	productPictures = [];

	if (req.files.length > 0) {
		productPictures = req.files.map((file) => {
			return { img: file.filename };
		});
	}

	const product = new Product({
		name,
		slug: slugify(name),
		price,
		quantity,
		category,
		desc:description,
		productPictures,
		createdBy: req.body.createdBy,
	});

	product.save((error, product) => {
		if (error) {
			return res.status(400).json({ error });
		}
		if (product) {
			res.status(201).json({
				product,
			});
		}
	});
};





exports.getProductsBySlug = (req, res) => {
	const { slug } = req.params;
	Category.findOne({ slug: slug })
		.select("_id")
		.exec((error, category) => {
			if (error) {
				return res.status(400).json({ error });
			}
			if (category) {
				try{Product.find({ category: category._id }).exec((error, products) => {
					if (error) {
						return res.status(400).json({ error });
					}
					if (products.length > 0) {
						return res.status(200).json({
							products: products,
							productsByPrice: {
								under5k: products.filter((product) => product.price <= 5000),
								under10k: products.filter(
									(product) => product.price > 5000 && product.price < 10000
								),
								under15k: products.filter(
									(product) => product.price > 100000 && product.price < 15000
								),
								under20k: products.filter(
									(product) => product.price > 15000 && product.price < 20000
								),
								under30k: products.filter(
									(product) => product.price > 20000 && product.price < 30000
								),
							},
						});
					}

					return res
						.status(404)
						.json({ message: "No products found in this Category" });
				});
					
				}catch(error){
					console.log(error)

				}
				
			}
		});
};

exports.getProductDetailsById = (req, res) => {
	const { productId } = req.params;
	if (productId) {	
		console.log(typeof(productId))	
		
		Product.findOne({ _id: productId })
			.populate("reviews.userId", "_id name profilePicture")
			.exec((error, product) => {
				if (error) return res.status(400).json({ error });
				if (product) {
					return res.status(200).json({ product });
				}
			});
	} else {
		return res.status(400).json({ error: "Params required" });
	}
};



exports.deleteProductById = (req, res) => {
	const { productId } = req.body.payload;
	if (productId) {
		try{	Product.deleteOne({ _id: productId }).exec((error, result) => {
			if (error) return res.status(400).json({ error });
			if (result) {
				res.status(202).json({ result });
			}
		});}catch{

		}
	
	} else {
		res.status(400).json({ error: "Params required" });
	}
};

exports.getAllProducts = async (req, res) => {
	try{
			const products = await Product.find({})
				.sort({ createdAt: -1 })
				.select(
					"_id name price quantity slug description productPictures category"
				)
				.populate({ path: "category", select: "_id name" })
				.exec();

			res.status(200).json({ products });

	}catch(error){
		return res.status(400).json({error})

	}

};



exports.addReview=(req,res)=>{
	const {review,rating,productId}=req.body
	try{Product.findByIdAndUpdate(
		{ _id: productId },
		{
			$push: {
				reviews: {
					userId: req.user._id,
					review: review,
					rating: rating,
				},
			},
		}
	).exec((error, data) => {
		if (error) {
			return res.status(400).json({ error });
		}
		if (data) {
			return res.status(201).json({ data });
		}
	});}
	catch(error){
		return res.status(400).json({error})

	}

	
	
}