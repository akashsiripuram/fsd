const jwt=require("jsonwebtoken");


const verifyToken=(req,res,next)=>{
    const token=req.header["Authorization"].split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Access denied"});
    }try{
        const decoded=jwt.verify(token,"secret");
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(400).json({message:"Invalid token"});
    }
}

module.exports=verifyToken;