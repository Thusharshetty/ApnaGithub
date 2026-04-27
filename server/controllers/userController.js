const getAllUsers=(req,res)=>{
    res.send("All users")
}

const signup=(req,res)=>{
    res.send("User signed up")
}

const login=(req,res)=>{
    res.send("User logged in")
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