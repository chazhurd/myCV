/**
 * Created By Chaz Hurd
 * Classic jet fighting game
 * Hours: 14
 * First game made using JS/HTML/CSS 
 * 12/25/2020
 * 
 */

/*
 Side notes:
Hit Detection needs help badly
 */

var cloudMaker = setInterval(startCloud, 2000);
var enemyMaker = setInterval(createEnemy, 3000);
var justiceMaker = setInterval(hitDetection, 10);

var numOfEnemies = 1;
var x = 30;
var y = 17;
var a = 37;
var b = 17;
var c = 43;
var d = 16;
var timed = 0;
var cloud = [];
var xy = 0;

var enemyAhits = 0;
var enemyBhits = 0;
var enemyAstruck = false;
var enemyBstruck = 0;
var myLeftPos;
var moveLeft;
var elem;
var totalShots = 0;
var cycleShots = -1;

//Banner

var myTimer = setInterval(function() {
    var can = document.getElementById("myCanvas2");
    var cantx = can.getContext("2d");
    cantx.lineWidth = 1;
    cantx.strokeStyle = 'white';
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
//Banner above


//game below
function myMove() {
    drawArrows();
    elem = document.getElementById("myAnimation");
    var pos = 0;
    var arrows = document.getElementById("arrows");
    arrows.style.left = 10 + 'px';
    arrows.style.top = 440 + 'px';
    var shoot = document.getElementById("shoot");
    shoot.style.left = 240 + 'px';
    shoot.style.top = 400 + 'px';;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos >= 150) {
            clearInterval(id);
        } else {
            pos += 3;
            elem.style.left = pos + 'px';
            myLeftPos = pos;
        }
    }
}

function moveJetLeft() {
    if (moveRight != null) {
        stopLeftMove();
    }
    moveLeft = setInterval(shiftLeft, 10);
}

function shiftLeft() {
    if (myLeftPos > 2) {
        myLeftPos -= 3;
        elem.style.left = myLeftPos + 'px';
    }
}

function moveJetRight() {
    if (moveLeft != null) {
        stopLeftMove();
    }
    moveRight = setInterval(shiftRight, 10);
}

function shiftRight() {

    if (myLeftPos < 300) {
        myLeftPos += 3;
        elem.style.left = myLeftPos + 'px';
    }
}

function stopLeftMove() {
    clearInterval(moveLeft);
}

function stopRightMove() {
    clearInterval(moveRight);
}
//will have to build array of shots
var allShots = [];
var shotID = "start";

function letemKnow() {
    alert("This is a touch game not mouse game");
}

function shoot() {
    if (totalShots <= 4) {

        if (cycleShots < 5) {
            cycleShots++;
        } else {
            cycleShots = 0;
        }

        totalShots++;
        //create shot
        var shotButton = document.getElementById("shootButton");
        var myContainer = document.getElementById("myContainer");
        var myShot = document.createElement("img");
        myShot.src = 'theShot.png';
        myShot.id = "myShot" + cycleShots;
        myShot.className = "myShots";
        myContainer.appendChild(myShot);
        //align center for shot
        myShot.style.top = 340 + 'px';
        var myJet = document.getElementById("myAnimation").style.left;
        var myJetCenter = myJet.substr(0, 3);
        myJetCenter = parseInt(myJetCenter) + 20;
        myShot.style.left = myJetCenter + 'px';
        var posit = 340;
        //begin flight
        var thisShot = setInterval(function() {
                shotLeft = myShot.style.left;
                shotTop = myShot.style.top;
                if (posit >= -20) {
                    posit -= 2;
                    myShot.style.top = posit + 'px';

                    if (posit > 280) {
                        shotButton.src = "holdingShot.png";
                    } else {
                        shotButton.src = "shoot.svg";
                    }
                } else {
                    if (myShot != null) {
                        myContainer.removeChild(myShot);
                        totalShots--;
                    }
                    clearInterval(thisShot);
                }
            },
            2);
    } else {
        document.getElementById("weaponsOverload").style.display = "block";
    }
}

function drawArrows() {
    var can = document.getElementById("myLeftArrow");
    var cant = can.getContext("2d");
    cant.lineWidth = 1;
    cant.strokeStyle = 'black';
    cant.moveTo(5, 25);
    cant.lineTo(40, 5);
    cant.stroke();
    cant.lineTo(40, 45);
    cant.stroke();
    cant.lineTo(5, 25);
    cant.stroke();

    var can = document.getElementById("myRightArrow");
    var cant = can.getContext("2d");
    cant.lineWidth = 1;
    cant.strokeStyle = 'black';
    cant.moveTo(45, 25);
    cant.lineTo(10, 5);
    cant.stroke();
    cant.lineTo(10, 45);
    cant.stroke();
    cant.lineTo(45, 25);
    cant.stroke();
}

function startCloud() {
    var allowIt = Math.floor(Math.random() * 10);
    if (allowIt <= 8) {
        moveClouds();
        if (allowIt <= 4) {
            moveClouds();
        }
    }
}

