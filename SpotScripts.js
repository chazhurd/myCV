var timed = 0;
var windowWidth = 0;
var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;
var procNum = 0;
var arrowCounter = 0;
var imageIndex = 1;
var carouselMoving = true;
var carousel;
var moveCars = false;


function main() {

    drawLogo();
    siteAnimate();
    siteLayout();
    startCarousel();

}

function siteLayout() {

    document.getElementById("neonContainer").style.display = "block";
    document.getElementById("neonLine").style.display = "block";

}

function siteAnimate() {

    var openTl = new TimelineMax();
    var topText = document.getElementById("topNeon");
    var bottomText = document.getElementById("bottomNeon");
    windowWidth = window.screen.width;

    if (parseInt(windowWidth) < 550) {
        document.getElementById("spotVideo").style.width = windowWidth + "px";
    }
    if (parseInt(windowWidth) > 700) {
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
        }, 1000);




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
/*
var onresize = function(e) {
    width = e.target.outerWidth;
    windowWidth = width;
    height = e.target.outerHeight;

    var myVideo = document.getElementById("spotVideo");
    var rightArrow = document.getElementById("rArrow");
    var leftArrow = document.getElementById("lArrow");
    var carouselImage = document.getElementById("myCarouselImage")

    document.getElementById("debugger").innerHTML = windowWidth;

    if (width <= 700) {
        myVideo.style.width = width + "px";
        rightArrow.style.left = (width - 80) + "px";
        carouselImage.style.width = (width - 10) + "px";
    } else {
        rightArrow.style.left = ((width / 2) + 280) + "px";
        leftArrow.style.left = ((width / 2) - 350) + "px";
    }
}
window.addEventListener("resize", onresize);
*/



function loaded() {
    setTimeout(function() {
        document.getElementById("loading").style.display = "none";
        document.getElementById("myApp").style.display = "block";
        document.getElementById("spotFooter").style.display = "block";
    }, 700);
    main();
}

function startCarousel() {

    carousel = setInterval(() => {
            var rightArrow = document.getElementById("rightArrow");
            var carouselImage = document.getElementById("myCarouselImage");
            var processImage = document.getElementById("devProc");
            arrowCounter++;
            procNum++;

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
                    ++imageIndex;
                    switch (parseInt(imageIndex)) {
                        case (1):
                            carouselImage.src = "imgs/Spot/prod1.jpg";
                            break;
                        case (2):
                            carouselImage.src = "imgs/Spot/Problem1.jpg";
                            break;
                        case (3):
                            carouselImage.src = "imgs/Spot/Problem2.jpg";
                            break;
                        case (4):
                            carouselImage.src = "imgs/Spot/solution.jpg";
                            break
                        case (5):
                            carouselImage.src = "imgs/Spot/howitworks.jpg";
                            break;
                        case (6):
                            carouselImage.src = "imgs/Spot/dif1.jpg";
                            break;
                        case (7):
                            carouselImage.src = "imgs/Spot/dif2.jpg";
                            break
                        case (8):
                            carouselImage.src = "imgs/Spot/dif3.jpg";
                            break;
                        case (9):
                            carouselImage.src = "imgs/Spot/diff4.jpg";
                            break;
                        case (10):
                            carouselImage.src = "imgs/Spot/diff5.jpg";
                            break
                        case (11):
                            carouselImage.src = "imgs/Spot/diff6.jpg";
                            break;
                        case (12):
                            carouselImage.src = "imgs/Spot/Figma.png";
                            break;
                        case (13):
                            carouselImage.src = "imgs/Spot/mDev.png";
                            break
                        case (14):
                            carouselImage.src = "imgs/Spot/slack.png";
                            break;
                        case (15):
                            carouselImage.src = "imgs/Spot/GitHub.png";
                            imageIndex = 0;
                            break;
                    }

                    arrowCounter = 0;
                    break;
            }
        },
        150);
}

function carouselHint(event) {

    var x = event.clientX;
    var y = parseInt(event.clientY);
    var carouselTl = new TimelineMax();
    var hint = document.getElementById("carouselHint");
    hint.style.left = x + "px";
    hint.style.top = (y + 60) + "px";
    carouselTl.fromTo(hint, .7, { opacity: 0 }, { opacity: 1 });
    if (carouselMoving) {
        hint.innerHTML = "Click To Pause";
    } else {
        hint.innerHTML = "Click To Resume";
    }
}

function removeHint() {
    var carouselTl = new TimelineMax();
    var hint = document.getElementById("carouselHint");
    carouselTl.fromTo(hint, .7, { opacity: 1 }, { opacity: 0 });
}

