const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
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
		type: {
			type: String,
			default: "store",
		},
		categoryImage: { type: String, required: true },
		parentId: {
			// type: mongoose.Schema.Types.ObjectId,
			type: String,
			default:null
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
