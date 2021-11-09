const path = require('path');
const os = require('os');
const fs = require('fs');

const folder = process.argv[2];
//작업폴더 설정
const workingDir = path.join(os.homedir(),'Pictures', folder);
//입력한 디렉토리가 존재하지 않을 경우 에러

if (!folder || !fs.existsSync(workingDir)) {
    console.error('input a folder name in Pictures');
    return;
}
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const dupliDir = path.join(workingDir, 'duplicated');

//파일 디렉토리 생성
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(dupliDir) && fs.mkdirSync(dupliDir);

//작업폴더안의 파일들 분류
fs.promises.readdir(workingDir).then(files=>{
    files.forEach(file=>{
        if(file.endsWith('.mp4') || file.endsWith('.mov')){
            move(file, videoDir);
        }
        
        else if (file.endsWith('.aaa') || file.endsWith('.png')){
            move(file, dupliDir);
        }
        else if (!file.startsWith('IMG_E') && file.startsWith('IMG_')) {
            move(file, capturedDir);
        }
        
    })
})


function move(file, directory){
    console.info(`move ${file} to ${directory}`);
    const oldpath = path.join(workingDir, file);
    const newpath = path.join(directory, file);
    fs.promises.rename(oldpath, newpath).catch(console.error);
}