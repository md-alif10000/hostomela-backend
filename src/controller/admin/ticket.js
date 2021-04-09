const Ticket = require("../../models/ticket");
const slugify = require("slugify");
const { ObjectId } = require("mongodb");
exports.addTicket = (req, res) => {
    console.log(req.body)
    
	const { title, coach, price, from,to,startAt,arriveAt,ac} = req.body;
    const ticketImage=req.file.filename

    console.log(ticketImage)


	const ticket = new Ticket({
		title,
        coach,
		price,
        from,
        to,
        startAt,
        arriveAt,
        ticketImage,
        ac

	});
    console.log('new_ticket',ticket)

	ticket.save((error, ticket) => {
		if (error) {
			return res.status(400).json({ error });
		}
		if (ticket) {
			res.status(201).json({
				ticket,
			});
		}
	});
};
