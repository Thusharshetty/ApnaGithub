const mongoose= require("mongoose");
const Repository =require("../models/repoModel");
const User =require("../models/userModel");
const Issue =require("../models/issueModel");

const createIssue = async(req, res) => {
    const {id}=req.params;
    const {title, description}=req.body;
    try{
        if(!title){
            return res.status(400).json({message:"Issue title is required"})
        }
        const repository= await Repository.findById(id);
        if(!repository){
            return res.status(404).json({message:"Repository not found"})
        }
        const newIssue=new Issue({
            title,
            description,
            repository:repository._id
        });
        const result= await newIssue.save();
        res.status(201).json({message:"Issue created successfully",issueId:result._id})
    }catch(error){
        console.error("Error creating issue:", error);
        res.status(500).json({message:"Internal server error"})
    }
}
const updateIssueById = async(req, res) => {
   const {id}=req.params;
   const {title, description,status}=req.body;
   try{
    const issue= await Issue.findById(id);
    if(!issue){
        return res.status(404).json({message:"Issue not found"})
    }
    if(title) issue.title=title;
    if(description) issue.description=description;
    if(status) issue.status=status;
    await issue.save();
    res.status(200).json({message:"Issue updated successfully"})
   }catch(error){
    console.error("Error updating issue:", error);
    res.status(500).json({message:"Internal server error"})
   }
}
const deleteIssueById = async(req, res) => {
    const {id}=req.params;
    try{
        const issue= await Issue.findByIdAndDelete(id);
        if(!issue){
            return res.status(404).json({message:"Issue not found"})
        }
        res.status(200).json({message:"Issue deleted successfully"})
    }catch(error){
        console.error("Error deleting issue:", error);
        res.status(500).json({message:"Internal server error"})
    }
}
const getAllIssues = async(req, res) => {
    const {id}=req.params;
    try{
        const issues= await Issue.find({repository:id}).populate("repository");
        if(!issues || issues.length===0){
            return res.status(404).json({message:"No issues found for this repository"})
        }
        res.status(200).json(issues)
    }catch(error){
        console.error("Error fetching issues:", error);
        res.status(500).json({message:"Internal server error"})
    }
}
const getIssueById = async(req, res) => {
    const {id}=req.params;
    try{
        const issue= await Issue.findById(id).populate("repository");
        if(!issue){
            return res.status(404).json({message:"Issue not found"})
        }   
        res.status(200).json(issue)
    }catch(error){
        console.error("Error fetching issue:", error);
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}