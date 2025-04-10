const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const authROuter=require("./routes/auth");
const taskRouter=require("./routes/task");
app.use(express.json());
app.use(express.static(path.join(__dirname,"views")));


mongoose.connect("mongodb://localhost:27017/helloworld")
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("Error connecting to MongoDB",err));


app.use("/api/auth",authROuter);
app.use("/api/tasks",taskRouter);
app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})