
const express = require('express');
const router = express.Router()
const User = require("../models/usermodel");
const { signupvalidationuser,loginvalidationuser } = require('../Middleware/AuthValidation');
const { signupuser,loginuser } = require('../Controller/AuthController');
const userAuth = require('../Middleware/Auth');
const manAuth =require('../Middleware/manAuth')



router.post('/createuser', signupvalidationuser,signupuser);
router.post('/loginuser', loginvalidationuser,loginuser);


  router.get('/users',userAuth, async (req, res) => {
    try {
      const users = await User.find();
       res.status(200).json(users);
      //res.status(200).json({name:"satya"});
    } catch (error) {
      res.status(500).send({ error: 'Error fetching user data' });
    }
  });
  router.get('/usersformanager',manAuth, async (req, res) => {
    try {
      const users = await User.find();
       res.status(200).json(users);
      //res.status(200).json({name:"satya"});
    } catch (error) {
      res.status(500).send({ error: 'Error fetching user data' });
    }
  });

  router.delete('/deleteuser/:email_id', async (req, res) => {
    const { email_id } = req.params;
    try {
      const deletedUser = await User.findOneAndDelete({ email_id });
      if (!deletedUser) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
      res.status(500).send({ error: 'Error deleting user' });
    }
  });
  module.exports = router;