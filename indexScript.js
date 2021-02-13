var inside = false;
var placed = false;
var divTl;
var timed = 0;
var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;


function loadJS() {
    drawLogo();
    viewportAnimations();
}

function viewportAnimations() {
    var checkViewPort = setInterval(() => {
            try {
                if (document.getElementById('animatedDiv') != null) {
                    var myElement = document.getElementById('animatedDiv');
                    var elementLeft = myElement.style.left;
                    var pIndex = elementLeft.indexOf("p");
                    elementLeft = parseInt(elementLeft.substr(0, pIndex));

                    var windowWidth = parseInt(screen.width);
                    var bounding = myElement.getBoundingClientRect();
                    var myElementHeight = myElement.offsetHeight;
                    if (windowWidth > 700) {
                        if (bounding.top >= -myElementHeight + 150 &&
                            bounding.bottom + 150 <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {
                            inside = true;
                        } else {
                            inside = false;
                        }

                        if (inside) {
                            divTl = new TimelineMax();
                            if (!placed) {
                                divTl.fromTo(myElement, .7, { left: elementLeft }, { left: "0px" });
                                placed = true;
                            }
                        } else {
                            if (placed) {
                                divTl.fromTo(myElement, .7, { left: elementLeft }, { left: "-450px" });
                                placed = false;
                            }
                        }
                    } else {
                        var myElement = document.getElementById('animatedDiv');
                        myElement.style.left = "0px";
                    }
                }
            } catch {
                var myElement = document.getElementById('animatedDiv');
                myElement.style.left = "0px";
            }


        },
        50);
}

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

function lightTestDome() {
    document.getElementById("TD").style.color = "teal";
    document.getElementById("TD").style.background = "black";
    document.getElementById("TDTL").style.color = "teal";
    document.getElementById("TDTL").style.background = "black";
}

function lightLinkedIn() {
    document.getElementById("LI").style.color = "teal";
    document.getElementById("LI").style.background = "black";
    document.getElementById("LITL").style.color = "teal";
    document.getElementById("LITL").style.background = "black";
}

function textBlack() {
    document.getElementById("LI").style.color = "black";
    document.getElementById("TD").style.color = "black";
    document.getElementById("LI").style.background = "none";
    document.getElementById("TD").style.background = "none";

    document.getElementById("LITL").style.color = "black";
    document.getElementById("TDTL").style.color = "black";
    document.getElementById("LITL").style.background = "rgba(0, 128, 128, 0.5)";
    document.getElementById("TDTL").style.background = "rgba(0, 128, 128, 0.5)";
}