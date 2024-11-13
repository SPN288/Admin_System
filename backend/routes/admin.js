const express = require('express');
const router = express.Router()
const { loginvalidationAdmin,signupvalidationAdmin } = require('../Middleware/AuthValidation');
const { loginAdmin,signupAdmin } = require('../Controller/AuthController');

router.post('/createadmin',signupvalidationAdmin,signupAdmin);
router.post('/adminlogin',loginvalidationAdmin,loginAdmin);

module.exports=router;