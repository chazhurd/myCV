var timed = 0;
var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;


function main() {
    drawLogo();
    siteAnimate();

    var windowWidth = window.screen.width;

    if (windowWidth > 900) {
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
    } else {
        document.getElementById("neonContainer").style.display = "none";
        document.getElementById("neonLine").style.display = "none";
    }
    var processImage = document.getElementById("devProc");
    var procNum = 0;
    var devProc = setInterval(() => {
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
    }, 150);
}

function siteAnimate() {
    var openTl = new TimelineMax();
    var topText = document.getElementById("topNeon");
    var bottomText = document.getElementById("bottomNeon");
    var windowWidth = window.screen.width;

    if (windowWidth > 900) {
        openTl.fromTo(topText, 0.1, { opacity: "0" }, { opacity: ".3" })
            .fromTo(topText, 0.1, { opacity: ".3" }, { opacity: "0" })
            .fromTo(topText, 0.1, { opacity: "0" }, { opacity: ".5" })
            .fromTo(topText, 0.1, { opacity: ".5" }, { opacity: "0" })
            .fromTo(topText, 1, { opacity: "0" }, { opacity: "1" })
            .fromTo(bottomText, 0.2, { opacity: "0.6" }, { opacity: "0" })
            .fromTo(bottomText, 0.1, { opacity: "0" }, { opacity: "1" })
            .fromTo(bottomText, 0.1, { opacity: "1" }, { opacity: "1" })
            .fromTo(bottomText, 1, { opacity: "0" }, { opacity: "1" });
    }
}
//Banner
function drawLogo() {
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