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
jTrig = false;
cTrig = false;
sTrig = false;
hTrig = false;
lTrig = false;


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

                    var javaExpBar = document.getElementById("javaExp");
                    var counter = 0;
                    var javaExpBarHeight = javaExpBar.offsetHeight;
                    var boundingJava = javaExpBar.getBoundingClientRect();


                    /*new game animation*/
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
                                divTl.fromTo(myElement, .7, { left: elementLeft, opacity: "0" }, { left: "0px", opacity: ".9" });
                                placed = true;
                            }
                        } else {
                            if (placed) {
                                divTl.fromTo(myElement, .7, { left: elementLeft, opacity: ".9" }, { left: "450px", opacity: "0" });
                                placed = false;
                            }
                        }
                    } else {
                        var myElement = document.getElementById('animatedDiv');
                        myElement.style.left = "0px";
                    }
                }
                /* end new game animation*/

                divT = new TimelineMax();
                //java aniation
                var javaExpBar = document.getElementById("javaExp");
                var javaExpBarHeight = javaExpBar.offsetHeight;
                var boundingJava = javaExpBar.getBoundingClientRect();
                if (boundingJava.top >= -javaExpBarHeight + 50 &&
                    boundingJava.bottom + 50 <= (window.innerHeight || document.documentElement.clientHeight) + javaExpBarHeight) {
                    if (!jTrig) {
                        jTrig = true;
                        divT.fromTo(javaExpBar, 1, { width: "0%" }, { width: "90%" }, "-=1");
                    }
                }
                //c animation
                var cExpBar = document.getElementById("cExp");
                var cExpBarHeight = cExpBar.offsetHeight;
                var boundingC = cExpBar.getBoundingClientRect();

                if (boundingC.top >= -cExpBarHeight + 50 &&
                    boundingC.bottom + 50 <= (window.innerHeight || document.documentElement.clientHeight) + cExpBarHeight) {
                    if (!cTrig) {
                        cTrig = true;
                        divT.fromTo(cExpBar, 1, { width: "0%" }, { width: "55%" }, "-=1");
                    }
                }

                //sql animation
                var sExpBar = document.getElementById("sExp");
                var sExpBarHeight = cExpBar.offsetHeight;
                var boundingS = sExpBar.getBoundingClientRect();

                if (boundingS.top >= -sExpBarHeight + 50 &&
                    boundingS.bottom + 50 <= (window.innerHeight || document.documentElement.clientHeight) + sExpBarHeight) {
                    if (!sTrig) {
                        sTrig = true;
                        divT.fromTo(sExpBar, 1, { width: "0%" }, { width: "80%" }, "-=1");
                    }
                }

                //html/css/js animation
                var hExpBar = document.getElementById("hExp");
                var hExpBarHeight = hExpBar.offsetHeight;
                var boundingH = hExpBar.getBoundingClientRect();

                if (boundingH.top >= -hExpBarHeight + 50 &&
                    boundingH.bottom + 50 <= (window.innerHeight || document.documentElement.clientHeight) + hExpBarHeight) {
                    if (!hTrig) {
                        hTrig = true;
                        divT.fromTo(hExpBar, 1, { width: "0%" }, { width: "70%" }, "-=1");
                    }
                }
                //languages
                var eExpBar = document.getElementById("eExp");
                var eExpBarHeight = eExpBar.offsetHeight;
                var boundingE = eExpBar.getBoundingClientRect();

                var fExpBar = document.getElementById("fExp");
                var spExpBar = document.getElementById("spExp");

                if (boundingE.top >= -eExpBarHeight + 50 &&
                    boundingE.bottom + 50 <= (window.innerHeight || document.documentElement.clientHeight) + eExpBarHeight) {
                    if (!lTrig) {
                        lTrig = true;
                        divT.fromTo(eExpBar, 1, { width: "0%" }, { width: "98%" }, "-=1");
                        divT.fromTo(fExpBar, 1, { width: "0%" }, { width: "55%" }, "-=1");
                        divT.fromTo(spExpBar, 1, { width: "0%" }, { width: "25%" }, "-=1");
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