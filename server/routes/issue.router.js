const express = require('express');
const controllers=require("../controllers/issueController");
const issueRouter=express.Router();

issueRouter.get("/issue/all",controllers.getAllIssues);
issueRouter.post("/issue/create",controllers.createIssue);
issueRouter.get("/issue/:id",controllers.getIssueById);
issueRouter.put("/issue/update/:id",controllers.updateIssueById);
issueRouter.delete("/issue/delete/:id",controllers.deleteIssueById);

module.exports=issueRouter;