noseX = 0;
noseY = 0;

function preload() {
    mustacheImg = loadImage('https://i.postimg.cc/3rCPRh8s/images-removebg-preview.png');
}

function setup() {
    canvas = createCanvas(300,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        console.log("Nose's X position is " + noseX);
        console.log("Nose's Y position is " + noseY);
    }
}

function modelLoaded() {
    console.log("Model has been loaded!");
}

function draw() {
    image(video, 0, 0, 300, 300);
    image(mustacheImg, noseX - 40, noseY, 80, 50)
}

function take_snapshot() {
    save('myMustacheFilteredSelfie.png');
}