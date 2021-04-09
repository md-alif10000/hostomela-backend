const Recharge = require("../../models/recharge");

exports.updateRecharge = (req, res) => {
	Recharge.updateOne(
		{ _id: req.body.rechargeId },
		{ status: req.body.status }
	).exec((error, recharge) => {
		if (error) return res.status(400).json({ error });
		if (recharge) {
			res.status(201).json({ recharge });
		}
	});
};

exports.getAllRecharges = async (req, res) => {
	const recharges = await Recharge.find()
		.sort({ createdAt: -1 })
		.exec();
	console.log(recharges);
	 return res.status(200).json({ recharges });
};
