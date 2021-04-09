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
    // locality:{
    //     type:String,
    //     required:true,
    //     trim:true,
    //     min:10,
    //     max:100
    // },

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
    // state:{
    //     type:String,
    //     required:true,

    // },
    // landmark:{
    //     type:String,
    //    min:3,
    //    max:100
    // },
alternatePhone:{
    type:String
},
// addressType:{
//     type:String,
//     required:true,
//     enum:['home','work']
// }

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