const fs=require('fs');
const path=require('path');
const {promisify}=require('util');

const readdir=promisify(fs.readdir);
const copyFile=promisify(fs.copyFile);


async function revertFile(commitId) {
   const repoPathh=path.resolve(process.cwd(),".apnaGit");
   const commitsPath=path.join(repoPathh,"commits");
   try{
    const commitDir=path.join(commitsPath,commitId);
    const files=await readdir(commitDir);
    const parentDir=path.resolve(repoPathh,"..");
    for(const file of files){
        const srcPath=path.join(commitDir,file);
        const destPath=path.join(parentDir,file);
        await copyFile(srcPath,destPath);
    }
    console.log(`Reverted to commit ${commitId}`);
   }catch(err){
    console.error("unable to revert commit:",err);
   }
}
module.exports = { revertFile }