function moveClouds() {
    var myContainer = document.getElementById("myContainer");
    var cloud = document.createElement("img");
    var typeOfCloud = Math.random();
    if (typeOfCloud <= 0.5) {
        cloud.src = "cloud.png";
    } else {
        cloud.src = "mediumCloud.png";
    }
    myContainer.appendChild(cloud);
    cloud.id = "myCloud";
    var rando = Math.floor(Math.random() * 260);
    cloud.style.left = rando + 'px';
    var posit = 0;
    var cloudOpac = 0;
    cloud.style.opacity = 0;
    var thisCloud = setInterval(function() {
        //a lil extra for shots
        if (totalShots <= 9) {
            document.getElementById("weaponsOverload").style.display = "none"
        }
        //opac and movemnt of cloud pretty much the fromTo. 
        if (posit <= 400) {
            if (cloudOpac <= .8 && posit <= 299) {
                cloudOpac += .025;
            }
            cloud.style.opacity = cloudOpac;
            posit += 1;
            cloud.style.top = posit + 'px';
        }
        if (posit >= 290) {
            if (cloudOpac >= 0) {
                cloudOpac -= .025;
            }
            cloud.style.opacity = cloudOpac;
        }
        if (posit > 380) {
            myContainer.removeChild(cloud);
            clearInterval(thisCloud);
        }
    }, 5);

}
var start = 0;
var enemyToggle = 0;
//creating enemies:
function createEnemy() {
    if (numOfEnemies <= 2) {
        numOfEnemies++;
        var myContainer = document.getElementById("myContainer");
        var enemy = document.createElement("img");
        var typeOfEnemy = Math.random();
        if (typeOfEnemy <= 0.5) {
            enemy.src = "enemyPlane1.png";
        } else {
            enemy.src = "enemyPlane2.png";
        }
        enemy.className += "enemies";

        if (enemyToggle === 0) {
            enemy.id = "A";
            enemyToggle++;
            enemyAstruck = 0;
        } else {
            enemy.id = "B";
            enemyToggle--;
            enemyBstruck = 0;
        }
        myContainer.appendChild(enemy);
        enemy.style.top = 0 + 'px';
        var pos = 100;
        var topPos = 0;
        var switched = 0.5;
        var tl = new TimelineMax();
        var rightSideRandom = Math.random() * 150 + 150;
        rightSideRandom = rightSideRandom + 'px';
        var leftSideRandom = Math.random() * 150 + 20
        leftSideRandom = leftSideRandom + 'px';
        if (start == 0) {
            tl.fromTo(enemy, 1, { left: "0px", opacity: "0" }, { left: rightSideRandom, opacity: "1" });
            start++;
        } else {
            tl.fromTo(enemy, 1, { left: "0px", opacity: "0" }, { left: leftSideRandom, opacity: "1" });
            start = 0;
        }
        var checkTop, toTop, stringedtoTop, stringedCheck;

        var switchoronie = setInterval(function() {
            checkTop = parseInt(enemy.style.top.substr(0, 3));
            toTop = checkTop + 10;
            stringedtoTop = toTop + 'px';
            stringedCheck = checkTop + 'px';
            switched = Math.random();
            if (checkTop >= 200) {
                clearInterval(switchoronie);
            } else if (switched >= 0.01 && switched < 0.9) {
                tl.fromTo(enemy, 0.2, { top: stringedCheck }, { top: stringedtoTop });
            }

        }, 1000);
        startShifts(enemy);

    }
}

