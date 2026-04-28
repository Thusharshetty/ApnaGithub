const createIssue = (req, res) => {
    res.send("Issue created")
}
const updateIssueById = (req, res) => {
    res.send("Issue updated by ID")
}
const deleteIssueById = (req, res) => {
    res.send("Issue deleted by ID")
}
const getAllIssues = (req, res) => {
    res.send("All issues retrieved")
}
const getIssueById = (req, res) => {
    res.send("Issue retrieved by ID")
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}