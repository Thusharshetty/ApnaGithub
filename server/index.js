const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const {Server}= require("socket.io");

const { initRepo } = require("./controllers/init");
const { addFile } = require("./controllers/add");
const { commitFile } = require("./controllers/commit");
const { pushFile } = require("./controllers/push");
const { pullFile } = require("./controllers/pull");
const { revertFile } = require("./controllers/revert");






yargs(hideBin(process.argv))
.command("start","Starts the server",{}, startServer)
.command("init", "Initialize a new repository", {}, initRepo)
    .command("add <file>", "Add a file to the repository", (yargs) => {
        yargs.positional("file",
            {
                describe: "File to add to the staging area",
                type: "string"
            }
        )
    }, (argv) => addFile(argv.file))
    .command("commit <message>", "Commit the staged files", (yargs) => {
        yargs.positional("message",
            {
                describe: "Commit message",
                type: "string"
            }
        )
    }, (argv) => commitFile(argv.message))
    .command("push", "Push the committed files to the remote repository", {}, pushFile)
    .command("pull", "Pull the committed files from the remote repository", {}, pullFile)
    .command("revert <commitId>", "Revert the last commit", (yargs) => {
        yargs.positional("commitId",
            {
                describe: "Commit ID to revert",
                type: "string"
            }
        )
    }, (argv) => revertFile(argv.commitId))
    .demandCommand(1, "Please provide a command")
    .help()
    .argv;

function startServer() {
    const app = express();
    const port= process.env.PORT || 3000;
    app.use(bodyParser.json());
    app.use(express.json());
    const monogoUrl= process.env.MONGODB_URL;
    mongoose
    .connect(monogoUrl)
    .then(()=>{console.log("Connected to MongoDB!!")})
    .catch((err)=>{console.log("Unable to connect", err)});
    app.use(cors(({origin: "*"})));
}