const jwt =require('jsonwebtoken')

const managerAuth=(req,res,next)=>{
    const mauth =req.headers['authorization'];
    //console.log(auth);
    if(!mauth){
        return res.status(403).json({message:'Unauthorized,token Required'});
    }
    try {
        const decoded =jwt.verify(mauth,process.env.A_JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(403).json({message:'Unauthorized,token wrong or expired'});
    }
}
module.exports=managerAuth;