const mongoose=require("mongoose");
const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","inprogress","completed"],
        default:"pending"
    },
    dueDate:{
        type:Date,
        default:Date.now
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
const Task=mongoose.model("Task",taskSchema);
module.exports=Task;