function startShifts(enemy) {
    var tl = new TimelineMax();
    var switched, enemyTop;
    var rando = (Math.random() * 1000) + 500;
    var checkOnIt = setInterval(function() {
        switched = Math.random();
        var enemyShift = enemy.style.left;
        enemyTop = enemy.style.top.substr(0, 3);
        if (enemyTop.includes("p")) {
            enemyTop = enemyTop.substr(0, 2);
        }
        enemyShift = enemyShift.substr(0, 3);
        enemyShift = parseInt(enemyShift);
        var leftShift = enemyShift - 30;
        var rightShift = enemyShift + 30;
        leftShift = leftShift + 'px';
        rightShift = rightShift + 'px';
        enemyLoc = enemyShift;
        enemyShift = enemyShift + 'px';
        if (switched >= 0.1 && switched <= 0.9 && enemyTop <= 200) {

            if (switched <= 0.5 && enemyLoc >= 50) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: leftShift });
            }
            if (switched <= 0.5 && enemyLoc <= 50) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: rightShift });
            }
            if (switched >= 0.501 && enemyLoc <= 260) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: rightShift });

            }
            if (switched >= 0.501 && enemyLoc >= 261) {
                tl.fromTo(enemy, 0.3, { left: enemyShift }, { left: leftShift });
            }
        }
        var checkTop = enemy.style.top;
        var numCheckTop = checkTop.substr(0, 3);
        if (numCheckTop >= 200) {
            clearInterval(checkOnIt);
            tl.fromTo(enemy, 0.4, { top: checkTop, opacity: "0.8", height: "60", width: "50" }, { top: "310px", opacity: "0", height: "20", width: "10" });
            var endOfLife = setInterval(function() {
                if (enemy != null) {
                    document.getElementById("myContainer").removeChild(enemy);
                    numOfEnemies--;
                }
                clearInterval(endOfLife);
            }, 1000);
        }
    }, rando);
}
var explosiveCount = 0;
//justMaker
function hitDetection() {
    if (document.getElementById("A") != null) {
        var enemyA = document.getElementById("A");
        var enemyAtop = enemyA.style.top;
        var pLoc = enemyAtop.indexOf("p");
        enemyAtop = parseInt(enemyAtop.substr(0, pLoc));
        var enemyAleft = enemyA.style.left;
        pLoc = enemyAleft.indexOf("p");
        enemyAleft = parseInt(enemyAleft.substr(0, pLoc));

        for (var i = 0; i < 5; i++) {
            if (document.getElementById("myShot" + i) != null) {
                var thisShot = document.getElementById("myShot" + i);
                var myShottop = document.getElementById("myShot" + i).style.top;
                pLoc = myShottop.indexOf("p");
                myShottop = parseInt(myShottop.substr(0, pLoc));

                var myShotleft = document.getElementById("myShot" + i).style.left;
                pLoc = myShotleft.indexOf("p");
                myShotleft = parseInt(myShotleft.substr(0, pLoc));

                if (myShottop <= enemyAtop + 45) {
                    if (myShotleft >= enemyAleft && myShotleft <= enemyAleft + 40) {
                        console.log("myShot " + i + "hit enemyA");
                        enemyAstruck = true;
                        var explosiveTimer = setInterval(function() {
                            explosiveCount++;
                            if (explosiveCount < 10)
                                enemyA.src = "e1.png";
                            if (explosiveCount > 20 && explosiveCount < 30)
                                enemyA.src = "e2.png";
                            if (explosiveCount > 30 && explosiveCount < 40)
                                enemyA.src = "e3.png";
                            if (explosiveCount > 40 && explosiveCount < 50)
                                enemyA.src = "e4.png";
                            if (explosiveCount > 50 && explosiveCount < 60)
                                enemyA.src = "e5.png";
                            if (explosiveCount > 60 && explosiveCount < 70)
                                enemyA.src = "e6.png";
                            if (explosiveCount > 70 && explosiveCount < 80)
                                enemyA.src = "e7end.png";
                            if (explosiveCount > 80 && explosiveCount < 82) {
                                enemyAstruck = false;
                                explosiveCount = 0;
                                clearInterval(explosiveTimer);
                                document.getElementById('myContainer').removeChild(enemyA);
                                numOfEnemies--;
                            }
                        }, 10);

                    }
                }
            }
        }
    }

    if (document.getElementById("B") != null) {
        var enemyB = document.getElementById("B");
        var enemyAtop = enemyB.style.top;
        var pLoc = enemyAtop.indexOf("p");
        enemyAtop = parseInt(enemyAtop.substr(0, pLoc));
        var enemyAleft = enemyB.style.left;
        pLoc = enemyAleft.indexOf("p");
        enemyAleft = parseInt(enemyAleft.substr(0, pLoc));

        for (var i = 0; i < 5; i++) {
            if (document.getElementById("myShot" + i) != null) {
                var thisShot = document.getElementById("myShot" + i);
                var myShottop = document.getElementById("myShot" + i).style.top;
                pLoc = myShottop.indexOf("p");
                myShottop = parseInt(myShottop.substr(0, pLoc));

                var myShotleft = document.getElementById("myShot" + i).style.left;
                pLoc = myShotleft.indexOf("p");
                myShotleft = parseInt(myShotleft.substr(0, pLoc));

                if (myShottop <= enemyAtop + 45) {
                    if (myShotleft >= enemyAleft && myShotleft <= enemyAleft + 40) {
                        console.log("myShot " + i + "hit enemyB");
                        enemyAstruck = true;
                        var explosiveTimer = setInterval(function() {
                            explosiveCount++;
                            if (explosiveCount < 10)
                                enemyB.src = "e1.png";
                            if (explosiveCount > 20 && explosiveCount < 30)
                                enemyB.src = "e2.png";
                            if (explosiveCount > 30 && explosiveCount < 40)
                                enemyB.src = "e3.png";
                            if (explosiveCount > 40 && explosiveCount < 50)
                                enemyB.src = "e4.png";
                            if (explosiveCount > 50 && explosiveCount < 60)
                                enemyB.src = "e5.png";
                            if (explosiveCount > 60 && explosiveCount < 70)
                                enemyB.src = "e6.png";
                            if (explosiveCount > 70 && explosiveCount < 80)
                                enemyB.src = "e7end.png";
                            if (explosiveCount > 80 && explosiveCount < 82) {
                                enemyAstruck = false;
                                explosiveCount = 0;
                                clearInterval(explosiveTimer);
                                document.getElementById('myContainer').removeChild(enemyB);
                                numOfEnemies--;
                            }
                        }, 20);

                    }
                }
            }
        }
    }

}