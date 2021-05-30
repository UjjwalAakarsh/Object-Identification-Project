objects=[]
img=""
status=""
function preload(){
img=loadImage("bedroom.jpeg")
}
function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    objectdetector=ml5.objectDetector("cocossd",modelLoaded)
}

function modelLoaded(){
    console.log("Model Loaded")
    document.getElementById("status").innerHTML="Status: Detecting Object "
    status=true
    objectdetector.detect(img,gotResults)
}

function draw(){
image(img,0,0,600,400)
if (status != "") {
    for (let i = 0; i < objects.length; i++) {
        accuracy=floor(objects[i].confidence*100)+"%"
        objectname=objects[i].label
        x=objects[i].x
        y=objects[i].y
        width=objects[i].width
        height=objects[i].heigh
        fill("red")
        text(objectname+" " +accuracy,x,y)
        stroke("red")
        noFill()
        rect(x,y+5,width,height)
        document.getElementById("status").innerHTML="Status:Objects Identified"
    }
}
}
function gotResults(error,results){
    if (error) {
        console.log(error)
    
    }
    else{
        console.log(results)
        objects=results
    }
    }