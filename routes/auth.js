const express=require("express");
const router=express.Router();
const User = require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashPassword
        });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(400).json({ message: "Error creating user", error: err.message });
    }
});


router.post("/login",async(req,res)=>{
    const {name,password}=req.body;
    try{
        const user=await User.findOne({name});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
       
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},"secret",{expiresIn:"1d"});
        res.status(200).json({message:"Login successful",token});

    }
    catch(err){
        res.status(400).json({message:"Error logging in",error:err.message});
    }
})

module.exports=router;