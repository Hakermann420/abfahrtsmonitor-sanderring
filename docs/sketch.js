function setup() {
    var myCanvas = createCanvas(window.innerWidth*0.33, window.innerHeight*0.9);
    myCanvas.parent("analog");
    angleMode(DEGREES);
    frameRate(30)
}

var run = 0;
var secswitch = false;
var secsame = false;

function draw() {
    
    translate(window.innerWidth*0.33*0.5, window.innerHeight*0.5*0.9);
    clear()
    rotate(-90);
  
    let fac = (innerWidth*0.75)/900;

    let hr = hour();
    let mn = minute();
    let sc = second();

    let millis = (String)(Date.now()).substring(10,13);


    strokeWeight(8*fac);
    stroke(255);

    noFill();
    let secondAngle = map(sc*10+millis/100, 0, 600, 0, 360);
    
    if((int)((secondAngle*5)%360) == (int) (secondAngle) && run > 1) {

        if(secswitch){
            secswitch = false;
        } else{
            secswitch = true;
        }
        run = 0;
        if(!secswitch){
            arc(0, 0, 300*fac, 300*fac, 0, 0);
        }
    } else {
        arc(0, 0, 300*fac, 300*fac, !secswitch ? (secondAngle*5)%360 : secondAngle, secswitch ? (secondAngle*5)%360 : secondAngle);
    }


    run++;
  
    stroke(255);
    let minuteAngle = map((mn+sc/60)*10, 0, 600, 0, 360);
  
    stroke(255);
    let hourAngle = map((hr+mn/60)*10, 0, 120, 0, 360);
  
    push();
    rotate(secondAngle);
    stroke(255);
    pop();
  
    push();
    rotate(minuteAngle);
    stroke(255);
    line(0, 0, 100*fac, 0);
    pop();
  
    push();
    rotate(hourAngle);
    stroke(255);
    line(0, 0, 66*fac, 0);
    pop();
}