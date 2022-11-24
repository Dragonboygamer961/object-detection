var my_status = "";
var objects = [];

var x = 0;
var y = 0;
var width = 0;
var height = 0;
var object_name = "";
var accuracy = 0;


function preload() {
  //  dog_img = loadImage("dog_cat.jpg");
}

function setup() {

    canvas = createCanvas(500, 500);
    background("marigold");
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    document.getElementById("Status").innerHTML = "Status : Loading Model";
    objectDetector = ml5.objectDetector("cocossd", model_loaded);
}





function draw() {
    image(video, 0, 0, 500, 500);
    if (my_status != "") {
        objectDetector.detect(video, got_results);
        for (var i = 0; i < objects.length; i++){

            x= objects[i].x;

            y = objects[i].y;
            document.getElementById("Count_objects").innerHTML = "No. of the Objects Detected : " + objects.length;
            accuracy = (objects[i].confidence *100).toFixed(2) ;
            obj_name = objects[i].label;
    
    
           height = objects[i].height;
           width = objects[i].width;
    
            //rect(x,y, width,height);
        
            noFill();
            stroke("maroon");
            rect(x,y,width,height);
            fill("gold");
            //text("text", x, y);
            text(obj_name + " " + accuracy + "%", x,y);
      

        }
    }

}

function model_loaded() {
    console.log("your model is loaded");
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
    objectDetector.detect(video, got_results);
}


function got_results(error, results) {
    if (error) {
        console.error(error); 
    } else {
        my_status = true;
        console.log(results);
        objects = results;
        document.getElementById("Status").innerHTML = "Status : Objects Detected";
    }
}