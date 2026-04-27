const express = require('express');
const controllers=require("../controllers/repoController");
const repoRouter=express.Router();

repoRouter.get("/repo/all",controllers.getAllRepositories);
repoRouter.post("/repo/create",controllers.createRepository);
repoRouter.get("/repo/:id",controllers.fetchRepositoryById);
repoRouter.get("/repo/:name",controllers.fetchRepositoryByName);
repoRouter.get("/repo/:userId",controllers.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id",controllers.updateRepositoryById);
repoRouter.patch("/repo/toggle/:id",controllers.toggleVisibilityById);
repoRouter.delete("/repo/delete/:id",controllers.deleteRepositoryById);

module.exports=repoRouter;