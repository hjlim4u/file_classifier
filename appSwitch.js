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
        switch (path.extname(file)){
            case ".mp4":
            case ".mov":
                move(file, videoDir);
                break;
            case ".png":
            case ".aaa":
                move(file, capturedDir);
                break;
            default:
                if (file.startsWith('IMG_E')){
                    break;
                }
                else if (file.startsWith('IMG_')){
                    move(file, dupliDir);
                    break;
                }
                break;
        }
        
    })
})


function move(file, directory){
    console.info(`move ${file} to ${directory}`);
    const oldpath = path.join(workingDir, file);
    const newpath = path.join(directory, file);
    fs.promises.rename(oldpath, newpath).catch(console.error);
}

