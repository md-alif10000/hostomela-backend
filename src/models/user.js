const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 15,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		userName: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},

		phone: {
			type: String,
			unique: true,
			required:true,
			minlength: 11,
			maxlength: 11,
			trim: true,
		},
		balance: {
			type: Number,
			default: 0,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		gender: {
			type: String,
			// required: true,
		},
		profilePicture: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
