const router = require("express").Router();
const {upload}=require('../common-middleware/index')

const {
	userRegister,
	userLogin,
	requireLogin,
	userRegisterOtp,
	passUpdateOtp,
	changePassword,
	googleLogin,
	facebookLogin,
} = require("../controller/auth");
const { validateRegisterRequest, isRegisterRequestValidated,
  validateLoginRequest,
  isLoginRequestValidated
} = require("../validators/auth");


router.post("/login",
  validateLoginRequest,
  isLoginRequestValidated,
  userLogin);

router.post('/register_verify',userRegisterOtp)
router.post('/pass_update_otp',passUpdateOtp)
router.post("/change_password", changePassword);
router.post('/google_login',googleLogin)

router.post("/facebook_login", facebookLogin);


router.post(
  "/register",
  validateRegisterRequest,
  isRegisterRequestValidated,
  upload.single('profilePicture'),
  userRegister
);



 

module.exports = router;
