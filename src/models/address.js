const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
	name: { type: String, 
        required: true, 
        trim: true, 
        min: 3, 
        max: 50 },
	mobileNumber: {
		type: String,
		required: true,
		trim: true,
	},
    zipCode:{
        type:String,
        required:true,
        trim:true
    },
  

    address:{
        type:String,
        required:true,
        trim:true,
        min:10,
        max:100
    },
    cityDistrict:{
        type:String,
        required:true,
        trim:true,
    },

alternatePhone:{
    type:String
},

});

const userAddressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    address:[addressSchema]
},{timestamps:true})

module.exports=mongoose.model('UserAddress',userAddressSchema)