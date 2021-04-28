const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const shortid = require("shortid");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
const env = require("dotenv");
const fetch=require('node-fetch') 
env.config();
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const accountSID = process.env.T_ACCOUNT_SID;
const authToken = process.env.T_AUTH_TOKEN;


const googleClient = new OAuth2Client(googleClientId);

const client = require("twilio")(accountSID, authToken);

exports.userRegisterOtp = (req, res) => {
	const { phone } = req.body;
	console.log(phone);
	console.log(accountSID)

	User.findOne({ phone }).exec(async (error, user) => {
		if (error) {
			return res.status(400).json({
				error,
			});
		}
		if (user) {
			return res.status(403).json({
				message: "User Already Registered",
			});
		}
		if (!user) {
		
			client.verify
				.services(process.env.T_SERVICE_ID)
				.verifications.create({
					to: `+88${phone}`,
					channel: "sms",
				})
				.then((data, error) => {
					if (error) {
						return res.status(400).json({ error });
					}
					res.status(200).send({
						message: "Verification is sent!!",
						phonenumber: phone,
						data,
					});
					
				});
		}
		// sent otp to verify user
	});
};
exports.userRegister = (req, res) => {
	const { name, email, password, phone, otp,profilePicture } = req.body;
	console.log("user register....");

	client.verify
		.services(process.env.T_SERVICE_ID)
		.verificationChecks.create({
			to: `+88${phone}`,
			code: otp,
		})
		.then(async (data) => {
			if (data.status === "approved") {
				const hash = await bcrypt.hash(password, 9);
				// const profilePicture = req.file.filename;

				const _user = new User({
					name,
					email,
					userName: shortid.generate(),
					phone,
					password: hash,
				})
			const token = jwt.sign(
						{ _id: user._id, role: user.role },
					process.env.JWT_SECRET,
						{
			 				expiresIn: "7 day",
			 			}
			 		);

				_user.save((error, data) => {
					if (error) {
						return res.status(400).json({
							error,
						});
					}
					return res.status(201).json({
						user: data,
						token,
					});
				});

				// let transporter = nodemailer.createTransport({
				// 	service: "gmail",
				// 	auth: {
				// 		user: process.env.EMAIL,
				// 		pass: process.env.PASS,
				// 	},
				// });

				// console.log(process.env.EMAIL);
				// let mailOptions = {
				// 	from: process.env.EMAIL,
				// 	to: email,
				// 	subject: "New account Registration",
				// 	text: "Successfully registered your account.......",
				// };

				// transporter.sendMail(mailOptions, (err, data) => {
				// 	if (err) {
				// 		console.log(err);
				// 		return res.status(400).json({ err });
				// 	} else {
				// 		const token = jwt.sign(
				// 			{ _id: user._id, role: user.role },
				// 			process.env.JWT_SECRET,
				// 			{
				// 				expiresIn: "7 day",
				// 			}
				// 		);
				// 		_user.save((error, data) => {
				// 			if (error) {
				// 				return res.status(400).json({
				// 					error,
				// 				});
				// 			}

				// 			return res.status(201).json({
				// 				user: data,
				// 				token
				// 			});
				// 		});
				// 	}
				// });
			} else {
				return res.status(400).json({ message: "Invalid OTP" });
			}
		});
};

