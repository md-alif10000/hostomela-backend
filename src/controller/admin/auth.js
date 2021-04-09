const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult}=require('express-validator');
const shortid = require("shortid");

exports.adminRegister = (req, res) => {
  const { name, email, password, phone } = req.body;

  User.findOne({ email }).exec(async(error, user) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (user) {
      res.status(400).json({
        message: "User Already Registered",
      });
    }
    if (!user) {
      const hash =await bcrypt.hash(password,10);

      const _user = new User({
        name,
        email,
        userName: shortid.generate(),
        phone,
        password: hash,
        gender:'male',
        role:'admin'
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            error,
          });
        }

        return res.status(201).json({
          message:'Admin Created Successfully',
        });
      });
    }
  });
};

//Login Config
exports.adminLogin = async (req, res) => {
  const { phone, password } = req.body;

  console.log(req.body);

  User.findOne({ phone })
		.then((user) => {
			console.log(user);

			if (!user) {
				console.log("User not found");
				return res.status(400).json({
					message: "User not found",
				});
			}

			if (user) {
				const match = bcrypt.compareSync(password, user.password);
				if (!match) {
					return res.status(400).json({
						message: "Password doesn't match",
					});
				}

				if (match && user.role === "admin") {
					const token = jwt.sign(
						{ id: user._id, role: user.role },
						process.env.JWT_SECRET,
						{
							expiresIn: "1d",
						}
					);
					const { _id, name, email, role } = user;
					res.cookie("token", token, { expiresIn: "7d" });

					return res.status(200).json({
						token,
						message: "Login successfull",
						user: { _id, name, email, role },
					});
				}
			}
		})
		.catch((error) => {});
};

     
exports.logout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    message:'Logout Successfully...'
  })
  
} 