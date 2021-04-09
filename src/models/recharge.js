const mongoose = require("mongoose");
const rechargeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
    number:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:['prepaid','postpaid']
    },
    provider:{
        type:String,
        required:true

    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
},{timestamps:true});

module.exports = new mongoose.model("Recharge", rechargeSchema);


