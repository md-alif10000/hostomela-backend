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
		desc: { type: String, required: true, trim: true },
		offer: { type: Number },
		productPictures: [{ img: { type: String } }],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		reviews: [
			{
				userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				review: String,
				rating:Number
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		
		},
		updatedAt: Date,
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
