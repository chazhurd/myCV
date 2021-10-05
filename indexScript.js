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
hasAppeared = false;


function loadJS() {
    drawLogo();
    viewportAnimations();
    refreshBars();
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

                    console.log(windowWidth);
                    /*new game animation*/
                    if (windowWidth > 500) {
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
                                setTimeout(() => { myElement.style.zIndex = "0"; }, 700);
                                placed = true;
                            }
                        } else {
                            if (placed) {
                                myElement.style.zIndex = "-1";
                                divTl.fromTo(myElement, .7, { left: elementLeft, opacity: ".9", }, { left: "450px", opacity: "0" });
                                placed = false;
                            }
                        }
                    } else {
                        myElement.style.left = "0px";
                        myElement.style.opacity = ".8";

                    }
                }

                /* end new game animation*/

                divT = new TimelineMax();
                //java animation
                var javaExpBar = document.getElementById("javaExp");
                var javaExpBarHeight = javaExpBar.offsetHeight;
                var boundingJava = javaExpBar.getBoundingClientRect();
                var javaHours = document.getElementById("javaHours");

                if (boundingJava.top >= -javaExpBarHeight &&
                    boundingJava.bottom <= (window.innerHeight || document.documentElement.clientHeight) + javaExpBarHeight) {
                    if (!jTrig) {
                        jTrig = true;
                        divT.fromTo(javaExpBar, 1, { width: "0%" }, { width: "80%" }, "-=1");
                        var j = 0;
                        var jHours = setInterval(() => {
                            if (j < 3360) {
                                if (j < 3000) {
                                    j += 50;
                                    javaHours.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + j + " Hours";
                                } else {
                                    j = j + 4;
                                    javaHours.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + j + " Hours";
                                    if (parseInt(j) === 3360) {
                                        javaHours.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + j + " Hours";
                                    }
                                }
                            } else {
                                clearInterval(jHours);
                            }

                        }, 1);
                        setTimeout(refreshBars, 1000);
                    }
                }
                //c animation
                var cExpBar = document.getElementById("cExp");
                var cExpBarHeight = cExpBar.offsetHeight;
                var boundingC = cExpBar.getBoundingClientRect();
                var cHoursD = document.getElementById("cHours");
                if (boundingC.top >= -cExpBarHeight &&
                    boundingC.bottom <= (window.innerHeight || document.documentElement.clientHeight) + cExpBarHeight) {
                    if (!cTrig) {
                        cTrig = true;
                        divT.fromTo(cExpBar, 1, { width: "0%" }, { width: "65%" }, "-=1");
                        var cs = 0;
                        var cHours = setInterval(() => {
                            if (cs < 400) {
                                cs = cs + 2;
                                cHoursD.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + cs + " Hours";
                                if (parseInt(c) === 400) {
                                    cHoursD.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + cs + " Hours";
                                }
                            } else {
                                clearInterval(cHours);
                            }

                        }, 1);
                    }
                }

                //sql animation
                var sExpBar = document.getElementById("sExp");
                var sExpBarHeight = cExpBar.offsetHeight;
                var boundingS = sExpBar.getBoundingClientRect();
                var sHoursD = document.getElementById("sHours");

                if (boundingS.top >= -sExpBarHeight &&
                    boundingS.bottom <= (window.innerHeight || document.documentElement.clientHeight) + sExpBarHeight) {
                    if (!sTrig) {
                        sTrig = true;
                        divT.fromTo(sExpBar, 1, { width: "0%" }, { width: "85%" }, "-=1");
                        var s = 0;
                        var sHours = setInterval(() => {
                            if (s < 360) {
                                s = s + 2;
                                sHoursD.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + s + " Hours";
                                if (parseInt(s) === 360) {
                                    sHoursD.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + s + " Hours";
                                }
                            } else {
                                clearInterval(sHours);
                            }

                        }, 1);
                    }
                }

                //html/css/js animation
                var hExpBar = document.getElementById("hExp");
                var hExpBarHeight = hExpBar.offsetHeight;
                var boundingH = hExpBar.getBoundingClientRect();
                var hHoursD = document.getElementById("hHours");


                if (boundingH.top >= -hExpBarHeight &&
                    boundingH.bottom <= (window.innerHeight || document.documentElement.clientHeight) + hExpBarHeight) {
                    if (!hTrig) {
                        hTrig = true;
                        divT.fromTo(hExpBar, 1, { width: "0%" }, { width: "70%" }, "-=1");

                        var h = 0;
                        var hHours = setInterval(() => {
                            if (h < 550) {
                                h = h + 2;
                                hHoursD.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + h + " Hours";
                                if (parseInt(h) === 550) {
                                    hHoursD.innerHTML = '<i class="fa fa-clock-o fa-fw w3-margin-right"></i>' + h + " Hours";
                                }
                            } else {
                                clearInterval(hHours);
                            }

                        }, 1);
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
    document.getElementById("TD").style.color = "white";
    document.getElementById("TD").style.background = "rgba(0, 0, 0, 0.493)";
    document.getElementById("TDTL").style.color = "white";
    document.getElementById("TDTL").style.background = "rgba(0, 0, 0, 0.493)";
}

function lightLinkedIn() {
    document.getElementById("LI").style.color = "white";
    document.getElementById("LI").style.background = "rgba(0, 0, 0, 0.493)";
    document.getElementById("LITL").style.color = "white";
    document.getElementById("LITL").style.background = "rgba(0, 0, 0, 0.493)";
}

function textBlack() {
    document.getElementById("LI").style.color = "black";
    document.getElementById("TD").style.color = "black";
    document.getElementById("LI").style.background = "none";
    document.getElementById("TD").style.background = "none";

    document.getElementById("LITL").style.color = "black";
    document.getElementById("TDTL").style.color = "black";
    document.getElementById("LITL").style.background = "rgba(0, 128, 128, 0.158)";
    document.getElementById("TDTL").style.background = "rgba(0, 128, 128, 0.158)";
}

function refreshBars() {
    var barRefreshing = setInterval(() => {
        var javaExpBar = document.getElementById("javaExp");
        var javaExpBarHeight = javaExpBar.offsetHeight;
        var boundingJava = javaExpBar.getBoundingClientRect();
        if (!(boundingJava.top >= -javaExpBarHeight &&
                boundingJava.bottom <= (window.innerHeight || document.documentElement.clientHeight) + javaExpBarHeight)) {
            javaExpBar.style.width = "0px";
            jTrig = false;
        }
        //c animation
        var cExpBar = document.getElementById("cExp");
        var cExpBarHeight = cExpBar.offsetHeight;
        var boundingC = cExpBar.getBoundingClientRect();

        if (!(boundingC.top >= -cExpBarHeight &&
                boundingC.bottom <= (window.innerHeight || document.documentElement.clientHeight) + cExpBarHeight)) {
            cExpBar.style.width = "0px";
            cTrig = false;
        }

        //sql animation
        var sExpBar = document.getElementById("sExp");
        var sExpBarHeight = cExpBar.offsetHeight;
        var boundingS = sExpBar.getBoundingClientRect();

        if (!(boundingS.top >= -sExpBarHeight &&
                boundingS.bottom <= (window.innerHeight || document.documentElement.clientHeight) + sExpBarHeight)) {
            sExpBar.style.width = "0px";
            sTrig = false;
        }


        //html/css/js animation
        var hExpBar = document.getElementById("hExp");
        var hExpBarHeight = hExpBar.offsetHeight;
        var boundingH = hExpBar.getBoundingClientRect();

        if (!(boundingH.top >= -hExpBarHeight &&
                boundingH.bottom <= (window.innerHeight || document.documentElement.clientHeight) + hExpBarHeight)) {
            hExpBar.style.width = "0px";
            hTrig = false;
        }
        //languages
        var eExpBar = document.getElementById("eExp");
        var eExpBarHeight = eExpBar.offsetHeight;
        var boundingE = eExpBar.getBoundingClientRect();

        var fExpBar = document.getElementById("fExp");
        var spExpBar = document.getElementById("spExp");

        if (!(boundingE.top >= -eExpBarHeight &&
                boundingE.bottom <= (window.innerHeight || document.documentElement.clientHeight) + eExpBarHeight)) {
            lTrig = false;
            eExpBar.style.width = "0px";
            fExpBar.style.width = "0px";
            spExpBar.style.width = "0px";

        }
    }, 750);

}