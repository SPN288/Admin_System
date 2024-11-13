const UserModal = require('../models/usermodel');
const AdminModel =require('../models/adminmodel');
const ManagerModel= require('../models/managermodel');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')

const signupuser = async (req,res)=>{
    try {      
        const {email_id,emp_id,name,mobile_number,department,password}=req.body;
        const user = await UserModal.findOne({email_id})
        if(user){
            return res.status(409).json({message:'User already exist',success:false});
        }
        const um=new UserModal({email_id,emp_id,name,mobile_number,department,password});
        um.password=await bcrypt.hash(password,10);
        await um.save();
        res.status(201).json({message:'signup succesfull',success:true});
        
      } catch (error) {
        res.status(400).send(error);
      }
}
const loginuser = async (req,res)=>{
    try {
        
        const {email_id,password}=req.body;
        const user = await UserModal.findOne({email_id})
        if(!user){
            return res.status(403).json({message:'Auth failed email is wrong',success:false});
        }
        const isPassEqual =await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403).json({message:'Auth failed password is wrong',success:false});
        }
        const jwttoken = jwt.sign({email_id:user.email_id,_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.status(201).json({message:'log succesfull',success:true,jwttoken,email_id});
        
      } catch (error) {
        res.status(400).send(error);
      }
}
const signupmanager = async (req,res)=>{
  try {
      
      const {email_id,emp_id,name,mobile_number,store_id,password}=req.body;
      const user = await ManagerModel.findOne({email_id})
      if(user){
          return res.status(409).json({message:'User already exist',success:false});
      }
      const man=new ManagerModel({email_id,emp_id,name,mobile_number,store_id,password});
      man.password=await bcrypt.hash(password,10);
      await man.save();
      res.status(201).json({message:'signup succesfull',success:true});
      
    } catch (error) {
      res.status(400).send(error);
    }
}
const loginmanager = async (req,res)=>{
  try {
      
      const {email_id,password}=req.body;
      const user = await ManagerModel.findOne({email_id})
      if(!user){
          return res.status(403).json({message:'Auth failed email is wrong',success:false});
      }
      const isPassEqual =await bcrypt.compare(password,user.password);
      if(!isPassEqual){
          return res.status(403).json({message:'Auth failed password is wrong',success:false});
      }
      const jwttoken = jwt.sign({email_id:user.email_id,_id:user._id},process.env.M_JWT_SECRET,{expiresIn:'24h'});

      res.status(201).json({message:'log succesfull',success:true,jwttoken,email_id});
      
    } catch (error) {
      res.status(400).send(error);
    }
}
const signupAdmin = async (req,res)=>{
  try {
      
      const {email_id,name,password}=req.body;
      const user = await AdminModel.findOne({email_id})
      if(user){
          return res.status(409).json({message:'User already exist',success:false});
      }
      const adm=new AdminModel({email_id,name,password});
      adm.password=await bcrypt.hash(password,10);
      await adm.save();
      res.status(201).json({message:'signup succesfull',success:true});
      
    } catch (error) {
      res.status(400).send(error);
    }
}
const loginAdmin = async (req,res)=>{
  try {
      
      const {email_id,password}=req.body;
      const user = await AdminModel.findOne({email_id})
      if(!user){
          return res.status(403).json({message:'Auth failed email is wrong',success:false});
      }
      const isPassEqual =await bcrypt.compare(password,user.password);
      if(!isPassEqual){
          return res.status(403).json({message:'Auth failed password is wrong',success:false});
      }
      const jwttoken = jwt.sign({email_id:user.email_id,_id:user._id},process.env.A_JWT_SECRET,{expiresIn:'24h'});

      res.status(201).json({message:'log succesfull',success:true,jwttoken,email_id});
      
    } catch (error) {
      res.status(400).send(error);
    }
}

module.exports={signupuser,loginuser,signupmanager,loginmanager,signupAdmin,loginAdmin};
