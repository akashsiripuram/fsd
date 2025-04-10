const express=require("express");
const Task = require("../models/task");
const verifyToken = require("../middleware/verifyToken");
const router=express.Router();

router.post("/",async(req,res)=>{
    const {title,description,status,dueDate,assignedTo}=req.body;
   try{
        const task=new Task({
            title,description,status,dueDate,assignedTo
        });
        await task.save();
        res.status(201).json({message:"Task created successfully",task});
   }catch(err){
        res.status(400).json({message:"Error creating task",error:err.message});
   }
})

router.get("/",verifyToken, async(req,res)=>{
    try{
        const tasks=await Task.find({assignedTo:req.user.id}).populate("assignedTo","name email");
        res.status(200).json({message:"Tasks fetched successfully",tasks});
    }catch(err){
        res.status(400).json({message:"Error fetching tasks",error:err.message});
    }
})

router.get("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params;
    try{
        const task=await Task.find({_id:id}).populate("assignedTo","name email");
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task fetched successfully",task});
    }
    catch(err){
        res.status(400).json({message:"Error fetching task",error:err.message});
    }
})

router.put("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params;
    const {title,description,status,dueDate,assignedTo}=req.body;
    try{
        const task=await Task.findByIdAndUpdate(id,{title,description,status,dueDate,assignedTo},{new:true});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task updated successfully",task});
    }
    catch(err){
        res.status(400).json({message:"Error updating task",error:err.message});
    }

});

router.delete("/:id",verifyToken,async(req,res)=>{
    const {id}=req.params;
    try{
        const task=await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task deleted successfully",task});
    }
    catch(err){
        res.status(400).json({message:"Error deleting task",error:err.message});
    }
}
)

module.exports=router;