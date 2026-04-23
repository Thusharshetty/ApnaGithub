
// const fs = require("fs").promises;
// const path = require("path");
// const cloudinary = require("../config/cloudinary");

// async function pushFile() {
//     const repoPath = path.resolve(process.cwd(), ".apnaGit");
//     const commitpaths = path.join(repoPath, "commits");
//     try {
//         const commitDirs = await fs.readdir(commitpaths);
//         for (const commitDir of commitDirs) {
//             const commitPath = path.join(commitpaths, commitDir);
//             const files = await fs.readdir(commitPath);
//             for (const file of files) {
//                 const filePath = path.join(commitPath, file);
//                 await cloudinary.uploader.upload(filePath, {
//                     folder: `github-clone/repo-files/commits/${commitDir}`,
//                     resource_type: "auto",
//                 });
//             }
//         }
//         console.log("Pushed all files to remote repository");
//     } catch (e) {
//         console.error("Error while pushing file", e);
//     }
// }
// module.exports = { pushFile };

const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushFile() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        await s3.upload(params).promise();
      }
    }

    console.log("All commits pushed to S3.");
  } catch (err) {
    console.error("Error pushing to S3 : ", err);
  }
}

module.exports = { pushFile };