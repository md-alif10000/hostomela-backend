const jwt=require('jsonwebtoken')


const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const { creatProduct, getProductsBySlug } = require("../controller/product");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + "-" + file.originalname);
	},
});

exports.upload = multer({ storage: storage });






















exports.requireLogin = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
               message:'Login required'
           })
       }
         if (req.headers.authorization) {
           const token = req.headers.authorization.split(" ")[1];

           const user = jwt.verify(token, process.env.JWT_SECRET);
             req.user = user;
             next();
         }
     

};


exports.isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({
      message: "Access denied",
    });
  }
 
  
  next();
};







exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({
            message:'Access denied'
        })
    }

    next()
}
