const GiftCard=require('../models/giftCard')


exports.getGiftCards=(req,res)=>{
    GiftCard.find({}).exec((error, cards) => {
			if (error) return res.status(400).json({error});
			if (cards) return res.status(200).json({ cards });
		});
}


exports.createGiftCard=(req,res)=>{
    const {title,amount,price}=req.body
    const card=new GiftCard({
        title,amount,price
    })

    card.save().then((card,error)=>{
        if(error) return res.status(400).json((error))
        if(card){
            return res.status(201).json({card})
        }
    })


}