var timed = 0;
var windowWidth = 0;
var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;


function main() {


    drawLogo();
    siteAnimate();

    windowWidth = window.screen.width;

    var rightArrow = document.getElementById("rightArrow");
    var leftArrow = document.getElementById("leftArrow");

    var carouselImage = document.getElementById("myCarouselImage");
    let cILeft = carouselImage.style.left;
    let pIndex = cILeft.indexOf("p");
    cILeft = cILeft.substr(0, pIndex);

    document.getElementById("debugger").innerHTML = "WINDOW " + windowWidth;


    leftArrow.style.left = cILeft + "px";
    if (windowWidth > 700) {
        rightArrow.style.left = ((windowWidth / 2) + 280) + "px";

    } else {
        rightArrow.style.left = ((windowWidth / 2) + 120) + "px";
    }

    windowWidth = window.screen.width;
    document.getElementById("neonContainer").style.display = "block";
    document.getElementById("neonLine").style.display = "block";
    var randomBlink = setInterval(() => {
        var allowBlink = Math.random();
        if (allowBlink < .5) {
            var blinkTl = new TimelineMax();
            var topText = document.getElementById("topNeon");
            var bottomText = document.getElementById("bottomNeon");
            blinkTl.fromTo(topText, 0.1, { opacity: "1" }, { opacity: "0.2" })
                .fromTo(topText, 0.1, { opacity: "0.2" }, { opacity: "1" })
                .fromTo(bottomText, 0.1, { opacity: "1" }, { opacity: "0.2" })
                .fromTo(bottomText, 0.3, { opacity: "0.2" }, { opacity: "1" });
        }
    }, 4000);

    var constantBlink = setInterval(() => {
        var blinkWarn = new TimelineMax();
        var warning = document.getElementById("warning");
        if (warning.style.opacity === "0") {
            blinkWarn.fromTo(warning, .7, { opacity: "0" }, { opacity: "1" });
        } else {
            blinkWarn.fromTo(warning, .7, { opacity: "1" }, { opacity: "0" });
        }
    }, 1000)
}

//var processImage = document.getElementById("devProc");
var procNum = 0;
var arrowCounter = 0;

var devProc = setInterval(() => {
    var rightArrow = document.getElementById("rightArrow");

    procNum++;
    arrowCounter++;
    /*
        if (procNum === 0) {
            processImage.src = "imgs/Spot/DevProcess2.png";
        } else if (procNum === 1) {
            processImage.src = "imgs/Spot/DevProcess2inc1.jpg";
        } else if (procNum === 2) {
            processImage.src = "imgs/Spot/DevProcess2inc2.jpg";
        } else if (procNum === 3) {
            processImage.src = "imgs/Spot/DevProcess2inc3.jpg";
        } else {
            procNum = 0;
        }
    */
    switch (parseInt(arrowCounter)) {
        case (31):
            rightArrow.src = "imgs/Spot/r1.png";
            break;
        case (32):
            rightArrow.src = "imgs/Spot/r2.png";
            break;
        case (33):
            rightArrow.src = "imgs/Spot/r3.png";
            break
        case (34):
            rightArrow.src = "imgs/Spot/r4.png";
            arrowCounter = 0;
            break;
    }
}, 150);


function siteAnimate() {
    var openTl = new TimelineMax();
    var topText = document.getElementById("topNeon");
    var bottomText = document.getElementById("bottomNeon");
    setTimeout(function() {
        openTl.fromTo(topText, 0.1, { opacity: "0" }, { opacity: ".3" })
            .fromTo(topText, 0.1, { opacity: ".3" }, { opacity: "0" })
            .fromTo(topText, 0.1, { opacity: "0" }, { opacity: ".5" })
            .fromTo(topText, 0.1, { opacity: ".5" }, { opacity: "0" })
            .fromTo(topText, 1, { opacity: "0" }, { opacity: "1" })
            .fromTo(bottomText, 0.2, { opacity: "0.6" }, { opacity: "0" })
            .fromTo(bottomText, 0.1, { opacity: "0" }, { opacity: "1" })
            .fromTo(bottomText, 0.1, { opacity: "1" }, { opacity: "1" })
            .fromTo(bottomText, 1, { opacity: "0" }, { opacity: "1" });
    }, 1000);

}
//Banner
function drawLogo() {
    var myVideo = document.getElementById("spotVideo");
    var can = document.getElementById("myCanvas2");
    var cantx = can.getContext("2d");
    cantx.lineWidth = 1;
    cantx.strokeStyle = 'white';


    var myTimer = setInterval(function() {

        if (timed < 1) {
            cantx.fillStyle = '#333';
            cantx.fillRect(0, 0, 60, 40);
            cantx.beginPath();
        }
        if (timed < 5) {
            cantx.moveTo(x, y);
            x -= 0.8;
            y -= 1.4;
            cantx.lineTo(x, y);
            cantx.stroke();
            timed++;
        }
        if (timed >= 5 && timed <= 15) {
            cantx.moveTo(x, y);
            x -= 0.6;
            y += 2;
            cantx.lineTo(x, y);
            cantx.stroke();
            timed++;
        }
        if (timed > 15 && timed <= 30) {
            cantx.moveTo(x, y);
            x += 2.2;
            y -= .9;
            cantx.lineTo(x, y);
            cantx.stroke();
            timed++;
        }

        if (timed > 30 && timed <= 37) {
            cantx.moveTo(a, b);
            a += 0;
            b += 2.5;
            cantx.lineTo(a, b);
            cantx.stroke();
            timed++;
        }
        if (timed > 37 && timed <= 44) {
            cantx.moveTo(c, d);
            c += 0;
            d += 2.5;
            cantx.lineTo(c, d);
            cantx.stroke();
            timed++;

        }
        if (timed >= 44 && timed <= 55) {
            timed++;
        }
        if (timed >= 55) {
            timed++;
            if (timed >= 65) {
                x = 30;
                y = 17;
                a = 37;
                b = 17;
                c = 43;
                d = 16;
                timed = 0;
            }
        }
    }, 34);
}
//Banner above

var onresize = function(e) {
    //note i need to pass the event as an argument to the function
    width = e.target.outerWidth;
    windowWidth = width;
    height = e.target.outerHeight;

    var myVideo = document.getElementById("spotVideo");
    var rightArrow = document.getElementById("rightArrow");
    var leftArrow = document.getElementById("leftArrow");
    var carouselImage = document.getElementById("myCarouselImage")

    document.getElementById("debugger").innerHTML = width;

    if (width <= 600) {
        myVideo.style.width = width + "px";
        rightArrow.style.left = (width - 80) + "px";
        carouselImage.style.width = (width - 10) + "px";
    } else {
        rightArrow.style.left = ((width / 2) + 250) + "px";
        leftArrow.style.left = ((width / 2) - 250) + "px";
    }
}
window.addEventListener("resize", onresize);



function loaded() {
    setTimeout(function() {
        document.getElementById("loading").style.display = "none";
        document.getElementById("myApp").style.display = "block";
    }, 700);
    main();
}