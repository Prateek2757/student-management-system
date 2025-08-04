const express  = require("express");
const {register ,login, uploadProfileImage} = require("../controllers/authControllers")
const {validateLogin , validateRegister} = require("../validators/authValidators")
const upload = require("../middleware/upload");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/register" ,validateRegister,register);
router.post("/login",validateLogin, login);
router.put(
    "/uploads/profile-image",
    protect,
    upload.single("profileImage"),
    uploadProfileImage
  );
module.exports = router;