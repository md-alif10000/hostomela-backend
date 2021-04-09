const Coupon=require('../../models/coupon')

exports.addCoupon=(req,res)=>{
    console.log(req.body)
    const {name,type,amount,validFrom,validTo}=req.body;
    const coupon=new Coupon({
        name,
        type,
        amount,
        validFrom,
        validTo
    })

    coupon.save().then((data,error) => {
			if (error) return res.status(400).json({ error });
			if (data) {
				return res.status(201).json({ data });
			}
		});
}



exports.getAllCoupon=(req,res)=>{
    Coupon.find({}).sort({createdAt:-1}).then((coupons,error)=>{
        if(error) return res.status(400).json({error})
        else{
            return res.status(200).json({coupons})
        }
    })
}


exports.deleteCoupon=(req,res)=>{
    console.log("delete",req.body)
    Coupon.findOneAndDelete({_id:req.body._id},(error,data)=>{
        if(error) return res.status(400).json({error})
        if(data){
            return res.status(200).json({data})
        }

    })
}
exports.updateCoupon=(req,res)=>{
   console.log(req.body)
    Coupon.findOneAndUpdate({_id:req.body._id},req.body,(error,data)=>{
        if(error) return res.status(400).json({error})
        if(data) return res.status(201).json({data})
    })

}