//Login Config
exports.userLogin = async (req, res) => {
	const { phone, password } = req.body;

	console.log(req.body);
	try {
		User.findOne({ phone })
			.then(async (user) => {
				console.log(user);

				if (!user) {
					console.log("User not found");
					return res.status(400).json({
						message: "User not found",
					});
				}

				if (user) {
					const { role } = user;
					if (role == "admin") {
						return res.status(400).json({
							message: "Only user Can login",
						});
					}

					const match = await bcrypt.compare(password, user.password);
					if (!match) {
						return res.status(400).json({
							message: "Password doesn't match",
						});
					}

					if (match) {
						const token = jwt.sign(
							{ _id: user._id, role: user.role },
							process.env.JWT_SECRET,
							{
								expiresIn: "7 day",
							}
						);
						const { _id, name, email, role, balance, phone,profilePicture } = user;

						return res.status(200).json({
							token,
							message: "Login successfull",
							user: { _id, name, email, role, balance, phone, profilePicture },
						});
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

exports.passUpdateOtp = (req, res) => {
	const { phone } = req.body;

	console.log(phone);
	User.findOne({ phone }).exec(async (error, user) => {
		if (error) {
			return res.status(400).json({
				error,
			});
		}
		if (!user) {
			return res.status(404).json({
				message: "No user found",
			});
		}
		if (user) {
			client.verify
				.services(process.env.T_SERVICE_ID)
				.verifications.create({
					to: `+88${phone}`,
					channel: "sms",
				})
				.then((data, error) => {
					if (error) {
						return res.status(400).json({ error });
					}
					res.status(200).send({
						message: "Verification is sent!!",
						phonenumber: phone,
						data,
					});
				});
		}
		// sent otp to verify user
	});
};

exports.changePassword = (req, res) => {
	const { userPhone, password, userOtp } = req.body;
	console.log(req.body);

	client.verify
		.services(process.env.T_SERVICE_ID)
		.verificationChecks.create({
			to: `+88${userPhone}`,
			code: userOtp,
		})
		.then(async (data) => {
			if (data.status === "approved") {
				const newPassword = await bcrypt.hash(password, 10);
				User.findOneAndUpdate(
					{ phone: userPhone },
					{ password: newPassword },
					(error, user) => {
						if (error) return res.status(400).json({ error });
						if (user) {
							return res.status(201).json({ user });
						}
					}
				);
			} else {
				return res.status(401).json({ message: "Invalid OTP" });
			}
		});
};





exports.googleLogin = (req, res) => {
	const { tokenId } = req.body;

	googleClient
		.verifyIdToken({ idToken: tokenId, audience: googleClientId })
		.then((response) => {
			const {
				email_verified,
				name,
				email,
				picture,
				sub,
			} = response.payload;
			console.log(response.payload);
			console.log({ email_verified, name, email, picture, sub });
			User.findOne({ email }).exec((err, user) => {
				if (err)
					return res.status(400).json({ error: "Something went wrong.." });
				else {
					if (user) {
						const token = jwt.sign(
							{ _id: user._id, role: user.role },
							process.env.JWT_SECRET,
							{
								expiresIn: "7 day",
							}
						);
						const { _id, name, email, role, balance, phone ,profilePicture} = user;

						return res.status(200).json({
							token,
							message: "Login successfull",
							user: { _id, name, email, role, balance, phone, profilePicture },
						});
					} else {
						let password = email + process.env.JWT_SECRET;
						console.log(sub);
						let phone = sub.slice(0, 5);
						const user = new User({
							name,
							email,
							userName: shortid.generate(),
							password,
							profilePicture: picture,
							phone:`dummy-${phone}`
						
						});
					
					
						let transporter = nodemailer.createTransport({
							service: "gmail",
							auth: {
								user: process.env.EMAIL,
								pass: process.env.PASS,
							},
						});

						console.log(process.env.EMAIL);
						let mailOptions = {
							from: process.env.EMAIL,
							to: email,
							subject: "New account Registration",
							text: "Successfully registered your account.......",
						};

						transporter.sendMail(mailOptions, (err, data) => {
							if (err) {
								console.log(err);
								return res.status(400).json({ err });
							} else {
								const token = jwt.sign(
									{ _id: user._id, role: user.role },
									process.env.JWT_SECRET,
									{
										expiresIn: "7 day",
									}
								);
								user.save((error, data) => {
									if (error) {
										console.log(error)
										return res.status(400).json({
											error,
										});
									}

									return res.status(201).json({
										user: data,
										token,
									});
								});
							}
						});
					}
				}
			});
		});
};




exports.facebookLogin = (req, res) => {
	console.log(req.body)
	const { accessToken,userID } = req.body;
	let urlGraphFacebook=`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,picture,email&access_token=${accessToken}`

	fetch(urlGraphFacebook, { method: "GET" })
		.then((response) => response.json())
		.then((response) => {
			const { name, email, picture, id } = response;

			User.findOne({ email }).exec((err, user) => {
				if (err)
					return res.status(400).json({ error: "Something went wrong.." });
				else {
					if (user) {
						const token = jwt.sign(
							{ _id: user._id, role: user.role },
							process.env.JWT_SECRET,
							{
								expiresIn: "7 day",
							}
						);
						const {
							_id,
							name,
							email,
							role,
							balance,
							phone,
							profilePicture,
						} = user;
						return res.status(200).json({
							token,
							message: "Login successfull",
							user: { _id, name, email, role, balance, phone, profilePicture },
						});
					} else {
						let password = email + process.env.JWT_SECRET;
						let sid=shortid.generate()
							let phone = sid.slice(0, 5);
						const user = new User({
							name,
							email,
							userName: shortid.generate(),
							password,
							profilePicture: picture.data.url,
							phone: `dummy-${phone}`,
						});
						let transporter = nodemailer.createTransport({
							service: "gmail",
							auth: {
								user: process.env.EMAIL,
								pass: process.env.PASS,
							},
						});

						let mailOptions = {
							from: process.env.EMAIL,
							to: email,
							subject: "New account Registration",
							text: "Successfully registered your account.......",
						};

						transporter.sendMail(mailOptions, (err, data) => {
							if (err) {
								console.log(err);
								return res.status(400).json({ err });
							} else {
								const token = jwt.sign(
									{ _id: user._id, role: user.role },
									process.env.JWT_SECRET,
									{
										expiresIn: "7 day",
									}
								);
								user.save((error, data) => {
									if (error) {
										return res.status(400).json({
											error,
										});
									}

									return res.status(201).json({
										user: data,
										token,
									});
								});
							}
						});
					}
				}
			});
		});

};
