const createRepository=(req,res)=>{
    res.send("Repository created")
}
const getAllRepositories=(req,res)=>{
    res.send("All repositories")
}
const fetchRepositoryById=(req,res)=>{
    res.send("Repository fetched by ID")
}
const fetchRepositoryByName=(req,res)=>{
    res.send("Repository fetched by name")
}
const fetchRepositoriesForCurrentUser=(req,res)=>{
    res.send("Repository fetched by current user")
}
const updateRepositoryById=(req,res)=>{
    res.send("Repository updated by ID")
}
const toggleVisibilityById=(req,res)=>{
    res.send("Repository visibility toggled by ID")
}
const deleteRepositoryById=(req,res)=>{
    res.send("Repository deleted by ID")
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