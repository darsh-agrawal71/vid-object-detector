video = "";
status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (let i = 0; i < objects.length; i++) {
            const o = objects[i];
            document.getElementById("status").innerHTML =
                "status: objects detected";
            document.getElementById("n").innerHTML =
                "no. of objects detected: " + objects.length;

            fill("red");
            percent = floor(o.confidence * 100);
            text(o.label + " " + percent + "%", o.x + 15, o.y + 15);
            noFill();
            stroke("red");
            rect(o.x, o.y, o.width, o.height);
        }
    }
}

function gotResult(error, results) {
    console.log(error || results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting object";
}

function modelLoaded() {
    console.log("model loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
