const path = require('path');
const os = require('os');
const fs = require('fs');

const folder = process.argv[2];

const workingDir = path.join(os.homedir(),'Pictures', folder);

if (!folder || !fs.existsSync(workingDir)) {
    console.error('input a folder name in Pictures');
    return;
}
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const dupliDir = path.join(workingDir, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(dupliDir) && fs.mkdirSync(dupliDir);

fs.promises.readdir(workingDir).then(files=>{
    files.forEach(file=>{
        if(isVideoFile(file)){
            move(file, videoDir);
        }
        
        else if (isCaptured(file)) {
            move(file, capturedDir);
        }
        
        else if (isDuplicatedFile(file)){
            move(file, dupliDir);
        }
    })
})


function move(file, directory){
    console.info(`move ${file} to ${directory}`);
    const oldpath = path.join(workingDir, file);
    const newpath = path.join(directory, file);
    fs.promises.rename(oldpath, newpath).catch(console.error);
}

function isVideoFile(file){
    const regExp = /(mp4|mov)$/gm;
    const match = file.match(regExp);
    return !!match;
}

function isCaptured(file){
    const regExp = /(png|aaa)$/gm;
    const match = file.match(regExp);
    return !!match;
}

function isDuplicatedFile(file){
    const regExp = /^IMG_[^E]/gm;
    const match = file.match(regExp);
    return !!match;
}