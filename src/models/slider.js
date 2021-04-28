const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
	{
		slides:[{
            image:{type:String,
            required:true},
            text:{type:String,
            trim:true}

        }
           
        ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
