const Cart = require("../models/cart");
const mongoose = require("mongoose");

function runUpdate(condition, update) {
	return new Promise((resolve, reject) => {
		Cart.findOneAndUpdate(condition, update, { upset: true })
			.then((result) => resolve())
			.catch((err) => reject(err));
	});
}

exports.addItemToCart = (req, res) => {

	Cart.findOne({ user: req.user._id }).exec((error, cart) => {
		if (error) return res.status(400).json({ error });
		if (cart) {
			//if cart already exists then update cart by quantity
			let promiseArray = [];

			req.body.cartItems.forEach((cartItem) => {
				const product = cartItem.product;
				const item = cart.cartItems.find((c) => c.product == product);
				let condition, update;
				if (item) {
					condition = { user: req.user._id, "cartItems.product": product };
					update = {
						$set: {
							"cartItems.$": cartItem,
						},
					};
				} else {
					condition = { user: req.user._id };
					update = {
						$push: {
							cartItems: cartItem,
						},
					};
				}
				promiseArray.push(runUpdate(condition, update));
		
			});
			Promise.all(promiseArray)
				.then((response) => res.status(201).json({ response }))
				.catch((error) => res.status(400).json({ error }));
		} else {
			//if cart not exist then create a new cart
			const cart = new Cart({
				user: req.user._id,
				cartItems: req.body.cartItems,
			});
			console.log('new cart',cart)
			cart.save((error, cart) => {
				if (error) return res.status(400).json({ error });
				if (cart) {
					return res.status(201).json({ cart });
				}
			});
		}
	});
};

exports.getCartItems = (req, res) => {
	//const { user } = req.body.payload;
	//if(user){
	Cart.findOne({ user: req.user._id })
		.populate("cartItems.product", "_id name price productPictures")
		.exec((error, cart) => {
			if (error) return res.status(400).json({ error });
			if (cart) {
				
				let cartItems = {};
				cart.cartItems.forEach((item, index) => {
					cartItems[item.product._id.toString()] = {
						_id: item.product._id.toString(),
						name: item.product.name,
						image: item.product.productPictures[0].image,
						price: item.price ? item.price :item.product.price  ,
						qty: item.quantity,
						size:item.size,
						color:item.color,
						stitch:item.stitch
					};
				});
				res.status(200).json({ cartItems });
			}
			return res.status(200).json({message:'cart is empty'})
		});
	//}
};


exports.removeCartItems = (req, res) => {
	const { productId } = req.body.payload;
	if (productId) {
		Cart.update(
			{ user: req.user._id },
			{
				$pull: {
					cartItems: {
						product: productId,
					},
				},
			}
		).exec((error, result) => {
			if (error) return res.status(400).json({ error });
			if (result) {
				res.status(202).json({ result });
			}
		});
	}
};