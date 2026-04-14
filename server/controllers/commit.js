
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitFile(message) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagingPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");
    try {
        const commitId = uuidv4();
        const commitDir = path.join(commitPath, commitId);
        await fs.mkdir(commitDir, { recursive: true });

        const files = await fs.readdir(stagingPath);
        for (const file of files) {
            const srcPath = path.join(stagingPath, file);
            const destPath = path.join(commitDir, file);
            await fs.copyFile(srcPath, destPath);
        }

        const commitInfo = {
            message: message,
            timestamp: new Date().toISOString(),
        }
        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify(commitInfo));
        console.log(`Committed ${commitId} with message: ${message}`);
    } catch (e) {
        console.error("Error while committing file", e);
    }
}
module.exports = { commitFile }