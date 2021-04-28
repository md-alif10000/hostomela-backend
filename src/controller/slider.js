const Slider=require('../models/slider')


exports.addSlider=async(req,res)=>{
    const slider= await new Slider(req.body)

    slider.save().then((error,slider)=>{
        if(error) return res.status(400).json({error})
        if(slider){
            return res.status(201).json({slider})
        }

    })
}


exports.getSlider=async(req,res)=>{
    const slider=await Slider.find().sort({createdAt:-1}).exec()
    if(slider){
        return res.status(200).json({slider})
    }
}