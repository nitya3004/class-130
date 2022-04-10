leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreleftWrist=0;
scorerightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
image(video,0,0,600,500);

fill('#ff0000');
stroke('#ff0000');
if (scorerightWrist>0.2){
    circle(rightWristx,rightWristy,20);
    if (rightWristy>0 && rightWristy<=100){
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }

    else if (rightWristy>100 && rightWristy>=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }

    else if (rightWristy>200 && rightWristy>=300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightWristy>300 && rightWristy>=400){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }

    else if (rightWristy>400){
        document.getElementById("speed").innerHTML="speed = 2.5x";
        song.rate(2.5);
    }
}


if (scoreleftWrist>0.2){
circle(leftWristx,leftWristy,20);
InNumberleftWristy=Number(leftWristy);
removedecimals=floor(InNumberleftWristy);
volume=removedecimals/500;
document.getElementsById("volume").innerHTML="volume "+volume;
song.setVolume(volume);
}

}
song="";
function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('poseNet is Initialized');
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist= "+scoreleftWrist);


        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scorerightWrist= "+scorerightWrist);


        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx= "+leftWristx +"leftWrist y = "+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx= "+rightWristx +"rightWrist y = "+rightWristy);
    }
}