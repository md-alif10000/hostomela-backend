
const Coupon=require('../models/coupon')

exports.validateCoupon=(req,res)=>{
    const {couponName}=req.body
	try{  Coupon.findOne({ name: couponName }, (error, coupon) => {
		if (error) return res.status(400).json({ error });

		if (coupon) {
			return res.status(200).json({
				coupon,
			});
		}
		if (!coupon) return res.status(404).json({ message: "Coupon not found " });
	});

	}catch(error){
		console.log(error)
		return res.status(400).json({error})

	}
  
}
