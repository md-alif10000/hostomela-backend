const Recharge = require("../models/recharge");
const User = require("../models/user");

exports.addRecharge = (req, res) => {
	const { number, provider, amount, type } = req.body;
	const id = req.user._id;
	const recharge = new Recharge({
		user: id,
		number,
		type,
		provider,
		amount,
	});
	console.log(req.user);
	User.findById({ _id: req.user._id }, (err, response) => {
		if (err) return res.status(400).json({ err });
		if (response) {
			const newBalance = parseInt(response.balance) - parseInt(amount); ;
            console.log(typeof (newBalance));

			User.findOneAndUpdate(
				{ _id: req.user._id },
				{ balance: newBalance },
				(error, user) => {
					if (error) return res.status(400).json({ error });
					if (user) {
						console.log(user);

						recharge.save().then((data, err) => {
							if (data) return res.status(201).json({ data });
							if (err) {
								return res.status(400).json({ err });
							}
						});
					}
				}
			);
		}
	});
};


exports.getRecharges=(req,res)=>{
	Recharge.find({user:req.user._id},(err,recharges)=>{
		if(err) return res.status(400).json({err})
		if(recharges){
			return res.status(200).json({recharges})
		}
	})
}