function carouselLeft() {
    var leftArrow = document.getElementById("leftArrow");

    var carouselImage = document.getElementById("myCarouselImage");
    clearInterval(carousel);
    carouselMoving = false;

    if (imageIndex > 1) {
        imageIndex--;
    } else if (imageIndex === 1) {
        imageIndex = 15;
    }


    switch (parseInt(imageIndex)) {
        case (1):
            carouselImage.src = "imgs/Spot/prod1.jpg";
            break;
        case (2):
            carouselImage.src = "imgs/Spot/Problem1.jpg";
            break;
        case (3):
            carouselImage.src = "imgs/Spot/Problem2.jpg";
            break;
        case (4):
            carouselImage.src = "imgs/Spot/solution.jpg";
            break
        case (5):
            carouselImage.src = "imgs/Spot/howitworks.jpg";
            break;
        case (6):
            carouselImage.src = "imgs/Spot/dif1.jpg";
            break;
        case (7):
            carouselImage.src = "imgs/Spot/dif2.jpg";
            break
        case (8):
            carouselImage.src = "imgs/Spot/dif3.jpg";
            break;
        case (9):
            carouselImage.src = "imgs/Spot/diff4.jpg";
            break;
        case (10):
            carouselImage.src = "imgs/Spot/diff5.jpg";
            break
        case (11):
            carouselImage.src = "imgs/Spot/diff6.jpg";
            break;
        case (12):
            carouselImage.src = "imgs/Spot/Figma.png";
            break;
        case (13):
            carouselImage.src = "imgs/Spot/mDev.png";
            break
        case (14):
            carouselImage.src = "imgs/Spot/slack.png";
            break;
        case (15):
            carouselImage.src = "imgs/Spot/GitHub.png";
            break;
    }

    setTimeout(() => { leftArrow.src = "imgs/Spot/r1.png"; }, 100);
    setTimeout(() => { leftArrow.src = "imgs/Spot/r2.png"; }, 200);
    setTimeout(() => { leftArrow.src = "imgs/Spot/r3.png"; }, 300);
    setTimeout(() => { leftArrow.src = "imgs/Spot/r4.png"; }, 400);

}

function carouselRight() {
    var carouselImage = document.getElementById("myCarouselImage");
    var rightArrow = document.getElementById("rightArrow");
    clearInterval(carousel);
    carouselMoving = false;

    if (imageIndex < 15) {
        imageIndex++;
    } else if (imageIndex === 15) {
        imageIndex = 1;
    }


    switch (parseInt(imageIndex)) {
        case (1):
            carouselImage.src = "imgs/Spot/prod1.jpg";
            break;
        case (2):
            carouselImage.src = "imgs/Spot/Problem1.jpg";
            break;
        case (3):
            carouselImage.src = "imgs/Spot/Problem2.jpg";
            break;
        case (4):
            carouselImage.src = "imgs/Spot/solution.jpg";
            break
        case (5):
            carouselImage.src = "imgs/Spot/howitworks.jpg";
            break;
        case (6):
            carouselImage.src = "imgs/Spot/dif1.jpg";
            break;
        case (7):
            carouselImage.src = "imgs/Spot/dif2.jpg";
            break
        case (8):
            carouselImage.src = "imgs/Spot/dif3.jpg";
            break;
        case (9):
            carouselImage.src = "imgs/Spot/diff4.jpg";
            break;
        case (10):
            carouselImage.src = "imgs/Spot/diff5.jpg";
            break
        case (11):
            carouselImage.src = "imgs/Spot/diff6.jpg";
            break;
        case (12):
            carouselImage.src = "imgs/Spot/Figma.png";
            break;
        case (13):
            carouselImage.src = "imgs/Spot/mDev.png";
            break
        case (14):
            carouselImage.src = "imgs/Spot/slack.png";
            break;
        case (15):
            carouselImage.src = "imgs/Spot/GitHub.png";
            break;
    }

    setTimeout(() => { rightArrow.src = "imgs/Spot/r1.png"; }, 100);
    setTimeout(() => { rightArrow.src = "imgs/Spot/r2.png"; }, 200);
    setTimeout(() => { rightArrow.src = "imgs/Spot/r3.png"; }, 300);
    setTimeout(() => { rightArrow.src = "imgs/Spot/r4.png"; }, 400);

}

function pauseCarousel() {
    if (carouselMoving) {
        clearInterval(carousel);
        carouselMoving = false;
    } else {
        startCarousel();
        carouselMoving = true;
    }
}

function moveYellowCar() {

    var yellowCar = document.getElementById("yellowCar");
    var carTL = new TimelineMax();
    moveCars = true;
    carTL.fromTo(yellowCar, 3, { left: "1500px" }, { left: "-50px" });
}

function moveBrownCar() {

    var brownCar = document.getElementById("brownCar");
    var carTL = new TimelineMax();
    carTL.fromTo(brownCar, 3, { left: "-50px" }, { left: "1500px" });

}