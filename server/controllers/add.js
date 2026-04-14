
const fs = require("fs").promises;
const path = require("path");


async function addFile(filePath) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagingPath = path.join(repoPath, "staging");
    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(filePath);
        const destPath = path.join(stagingPath, fileName);
        await fs.copyFile(filePath, destPath);
        console.log(`Added ${fileName} to staging area`);

    } catch (e) {
        console.error("Error while adding file", e);
    }
}
module.exports = { addFile }