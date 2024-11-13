const express = require('express');
const router = express.Router()
const ManagerModel = require('../models/managermodel');
const { loginvalidationmanager,signupvalidationmanager } = require('../Middleware/AuthValidation');
const { loginmanager,signupmanager } = require('../Controller/AuthController');
const  managerAuth  = require('../Middleware/mAuth');


router.post('/createmanager',signupvalidationmanager,signupmanager);
router.post('/managerlogin',loginvalidationmanager,loginmanager);

  router.get('/mg',managerAuth, async (req, res) => {
    try {
      const mg = await ManagerModel.find();
      res.status(200).json(mg);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching mg data' });
    }
  });
  router.delete('/deletemanager/:email_id', async (req, res) => {
    const { email_id } = req.params;
    try {
      const deletedManager = await ManagerModel.findOneAndDelete({ email_id });
      if (!deletedManager) {
        return res.status(404).send({ error: 'Manager not found' });
      }
      res.status(200).send({ message: 'Manager deleted successfully', data: deletedManager });
    } catch (error) {
      res.status(500).send({ error: 'Error deleting manager' });
    }
  });
  module.exports = router;