const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		coach: {
			type: String,
			required: true,
			trim: true,
		},
		from: { type: String, required: true },
		to: { type: String, required: true },
		startAt: { type: String, required: true },
		arriveAt: { type: String, required: true },
		price: {
			type: Number,

			required: true,
		},
		ac: { type: Boolean, default: false },
		status: {
			type: String,
		
			default: "available",
		},
		ticketImage:{
			type:String,
			required:true,
		}
	},
	{ timestamps: true }
);

module.exports= new mongoose.model("Ticket", ticketSchema);
