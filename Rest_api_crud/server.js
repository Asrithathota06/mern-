const express=require("express");
const PORT=3000;
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
app.use(cors());
app.use(bodyParser.json());
const SECRET_KEY = "my_secret_key";
let students = [
    { id: 1, name: "Asha", age: 20, course: "CSE" },
    { id: 2, name: "Ravi", age: 21, course: "ECE" }
];
app.get("/students",(req,res)=>{
    res.json(students);
});

let users=[
    {
        id:1,
        username:"Admin",
        password:bcrypt.hashSync("1234",10)
    }
];

app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>u.username===username);
    const valid=bcrypt.compareSync(password,user.password);

    const token=jwt.sign(
        {
            id:user.id,
            username:user.username,
        },SECRET_KEY,{
            expiresIn:"24h"
        }

    )
    res.json({
        message:"LOGIN SUCESSFUL",
    token});
})

function verifyToken(req,res,next){
    const authHeader=req.headers["authorization"]
    if (!authHeader) {
        return res.status(403).send("Token required");
    }
    try{
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,SECRET_KEY);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).send("Invalid token");
    }
};


app.get("/students/:id",verifyToken,(req,res)=>{
    const student=students.find(s=>s.id==req.params.id);
    if(!student){
        return res.status(404).send("NOT FOUND");
    }
    res.json(student);
});

app.post("/students",(req,res)=>{
    const newStudent={
        id:students.length+1,
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    }
    students.push(newStudent);
    res.status(200).json(newStudent);
});

app.put("/students/:id",(req,res)=>{
    const student=students.find(s=>s.id==req.params.id);
    if(!student){
        return res.status(404).send("Student Not Found!!!!!");
    }
    student.name=req.body.name;
    student.age=req.body.age;
    student.course=req.body.course;
    res.json(student)
});

app.delete("/students/:id",(req,res)=>{
    const idx=students.findIndex(s=>s.id==req.params.id);
    if(idx==-1){
        return res.status(404).send("Student Not Found!!!!!");
    }
    const del=students.splice(idx,1);
    res.json(del);
});

app.listen(PORT,()=>{
    console.log(`SERVER STARTED RUNNING AT ${PORT}`);
})