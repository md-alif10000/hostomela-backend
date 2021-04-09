const router = require("express").Router();
const {
  validateRegisterRequest,
  isRegisterRequestValidated,
  validateLoginRequest,
  isLoginRequestValidated,
} = require("../../validators/auth");
const {
  adminRegister,
  adminLogin,
 
  logout,
} = require("../../controller/admin/auth");
const {requireLogin}=require('../../common-middleware/index')



router.post(
  "/admin/login",
  validateLoginRequest,
  isLoginRequestValidated,
  adminLogin
);

router.post(
  "/admin/register",
  validateRegisterRequest,
  isRegisterRequestValidated,
  adminRegister
);

router.post("/admin/logout",  logout);

module.exports = router;
