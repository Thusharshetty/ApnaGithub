const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const {MongoClient}=require("mongodb");
require("dotenv").config();

const uri=process.env.MONGODB_URL;

let client;

async function connectClient() {
    if(!client){
         client = new MongoClient(uri); 
        await client.connect();
    }
}


const getAllUsers=(req,res)=>{
    res.send("All users")
}

const signup= async(req,res)=>{
   const {username,password,email}=req.body;
    if(!username || !password || !email){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        await connectClient();
        const db=client.db("githubClone");
        const userCollection=db.collection("users");
        const user=await userCollection.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser={
            username,
            password:hashedPassword,
            email,
            repositories:[],
            followedUsers:[],
            starRepos:[]
        }
        const result=await userCollection.insertOne(newUser);
        const token=jwt.sign({id:result.insertId},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(201).json({message:"User created successfully",token})

    }catch(error){
        console.error("Error during signup:",error);
        res.status(500).json({message:"Internal server error"})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        await connectClient();
        const db=client.db("githubClone");
        const userCollection=db.collection("users");
        const user=await userCollection.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"Login successful",token,userId:user._id})
    }catch(error){
        console.error("Error during login:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const getUserProfile=(req,res)=>{
    res.send("User profile")
}
const updateUserProfile=(req,res)=>{
    res.send("User profile updated")
}
const deleteUserProfile=(req,res)=>{
    res.send("User profile deleted")
}
 module.exports={
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}