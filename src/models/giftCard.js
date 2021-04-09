const mongoose = require("mongoose");
const giftCardSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
        price:{
            type:Number,
            required:true
        }
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("GiftCard", giftCardSchema);
