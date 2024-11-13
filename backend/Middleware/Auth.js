const jwt =require('jsonwebtoken')

const userAuth=(req,res,next)=>{
    const uauth =req.headers['authorization'];
    //console.log(auth);
    if(!uauth){
        return res.status(403).json({message:'Unauthorized,token Required'});
    }
    try {
        const decoded =jwt.verify(uauth,process.env.A_JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(403).json({message:'Unauthorized,token wrong or expired'});
    }
}

module.exports=userAuth;