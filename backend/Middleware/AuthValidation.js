const Joi = require('joi');

const signupvalidationuser = (req, res, next) => {
    const schema = Joi.object(
        {
            emp_id: Joi.string().min(3).required(),
            name: Joi.string().min(3).max(100).required(),
            email_id: Joi.string().email().required(),
            mobile_number:Joi.string().min(10).max(12).required(),
            department: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(3).max(100).required()
        }
    );
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:'Bad Request',error});
    }
    next();
}
const loginvalidationuser = (req, res, next) => {
    const schema = Joi.object(
        {
            email_id: Joi.string().email().required(),
            password: Joi.string().min(4).max(100).required(),
        }
    );
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:'Bad Request',error});
    }
    next();
}
const signupvalidationmanager = (req, res, next) => {
    const schema = Joi.object(
        {
            emp_id: Joi.string().min(7).required(),
            email_id: Joi.string().email().required(),
            name: Joi.string().min(3).max(100).required(),
            mobile_number:Joi.string().min(10).max(12).required(),
            store_id: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(4).max(100).required()
        }
    );
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:'Bad Request',error});
    }
    next();
}
const loginvalidationmanager = (req, res, next) => {
    const schema = Joi.object(
        {
            email_id: Joi.string().email().required(),
            password: Joi.string().min(4).max(100).required(),
        }
    );
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:'Bad Request',error});
    }
    next();
}
const signupvalidationAdmin = (req, res, next) => {
    const schema = Joi.object(
        {
            
            name: Joi.string().min(3).max(100).required(),
            email_id: Joi.string().email().required(),
            password: Joi.string().min(4).max(100).required()
        }
    );
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:'Bad Request',error});
    }
    next();
}
const loginvalidationAdmin = (req, res, next) => {
    const schema = Joi.object(
        {
            email_id: Joi.string().email().required(),
            password: Joi.string().min(4).max(100).required(),
        }
    );
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:'Bad Request',error});
    }
    next();
}
module.exports = {signupvalidationuser,loginvalidationuser,signupvalidationmanager,loginvalidationmanager,signupvalidationAdmin,loginvalidationAdmin};