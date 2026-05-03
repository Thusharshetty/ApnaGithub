const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const {MongoClient}=require("mongodb");
require("dotenv").config();
var ObjectId = require('mongodb').ObjectId;

const uri=process.env.MONGODB_URL;

let client;

async function connectClient() {
    if(!client){
         client = new MongoClient(uri); 
        await client.connect();
    }
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
        res.status(201).json({message:"User created successfully",token,userId:result.insertedId})

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

const getAllUsers= async (req,res)=>{
   try{
     await connectClient();
     const db=client.db("githubClone");
     const userCollection=db.collection("users");
      const users=await userCollection.find({}).toArray();
    res.status(200).json(users)

   }catch(error){
    console.error("Error fetching users:",error);
    res.status(500).json({message:"Internal server error"})
   }
}
const getUserProfile= async (req,res)=>{
    const currentId=req.params.id;
    try{
        await connectClient();
     const db=client.db("githubClone");
     const userCollection=db.collection("users");
     const user=await userCollection.findOne({_id:new ObjectId(currentId)});
     if(!user){
        return res.status(404).json({message:"User not found"})
     }      
     res.status(200).json(user)

    }catch(error){
        console.error("Error fetching user profile:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const updateUserProfile=  async (req,res)=>{
    const currentId=req.params.id;
    const {email,password}=req.body;
    try{
        await connectClient();
     const db=client.db("githubClone");
     const userCollection=db.collection("users");
     let updateFields={};
     if(email){
        updateFields.email=email;
     }
    if(password){
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        updateFields.password=hashedPassword;
    }
    const result=await userCollection.findOneAndUpdate({
        _id:new ObjectId(currentId)
    },{$set:updateFields},{
        returnDocument:"after"
    });
    if(!result){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"Profile updated successfully",user:result.value})
    }catch(error){
        console.error("Error updating user profile:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const deleteUserProfile=async (req,res)=>{
   const currentId=req.params.id;
   try{
    await connectClient();
     const db=client.db("githubClone");
     const userCollection=db.collection("users");
     const result=await userCollection.deleteOne({_id:new ObjectId(currentId)});
     if(result.deletedCount===0){
        return res.status(404).json({message:"User not found"})
     }
        res.status(200).json({message:"User profile deleted successfully"})
   }catch(error){
    console.error("Error deleting user profile:",error);
    res.status(500).json({message:"Internal server error"})
   }
}
 module.exports={
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}