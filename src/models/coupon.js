const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema(
	{
	
		name: {
			type: String,
			required: true,
		},
        type:{
            type:String,
            enum:['fixed','percentage'],
            required:true
        },
		amount: {
			type:Number,
			required: true,
		
		},
		validFrom: {
			type: String,
			// required: true,
		},
		validTo: {
			type: String,
			// required: true,
		},
		status: {
			type: String,
			default: "active",
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Coupon", couponSchema);
