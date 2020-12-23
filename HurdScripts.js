
var myTimer = setInterval(traceIt, 34);

var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;
var timed = 0;


function traceIt(){
    var can = document.getElementById("myCanvas2");
    var cantx = can.getContext("2d");
    cantx.lineWidth = 1;
    cantx.strokeStyle = 'white'
    if(timed <1){
            cantx.fillStyle = '#333';
            cantx.fillRect(0, 0, 60, 40);
            cantx.beginPath();
    }
    if(timed<5){
            cantx.moveTo(x,y);
            x-=0.8;
            y-=1.4;
            cantx.lineTo(x,y);
            cantx.stroke();
            timed++;
        }
        if(timed>=5 && timed<=15){
            cantx.moveTo(x,y);
            x-=0.6;
            y+=2;
            cantx.lineTo(x,y);
            cantx.stroke();
            timed++;
        }
        if(timed>15 && timed <=30){
            cantx.moveTo(x,y);
            x+=2.2;
            y-=.9;
            cantx.lineTo(x,y);
            cantx.stroke();
            timed++;
        }
        
        if(timed>30 && timed<=37){
            cantx.moveTo(a,b);
            a+=0;
            b+=2.5;
            cantx.lineTo(a,b);
            cantx.stroke();
            timed++;
        }
        if(timed>37 && timed<=44){
            cantx.moveTo(c,d);
            c+=0;
            d+=2.5;
            cantx.lineTo(c,d);
            cantx.stroke();
            timed++;
            
        }
        if(timed >= 44 && timed<=55 ){
            timed++;
        }
        if(timed >= 55){
            timed++;
            if(timed>=65){
                x = 30;
                y = 17;
                a = 37;
                b = 17;
                c = 43;  
                d = 16;
                timed = 0;
            }
        }
}
//Ecma for game movements
var myLeftPos;
var moveLeft;
var elem;

function myMove() {
    drawArrows();
    elem = document.getElementById("myAnimation");
    var pos = 0;
    var arrows = document.getElementById("arrows");
    arrows.style.left = 10 + 'px';
    arrows.style.top = 400 + 'px';
    var shoot = document.getElementById("shoot");
    shoot.style.left = 240 + 'px';
    shoot.style.top = 400 + 'px';
    var id = setInterval(frame, 5);
    function frame() {
      if (pos >= 300) {
        clearInterval(id);
      } else {
        pos+=3; 
        elem.style.left = pos + 'px'; 
        myLeftPos = pos;
      }
    }
  }

 function moveJetLeft(){
    moveLeft = setInterval(shiftLeft,10);
 }
 function shiftLeft(){
    if(myLeftPos>2){
    myLeftPos-=3;
    elem.style.left = myLeftPos + 'px';
    }
 }
 function moveJetRight(){
    moveRight = setInterval(shiftRight,10);
 }
 function shiftRight(){
    if(myLeftPos<300){
    myLeftPos+=3;
    elem.style.left = myLeftPos + 'px';
    }
 }
 function stopLeftMove(){
     clearInterval(moveLeft);
 }
 function stopRightMove(){
    clearInterval(moveRight);
 }
 //will have to build array of shots
 var allShots = [];
 var shotID = "start";
 function shoot(){
     //unused code
     switch(shotID){

        case("start"): shotID = "a";
                        break;

        case("a"): shotID = "b";
                    break;
        case("b"): shotID = "c";
                    break;
        default: shotID = "start";
                    break;
     }
     allShots.push(shotID);
     //unused above

     
     var myContainer = document.getElementById("myContainer");
     var myShot = document.createElement("img");
     myShot.src = 'theShot.png';
     myShot.id = "myShot";
     myContainer.appendChild(myShot);
     myShot.style.top = 340 + 'px';
     var myJet = document.getElementById("myAnimation").style.left;
     var myJetCenter = myJet.substr(0,3);
     myJetCenter = parseInt(myJetCenter) + 20; 
     myShot.style.left = myJetCenter + 'px';
     var posit = 340;
     var thisShot = setInterval(function(){
         if(posit >= -20){
             posit -= 2;
             myShot.style.top = posit + 'px';
         }else{
             clearInterval(thisShot);
         }
     }, 5);
 }
 
function drawArrows(){
    var can = document.getElementById("myLeftArrow");
    var cant = can.getContext("2d");
    cant.lineWidth = 1;
    cant.strokeStyle = 'black';
    cant.moveTo(5,25);
    cant.lineTo(40,5);
    cant.stroke();
    cant.lineTo(40,45);
    cant.stroke();
    cant.lineTo(5,25);
    cant.stroke();

    var can = document.getElementById("myRightArrow");
    var cant = can.getContext("2d");
    cant.lineWidth = 1;
    cant.strokeStyle = 'black';
    cant.moveTo(45,25);
    cant.lineTo(10,5);
    cant.stroke();
    cant.lineTo(10,45);
    cant.stroke();
    cant.lineTo(45,25);
    cant.stroke();


}