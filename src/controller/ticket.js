const Ticket = require("../models/ticket");

exports.getTicketByLocation = (req, res) => {
	console.log(req.body)
	try {
		Ticket.find({ from: req.body.from, to: req.body.to }).exec(
			(error,tickets) => {
				if (error) {
					return res.status(400).json({ error });
				} else {
					return res.status(200).json({ tickets });
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};
