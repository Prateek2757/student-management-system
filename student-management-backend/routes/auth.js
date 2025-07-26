const express  = require("express");
const {register ,login} = require("../controllers/authConctrollers")
const {validateLogin , validateRegister} = require("../validators/authValidators")

const router = express.Router();

router.post("/register" ,validateRegister,register);
router.post("/login",validateLogin, login);

module.exports = router;