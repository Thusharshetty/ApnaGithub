const mongoose= require("mongoose");
const Repository =require("../models/repoModel");
const User =require("../models/userModel");
const Issue =require("../models/issueModel");

const createRepository= async(req,res)=>{
    const {owner,name,issues,content,description,visibility}= req.body;
   try{
    if(!name){
        return res.status(400).json({message:"Repository name is required"});
    }
    if(!mongoose.Types.ObjectId.isValid(owner)){
        return res.status(400).json({message:"Invalid user ID"});
    }
    const newRepository= new Repository({
        name,
        description,
        content,
        visibility,
        owner,
        issues
    });
    const result=await newRepository.save();
    res.status(201).json({message:"Repository created successfully",repositoryId:result._id})
   }catch(error){
    console.error("Error creating repository:", error);
    res.status(500).json({message:"Error creating repository",error:error.message})
   }
}
const getAllRepositories= async(req,res)=>{
   try{
    const repository= await Repository.find({}).populate("owner").populate("issues");
    res.status(200).json(repository)

   }catch(error){
    console.error("Error fetching repositories:",error);
    res.status(500).json({message:"Internal server error"})
   }
}
const fetchRepositoryById= async(req,res)=>{
    const repoId=req.params.id;
    try{
        const repository= await Repository.findById(repoId).populate("owner").populate("issues");
        if(!repository){
            return res.status(404).json({message:"Repository not found"})
        }
        res.status(200).json(repository)
    }catch(error){
        console.error("Error fetching repository by ID:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const fetchRepositoryByName= async(req,res)=>{
    const repoName=req.params.name;
    try{
       
        const repository= await Repository.findOne({name:repoName}).populate("owner").populate("issues");
        if(!repository){
            return res.status(404).json({message:"Repository not found"})
        }
        res.status(200).json(repository)
    }catch(error){
        console.error("Error fetching repository by name:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const fetchRepositoriesForCurrentUser= async(req,res)=>{
   const userId=req.params.userId;
   try{
    const repositories= await Repository.find({owner:userId}).populate("owner").populate("issues");
    if(!repositories || repositories.length===0){
        return res.status(404).json({message:"No repositories found for this user"})
    }
    res.status(200).json({message:"Repositories found", repositories})
   }catch(error){
    console.error("Error fetching repositories for user:",error);
    res.status(500).json({message:"Internal server error"})
   }
}
const updateRepositoryById= async   (req,res)=>{
    const {id}= req.params;
    const {description,content}=req.body;
    try{
        const repository= await Repository.findById(id);
        if(!repository){
            return res.status(404).json({message:"Repository not found"})
        }
        repository.description=description || repository.description;
        repository.content.push(content);
        const updatedRepository= await repository.save();
        res.status(200).json({message:"Repository updated successfully",repository:updatedRepository})
    }catch(error){
        console.error("Error updating repository:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const toggleVisibilityById= async(req,res)=>{
    const {id}= req.params;
    try{
        const repository= await Repository.findById(id);
        if(!repository){
            return res.status(404).json({message:"Repository not found"})
        }
        repository.visibility= !repository.visibility;
        const updatedRepository= await repository.save();
        res.status(200).json({message:"Repository visibility toggled successfully",repository:updatedRepository})
    }catch(error){
        console.error("Error during toggling repository visibility:",error);
        res.status(500).json({message:"Internal server error"})
    }
}
const deleteRepositoryById= async(req,res)=>{
   
    const{id}=req.params;
    try{
     const repository= await Repository.findByIdAndDelete(id);
        if(!repository){
            return res.status(404).json({message:"Repository not found"})
        }
        res.status(200).json({message:"Repository deleted successfully"})

    }catch(error){
        console.error("Error during deleting repository:",error);
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports={
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById
}