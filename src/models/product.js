const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		price: { type: Number, required: true },
		quantity: {
			type: Number,
			required: true,
		},
		// desc: { type: String, required: true, trim: true },
		offer: { type: Number },
		highlights: [String],
		productPictures: [{ image: { type: String } }],
		sizes: [{ size: { type: String },
		price:{type:Number} }],
		colors: [{ colorName: { type: String }, code: { type: String } }],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		// reviews: [
		// 	{
		// 		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		// 		review: String,
		// 		rating: Number,
		// 		date: String,
		// 	},
		// ],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		updatedAt: Date,
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
