const express = require('express');
const controllers=require("../controllers/userController");
const userRouter=express.Router();

userRouter.get("/allUsers",controllers.getAllUsers);
userRouter.post("/signup",controllers.signup);
userRouter.post("/login",controllers.login);
userRouter.get("/userProfile/:id",controllers.getUserProfile);
userRouter.put("/updateProfile/:id",controllers.updateUserProfile);
userRouter.delete("/deleteProfile/:id",controllers.deleteUserProfile);

module.exports=userRouter;