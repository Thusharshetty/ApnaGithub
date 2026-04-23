const fs = require("fs").promises;
const path = require("path");
const https = require("https");
const cloudinary = require("../config/cloudinary");

// Helper function to download file from URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = require("fs").createWriteStream(dest);

    https.get(url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function pullFile() {
  try {
    //  Get local repo path
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    //  Get all files from Cloudinary
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "github-clone/repo-files/commits/",
      max_results: 100,
    });

    const files = result.resources;

    //  Loop through all files
    for (const file of files) {
      const publicId = file.public_id;

      // Example:
      // github-clone/repo-files/commits/commit1/file.txt
      const parts = publicId.split("/");

      const commitDir = parts[parts.length - 2];
      const fileName = parts[parts.length - 1];

      //  Create local commit folder
      const localCommitPath = path.join(commitsPath, commitDir);
      await fs.mkdir(localCommitPath, { recursive: true });

      //  Download file
      const fileUrl = file.secure_url;
      const localFilePath = path.join(localCommitPath, fileName);

      await downloadFile(fileUrl, localFilePath);

      console.log(`Downloaded: ${fileName}`);
    }

    console.log(" All commits pulled from Cloudinary");
  } catch (err) {
    console.error(" Error while pulling:", err);
  }
}

module.exports = { pullFile };